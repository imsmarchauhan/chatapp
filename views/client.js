const socket = io("http://localhost:8000")

var name = prompt("Enter your name to join the chat:")
socket.emit('user-joined', name);

var first = document.querySelector('.first');

function generateMessage(msg, side){
    var msgDiv = document.createElement("div");
    msgDiv.classList.add('alert');

    if(side === "left"){
        msgDiv.classList.add("alert-primary");
        msgDiv.classList.add("left");
    }else if(side === "right"){
        msgDiv.classList.add("alert-success")
        msgDiv.classList.add("right")
    }else{
        msgDiv.classList.add("alert-secondary")
        msgDiv.classList.add("center")
    }
    
    msgDiv.innerHTML = msg;
    first.appendChild(msgDiv)
};

socket.on("new-user-joined", (name)=>{
    if(name === "null")
    return
    generateMessage(`${name} joined the chat`, 'center');
});

socket.on("left", ({name})=>{
    if(name === "null")
    return
    generateMessage(`${name} left the chat`, 'center');
});

function postData(){
    var message = document.getElementById("message")
    socket.emit("send",message.value)
    generateMessage(`${message.value} : You`,"right")
    message.value = ""
}

socket.on("receive", ({message, name})=>{
    generateMessage(`${name} : ${message}`, 'left')
})
