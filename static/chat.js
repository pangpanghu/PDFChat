window.addEventListener('DOMContentLoaded', function () {
    function sendMessage(messageType, prefix, messageContent) {
        var newMessage = document.createElement("div");
        newMessage.classList.add(messageType);
        newMessage.textContent = prefix + messageContent;

        document.getElementById("messages").appendChild(newMessage);
    }

    document.getElementById("user-send-to-bot").addEventListener("click", function () {
        var userInput = document.getElementById("user-input");
        var messageContent = userInput.value.trim();

        if (messageContent !== "") {
            sendMessage("user", "用户提问: ", messageContent);

            var waitingMessage = document.createElement("div");
            waitingMessage.textContent = "等待GPT回复中...";
            document.getElementById("messages").appendChild(waitingMessage);

            var progressBar = document.createElement("div");
            progressBar.classList.add("progress-bar");
            document.getElementById("messages").appendChild(progressBar);

            fetch('/bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageContent,
                }),
            })
            .then(response => response.json())
            .then(data => {
                waitingMessage.remove();
                progressBar.remove();
                sendMessage("bot", "", data['reply']);
            });

            userInput.value = "";
        }
    });
});
