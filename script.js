var users = [
    { userId: 1, displayName: "User 1", profileImage: "default-profile.png" },
    { userId: 2, displayName: "User 2", profileImage: "default-profile.png" }
];

var currentUser = users[0];
var chatUser = {}; // Represents the user with whom the current chat is happening

function showHomeScreen() {
    document.getElementById("home-screen").style.display = "block";
    document.getElementById("chat-container").style.display = "none";
}

function loadChat(userId) {
    chatUser = users.find(user => user.userId === userId);

    // Update chat header with the selected user's information
    document.getElementById("chat-profile-image").src = chatUser.profileImage;
    document.getElementById("chat-user-name").textContent = chatUser.displayName;

    document.getElementById("home-screen").style.display = "none";
    document.getElementById("chat-container").style.display = "block";

    // Clear existing messages when loading a new chat
    document.getElementById("chat-messages").innerHTML = "";
}

function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();

    if (message !== "") {
        var chatMessages = document.getElementById("chat-messages");
        var newMessageContainer = document.createElement("div");
        var newMessage = document.createElement("div");

        newMessageContainer.className = "message-container";
        newMessage.className = currentUser.userId === chatUser.userId ? "message sender-message" : "message receiver-message";

        // Add emoji support (you can add more emojis as needed)
        message = message.replace(":)", "😊").replace(":(", "😢");

        newMessage.innerHTML = `<strong>${currentUser.displayName}:</strong> ${message}`;
        newMessageContainer.appendChild(newMessage);
        chatMessages.appendChild(newMessageContainer);

        // Clear the input field
        messageInput.value = "";

        // Scroll to the bottom to show the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Enable "Enter" key to send messages
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Quote a message on click
document.getElementById("chat-messages").addEventListener("click", function (event) {
    var clickedMessage = event.target.closest(".message");
    if (clickedMessage) {
        var quotedMessage = clickedMessage.cloneNode(true);
        quotedMessage.classList.add("quoted-message");
        document.getElementById("message-input").value = quotedMessage.textContent;
    }
});

// Initial setup
showHomeScreen();
