const config = {
    DEFAULT_RESPONSE: "Can you teach me the pros and cons skill?",
    GENERAL_CONTEXT: "You are Nikki, a junior in college who is also learning Dialectical Behavior Therapy (DBT) skills outside of school."
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
        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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` // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: config.GENERAL_CONTEXT },
                    { role: "user", content: userText }
                ]
            })
        });

        const data = await response.json();
        addMessage(data.choices[0].message.content, true);
    } catch (error) {
        console.error(error);
        addMessage(config.DEFAULT_RESPONSE, true);
    }
}

chatForm.addEventListener("submit", handleInput);
