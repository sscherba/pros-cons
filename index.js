const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

// Load API key and parameters
const config = fs.readFileSync('./config.txt', 'utf-8').split('\n');
const apiKey = config.find(line => line.startsWith('API_KEY')).split('=')[1];
const model = config.find(line => line.startsWith('MODEL')).split('=')[1];

const openai = new OpenAIApi(new Configuration({ apiKey }));

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.createChatCompletion({
            model,
            messages: [{ role: 'user', content: message }],
        });
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
