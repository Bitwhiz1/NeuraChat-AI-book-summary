async function sendMessage() {
    let input = document.getElementById("userInput").value;
    if (!input) return;

    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p><b>You:</b> ${input}</p>`;

    let response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
    });

    let data = await response.json();
    chatbox.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}
