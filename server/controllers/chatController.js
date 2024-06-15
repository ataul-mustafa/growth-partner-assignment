const axios = require('axios');
const { getUserData } = require('../models/dataModel');

const askQuestion = async (req, res) => {
    try {

        const { message, userID } = req.body;

        const {balanceSheetData, profitLossData} = getUserData();

        // Prepare the data for the AI Assistant
        const prompt = `Balance-sheet is: ${JSON.stringify(balanceSheetData)} and profite-loss-sheet is: ${JSON.stringify(profitLossData)}. Question: ${message}. Note: Dont be too descriptive and give 100% accurate answer`;

        const response = await axios.post(`https://api.openai.com/v1/chat/completions`, {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful financial assistant." },
                { role: "user", content: prompt }
            ],
            user: userID,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
            }
        });

        res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    askQuestion
};