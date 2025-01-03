const config = {
    DEFAULT_RESPONSE: "I’m sorry, I didn’t understand. Can you rephrase?",
    GENERAL_CONTEXT: "You are a helpful chatbot that assists with DBT skills."
};

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function addMessage(text, isBot) {
    const message = document.createElement("div");
    message.classList.add("message", isBot ? "bot-message" : "user-message");
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleInput(event) {
    event.preventDefault();

    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage(userText, false);
    userInput.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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` 
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                { role: "system", content: config.GENERAL_CONTEXT },
                { role: "user", content: userText }
                ]
            })
        });

        if (!response.ok) {
            console.error("Error:", response.status, response.statusText);
            addMessage(config.DEFAULT_RESPONSE, true);
            return;
        }

        const data = await response.json();
        addMessage(data.choices[0].message.content, true);
    } catch (error) {
        console.error("Error:", error);
        addMessage(config.DEFAULT_RESPONSE, true);
    }
}

chatForm.addEventListener("submit", handleInput);
