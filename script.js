let prompt = document.querySelector("#prompt")
let btn = document.querySelector("#btn")
let userMessage = null

function createChatBox(html, className) {
    let div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html
  return div  
}
btn.addEventListener("click",()=>{
    userMessage = prompt.value
    // console.log(userMessage)
    if(!userMessage)
        return;
    let html = `<div class="img">
                <img src="user-avatar.png" alt="user" width="50">
            </div>
            <p class="text"></p>`;
        let userChatBox = createChatBox(html,"user-chat-box")
        userChatBox.querySelector(".text").innerText = userMessage
})