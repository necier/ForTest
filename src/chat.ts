import io from "socket.io-client";

const socket = io("http://localhost:3000");

const messageList = document.getElementById("messageList") as HTMLUListElement;
const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const messageInput = document.getElementById("messageInput") as HTMLInputElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value;
  const imageFile = imageInput.files[0];

  if (message || imageFile) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageBase64 = event.target.result as string;
      const messageData = {
        message: message || "",
        image: imageBase64 || "",
      };

      socket.emit("message", messageData);
    };

    reader.readAsDataURL(imageFile);
  }

  messageInput.value = "";
  imageInput.value = "";
});

socket.on("message", (messageData) => {
  const messageItem = document.createElement("li");

  if (messageData.image) {
    const imageElement = document.createElement("img");
    imageElement.src = messageData.image;
    messageItem.appendChild(imageElement);
  }

  if (messageData.message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = messageData.message;
    messageItem.appendChild(messageElement);
  }

  messageList.appendChild(messageItem);
});

const body = document.body;
body.style.backgroundColor = "#E6F2FF";
