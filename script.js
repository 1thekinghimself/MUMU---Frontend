const BACKEND_URL = "https://mumu-backend.onrender.com"; // change to your backend URL

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  input.value = "";

  const thinking = appendMessage("MUMU is thinking...", "bot");

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    thinking.remove();
    appendMessage(data.reply || "MUMU didn’t reply 😅", "bot");
  } catch (error) {
    thinking.remove();
    appendMessage("⚠️ MUMU is offline or network error.", "bot");
    console.error(error);
  }
}

function appendMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
