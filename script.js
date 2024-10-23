// let prompt = document.querySelector("#prompt")
// let btn = document.querySelector("#btn")
// let userMessage = null

// function createChatBox(html, className) {
//     let div = document.createElement("div")
//     div.classList.add(className)
//     div.innerHTML=html
//   return div  
// }
// btn.addEventListener("click",()=>{
//     userMessage = prompt.value
//     // console.log(userMessage)
//     if(!userMessage)
//         return;
//     let html = `<div class="img">
//                 <img src="user-avatar.png" alt="user" width="50">
//             </div>
//             <p class="text"></p>`;
//         let userChatBox = createChatBox(html,"user-chat-box")
//         userChatBox.querySelector(".text").innerText = userMessage
// })


let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;

// put api with key
let Api_url = 'api+key'
function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text");
    try {
        let response = await fetch(Api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //Yhaa sirf single object de rha hu
                "contents": [
                    {"parts": [{ "text": userMessage }]}
                ]
            })
        });
        let data = await response.json();
        console.log(data); 
        let apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (apiResponse) {
            textElement.innerText = apiResponse;
            console.log(apiResponse);
        } else {
            console.log("Unexpected response format:", data);
            textElement.innerText = "Error: Could not get a response.";
        }
    } catch (error) {
        console.log("Error fetching the API response:", error);
        textElement.innerText = "Error: Failed to fetch response.";
    } finally {
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}

function showLoading() {
    let html = `<div class="img">
                <img src="ai.png" alt="ai-chatbot" width="50">
            </div>
            <p class="text"></p>
            <img class="loading" src="loading.gif" alt="loading" height="50px">`;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    return aiChatBox;
}

btn.addEventListener("click", () => {
    userMessage = prompt.value;
    console.log(userMessage);
    if (userMessage === "") {
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
    if (!userMessage) return;
    let html = `<div class="img">
                <img src="user-avatar.png" alt="user" width="50">
            </div>
            <p class="text"></p>`;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatContainer.appendChild(userChatBox);
    prompt.value = ""; 

    setTimeout(() => {
        let aiChatBox = showLoading();
        getApiResponse(aiChatBox);
    }, 500);
});



