const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// 模擬資料庫 (後續將串接 PostgreSQL)
const users = [
  { id: 1, email: 'doctor@example.com', password: '$2a$10$UnU8jA.R3Yp1I/O6S/VzO.lS6Y8fK9xT3f5/6K7Q7G6Q5F4E3D2' } // 密碼是 123456
];

// 登入介面
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: '帳號或密碼錯誤' });

  // 驗證密碼
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: '帳號或密碼錯誤' });

  // 簽發 JWT
  const token = jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });

  res.json({ token, message: '登入成功' });
});

// 驗證 Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// 受保護的 API：獲取病歷資料
app.get('/api/medical-records/:id', authenticateToken, (req, res) => {
  const recordId = req.params.id;
  
  // 模擬回傳資料 (後續將由資料庫提供)
  res.json({
    id: recordId,
    patientName: "王小明",
    condition: "心臟瓣膜異常",
    lastUpdated: "2025-01-25",
    fetchedBy: req.user.email
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
