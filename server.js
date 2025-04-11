require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/send-whatsapp', async (req, res) => {
    const { name, phone, datepicker, time } = req.body;

    try {
        const message = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: process.env.USER_WHATSAPP_NUMBER,
            body: `Appointment Confirmation: \n\n Name: ${name}\n Phone: ${phone}\n Date: ${datepicker}\n Time: ${time}`,
        });

        res.status(200).json({ success: true, message: "WhatsApp message sent successfully!", sid: message.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000!!'));
