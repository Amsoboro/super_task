const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatArea = document.querySelector("#chat-area");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const messageText = chatInput.value;
  if (messageText.trim() !== "") {
    //여기서 메세지 서버로 전송
    await sendMessage(messageText);
    chatInput.value = ""; //입력 필드 비움
  }
});

async function sendMessage(message) {
  try {
    const response = await fetch("/send-message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });
    if (response.ok) {
      console.log("메세지 전송 성공");
      appendMessage(message); //메세지 추가
    } else {
      console.error("메세지 전송 실패");
    }
  } catch (error) {
    console.error("오류발생", error);
  }
}

async function getMessage() {
  try {
    const response = await fetch("/get-messages/");
    if (response.ok) {
      const data = await response.json();
      return data.messages;
    } else {
      console.error("메세지 불러오기 실패");
      return [];
    }
  } catch (error) {
    console.error("오류발생", error);
    return [];
  }
}

async function appendMessage(message) {
  chatArea.innerHTML += `<div>${message}</div>`;
}
