const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.getSecureRecord = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    
    // 1. 檢查 Token
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      res.status(403).send("未授權：請提供 Token");
      return;
    }

    try {
      // 2. 驗證身分
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const recordId = req.query.id; // 這是前端傳來的 ID

      console.log(`使用者 ${uid} 正在查詢 ID: ${recordId}`);

      // 3. ⚠️ 關鍵：如果前端沒傳 ID，直接報錯
      if (!recordId) {
        res.status(400).send("錯誤：你沒有告訴我要查哪個 ID！");
        return;
      }

      // 4. 🔥 真的去連線資料庫 (Firestore)
      const db = admin.firestore();
      
      // 請確認這裡的集合名稱是 'users' 還是 'patients'？
      const docRef = db.collection('medical_records').doc(recordId); 
      const doc = await docRef.get();

      // 5. ⚠️ 關鍵：如果資料庫裡找不到，直接報錯 (404)
      if (!doc.exists) {
        console.log("找不到資料！");
        res.status(404).json({ error: "查無此人：資料庫裡沒這筆資料" });
        return;
      }

      // 6. 只有找到資料，才會回傳
      const realData = doc.data();
      
      // 簡單的去識別化
      if (realData.id_number) {
        realData.id_number = "A1*******9"; 
      }

      res.status(200).json(realData);

    } catch (error) {
      console.error("系統錯誤", error);
      res.status(500).send("後端發生錯誤：" + error.message);
    }
  });
});
