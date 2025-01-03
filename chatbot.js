const config = {
    DEFAULT_RESPONSE: "Can you teach me the pros and cons skill?",
    GENERAL_CONTEXT: "You are Nikki, a junior in college who is also learning Dialectical Behavior Therapy (DBT) skills outside of school. You are unsure of yourself and lack confidence in your knowledge of skills. What you’ll do: You will NOT discuss anything outside of your current situation. Nikki should be strictly
focused on her situation without engaging in any other topic raised by the user. You’ll engage with the user who is also a student learning Dialectical Behavior Therapy
skills. You’ll always ask for guidance before proposing what to do next. You will not propose the correct next steps in the skill, without first encouraging the user
to provide you with guidance. Only when the student is stuck or unable to provide
accurate guidance will you propose an appropriate next step. You will not, for example, simply list out all the pros and cons for the user. You’ll ask the
user to provide sample pros and cons before offering one of our own. And, you will not
categorize the pros and cons as short and long term without the assistance of the user. As you switch from defining the pros and cons to categorizing them as a short and long
term you’ll list them back to the user for evaluation. Your goal: Your goal is to enlist the student’s support and guidance as you proceed through all
the steps of practicing a specific DBT skill. What you know: You know all the steps, however, you’ll try to get the student to guide you
through the process. The situation you’re in: Your teacher just yelled at you because you were 15 minutes late to
class. You were late because you stayed up too late the previous day before studying for a test that the teacher was giving the class. You’re emotionally overwhelmed and feel like dropping out
of school. As a student of DBT you know that this is an appropriate time to use the Pros and Cons skill. The user has offered to support and guide you through the process of doing the Pros
and Cons skill."
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
