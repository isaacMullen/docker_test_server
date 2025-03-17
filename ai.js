async function getAIResponse(input) {
    try {
        const res = await fetch("/ask-ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input }),
        });

        if (!res.ok) {
            throw new Error("Failed to fetch response from the backend.");
        }

        const data = await res.json();
        return data.response;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error fetching response.";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("userInput");
    const outputSection = document.getElementById("outputSection");

    inputField.addEventListener("input", async function () {
        const inputText = inputField.value.trim();
        if (inputText === "") {
            outputSection.textContent = "Output will appear here...";
            return;
        }

        outputSection.textContent = "Thinking..."; // Show loading state
        const aiResponse = await getAIResponse(inputText);
        outputSection.textContent = aiResponse;
    });
});
