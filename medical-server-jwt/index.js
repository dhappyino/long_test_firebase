const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const { DATABASE_URL, JWT_SECRET, PORT, CORS_ORIGIN } = process.env;

if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET");
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

const app = express();
app.use(express.json());

// 允許跨域請求 (CORS)
const corsOptions = {
  origin: (origin, callback) => {
    // 支援環境變數中的逗號分隔清單，若沒設定則允許所有 (true)
    if (!CORS_ORIGIN || CORS_ORIGIN === "*" || !origin) {
      callback(null, true);
    } else {
      const allowedOrigins = CORS_ORIGIN.split(",").map((o) => o.trim());
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

const issueToken = (staff) => {
  return jwt.sign(
    { sub: staff.id, role: staff.role, email: staff.email },
    JWT_SECRET,
    { expiresIn: "8h" },
  );
};

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, email, password_hash, role, name FROM staffs WHERE email = $1",
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const staff = rows[0];
    const ok = await bcrypt.compare(password, staff.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = issueToken(staff);
    res.json({
      token,
      user: {
        id: staff.id,
        email: staff.email,
        name: staff.name,
        role: staff.role,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: "Server error" });
  }
});

const ALLOWED_SORT = new Set(["created_at", "name", "id_number"]);

app.get("/api/patients", requireAuth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const pageSize = Math.min(
    Math.max(parseInt(req.query.pageSize, 10) || 20, 1),
    100,
  );
  const query = (req.query.query || "").trim();
  const sort = ALLOWED_SORT.has(req.query.sort) ? req.query.sort : "created_at";
  const order = req.query.order === "asc" ? "asc" : "desc";

  const where = [];
  const values = [];

  if (query) {
    values.push(`%${query}%`);
    where.push(
      "(name ILIKE $1 OR id_number ILIKE $1 OR passport_number ILIKE $1 OR manual_code ILIKE $1 OR nfc_code ILIKE $1)",
    );
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const offset = (page - 1) * pageSize;

  try {
    const countSql = `SELECT COUNT(*)::int AS total FROM patients ${whereSql}`;
    const listSql = `
      SELECT id, name, id_number, passport_number, manual_code, nfc_code, financial_source, created_at
      FROM patients
      ${whereSql}
      ORDER BY ${sort} ${order}
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;

    const countResult = await pool.query(countSql, values);
    const listValues = values.concat([pageSize, offset]);
    const listResult = await pool.query(listSql, listValues);

    res.json({
      items: listResult.rows,
      page,
      pageSize,
      total: countResult.rows[0].total,
    });
  } catch (err) {
    console.error("List patients error", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/patients/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT id, name, id_number, passport_number, manual_code, nfc_code, financial_source, created_at
       FROM patients WHERE id = $1`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get patient error", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const port = parseInt(PORT, 10) || 8080;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
