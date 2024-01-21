document.getElementById('sendBtn').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKey').value;
    const userInput = document.getElementById('userInput').value;
    if (!apiKey) {
        alert('请输入API密钥');
        return;
    }
    if (!userInput.trim()) {
        alert('请输入消息');
        return;
    }
    displayMessage('用户', userInput); // 直接显示用户消息
    callApiAndDisplayResponse(apiKey, userInput);
    document.getElementById('userInput').value = ''; // 清空输入框
});

function displayMessage(sender, message) {
    const chatDisplay = document.getElementById('chatDisplay');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: `;
    chatDisplay.appendChild(messageDiv);

    if (sender === 'AI') {
        displayMessageLetterByLetter(message, messageDiv);
    } else {
        messageDiv.textContent += message;
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // 滚动到最新消息
}

function displayMessageLetterByLetter(message, element) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 5); // 调整为所需的速度
}
function displayMessage(sender, message) {
    const chatDisplay = document.getElementById('chatDisplay');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${message}`;
    chatDisplay.appendChild(messageDiv);

    // 添加分隔
    const separator = document.createElement('div');
    separator.style.height = '1em'; // 或者使用 <br>
    chatDisplay.appendChild(separator);

    chatDisplay.scrollTop = chatDisplay.scrollHeight; // 滚动到最新消息
}

function callApiAndDisplayResponse(apiKey, userInput) {
    const apiUrl = 'https://rcgjjtcs.cloud.sealos.io/v1/chat/completions';
    const data = {
        model: "gpt-4",
        messages: [
            { role: "user", content: userInput }
        ],
        presence_penalty: 0
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` // 使用用户输入的API密钥
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const responseText = data.choices ? data.choices[0].message.content : "无响应数据";
        displayMessage('Writer', responseText); // 逐字显示AI回复
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modelSelector').addEventListener('change', function() {
        var selectedModel = this.value;
        // 根据selectedModel更新API请求或其他逻辑
        console.log("用户选择的模型:", selectedModel);
        // 例如，更新API URL或请求参数
    });
});
