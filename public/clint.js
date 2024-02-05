const socket = io()

let names;

let textarea=document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
   names = prompt("enter your name :")
}while(!names)

textarea.addEventListener('keyup', (e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg= {
        user: names,
        message:message.trim()
    }

    //append
    appendMessage(msg,'outgoing')
    textarea.value = '';
    scrollToBottom()

    // firlstly we emitt from clint and send to server   
    socket.emit('message',msg)   // message is event we can name it any thing,  msg object is emmitted from this clint and emitted to server
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


//receive messages to print. this data is emitted by the server to all clients
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


//scroll to botton automatically

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}