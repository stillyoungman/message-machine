// document.getElementById("send").addEventListener("click", function (event) {
//     event.preventDefault()
// });

const messageSound = new Audio('assets/plucky.ogg');


toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "700",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
let un = localStorage.getItem('username');
//set board size
setTimeout(() => {
    let height = window.innerHeight - 200;
    let b = document.getElementById('board');
    b.setAttribute("style", `max-height:${height};`);
    b.classList.remove("invis");
}, 100);

let authSocket = io('/nameless');

let hasNewMessage = false;

$(() => {
    let key = localStorage.getItem('secret-key');
    if (key) {
        console.log("has key!")//here should be init of name
        authSocket.emit('auto-enter', key);
        authSocket.on('not-valid', () => {
            localStorage.removeItem('secret-key');
            localStorage.removeItem('username');
            location.reload();
        });
    } else {
        authSocket.on('success', (user) => {
            un = user.username;
            localStorage.setItem('username', un);
            localStorage.setItem('secret-key', user.key);
        })
        setName(authSocket);
    }
})

let socket = io('/auth');

$(function () {
    $('form').submit(function () {
        if ($('#m').val().trim()) {
            socket.emit('chat-message', { msg: $('#m').val(), key: myKey() });
        }
        $('#m').val('');
        return false;
    });
    socket.on('chat-message', function (data) {
        let { msg, username } = JSON.parse(data);
        if (username !== myName()) {
            console.log("not mine");
            hasNewMessage = true;
            messageSound.play();
        }
        $('#board')
            .append($(`<div class="mess ${username === myName() ? 'own' : ''}">`)
                .append($('<div class="owner">').text(username))
                .append($('<div class="payload">').text(msg)));
        const { scrollHeight, scrollLeft, scrollTop, scrollWidth } = document.getElementById('board');
        const scroll = { scrollHeight, scrollLeft, scrollTop, scrollWidth };
        console.log(scroll, scrollHeight - scrollTop);
        console.log(document.getElementsByClassName('area'));
    });


});

function setName(socket) {
    un = prompt("Введите ваше имя");
    socket.emit('set-username', un);
}

myName = () => localStorage.getItem('username');
myKey = () => localStorage.getItem('secret-key');
console.log(socket);

document.getElementById('board').addEventListener(('scroll'), (e) => {
    const { scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.target;
    const scroll = { scrollHeight, scrollLeft, scrollTop, scrollWidth };
    console.log(scroll, scrollHeight - scrollTop);
})

