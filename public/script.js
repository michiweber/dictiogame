/**
 * Variables
 */
const locals = ['en', 'de'];
const currentLocal = 'en';

/**
 * Function
 */
function update(placeholder, replacement) {
    /* Get the HTML element */
    const elements = document.querySelectorAll('[data-placeholder="' + placeholder + '"]');
    /* Replace the HTML elements */
    const count = elements.length;
    for (let i = 0; i < count; i++) {
        const element = elements[i];
        element.innerHTML = replacement;
    }
}

/**
 * Language support
 */
const sentences = {
    "Host game": {
        "en": "Host game",
        "de": "Spiel hosten"
    },
    "Join game": {
        "en": "Join game",
        "de": "Spiel beitreten"
    }
};
function translate(sentence) {
    return sentences[sentence] !== undefined && sentences[sentence][currentLocal] !== undefined ? sentences[sentence][currentLocal] : '';
}

/**
 * Main
 */
function main() {

    /* Translate the main page */
    update('lang.host-game', translate('Host game'));
    update('lang.join-game', translate('Join game'));


}
main();







// $(function() {
//
//     $(".input input").focus(function() {
//
//         $(this).parent(".input").each(function() {
//             $("label", this).css({
//                 "line-height": "18px",
//                 "font-size": "18px",
//                 "font-weight": "100",
//                 "top": "0px"
//             })
//             $(".spin", this).css({
//                 "width": "100%"
//             })
//         });
//     }).blur(function() {
//         $(".spin").css({
//             "width": "0px"
//         })
//         if ($(this).val() == "") {
//             $(this).parent(".input").each(function() {
//                 $("label", this).css({
//                     "line-height": "60px",
//                     "font-size": "24px",
//                     "font-weight": "300",
//                     "top": "10px"
//                 })
//             });
//
//         }
//     });
//
//     $(".button").click(function(e) {
//         var pX = e.pageX,
//             pY = e.pageY,
//             oX = parseInt($(this).offset().left),
//             oY = parseInt($(this).offset().top);
//
//         $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
//         $('.x-' + oX + '.y-' + oY + '').animate({
//             "width": "500px",
//             "height": "500px",
//             "top": "-250px",
//             "left": "-250px",
//
//         }, 600);
//         $("button", this).addClass('active');
//     })
//
//     $(".alt-2").click(function() {
//         if (!$(this).hasClass('material-button')) {
//             $(".shape").css({
//                 "width": "100%",
//                 "height": "100%",
//                 "transform": "rotate(0deg)"
//             })
//
//             setTimeout(function() {
//                 $(".overbox").css({
//                     "overflow": "initial"
//                 })
//             }, 600)
//
//             $(this).animate({
//                 "width": "140px",
//                 "height": "140px"
//             }, 500, function() {
//                 $(".box").removeClass("back");
//
//                 $(this).removeClass('active')
//             });
//
//             $(".overbox .title").fadeOut(300);
//             $(".overbox .input").fadeOut(300);
//             $(".overbox .button").fadeOut(300);
//
//             $(".alt-2").addClass('material-buton');
//         }
//
//     })
//
//     $(".material-button").click(function() {
//
//         if ($(this).hasClass('material-button')) {
//             setTimeout(function() {
//                 $(".overbox").css({
//                     "overflow": "hidden"
//                 })
//                 $(".box").addClass("back");
//             }, 200)
//             $(this).addClass('active').animate({
//                 "width": "700px",
//                 "height": "700px"
//             });
//
//             setTimeout(function() {
//                 $(".shape").css({
//                     "width": "50%",
//                     "height": "50%",
//                     "transform": "rotate(45deg)"
//                 })
//
//                 $(".overbox .title").fadeIn(300);
//                 $(".overbox .input").fadeIn(300);
//                 $(".overbox .button").fadeIn(300);
//             }, 700)
//
//             $(this).removeClass('material-button');
//
//         }
//
//         if ($(".alt-2").hasClass('material-buton')) {
//             $(".alt-2").removeClass('material-buton');
//             $(".alt-2").addClass('material-button');
//         }
//
//     });
//
// });



// /*
// * Variables
// */
//
// let socket;
//
//
// function hostGame() {
//     /* Show back button */
//     showBack(() => {
//         /* Switch to select username */
//         switchToHost(username => {
//             /* Switch to loading */
//             switchToLoading(() => {
//                 connect('', username);
//             });
//         });
//     });
// }
//
// function joinGame() {
//     /* Show back button */
//     showBack(() => {
//         /* Switch to select username */
//         switchToJoin(data => {
//             /* Switch to loading */
//             switchToLoading(() => {
//                 connect(data.roomId, data.username);
//             });
//         });
//     });
// }
//
// function connect(roomId, username) {
//     /* Create a room with socket.io */
//     socket = io.connect(window.location.origin,{query:'room=' + roomId + '&username=' + username});
//     socket.onAny((eventName, ...args) => {
//         console.log(eventName, args);
//         switch (eventName) {
//             case 'roomId':
//                 /* Switch to lobby */
//                 switchToLobby(() => {
//                     update('roomId', args[0]);
//                 });
//                 /* Store the info */
//                 window.localStorage.setItem('dictio-roomId', args[0]);
//                 window.localStorage.setItem('dictio-username', username);
//                 break;
//             case 'roomUpdate':
//                 onRoomUpdate(args[0]);
//                 break;
//             case 'error':
//                 switchToStart(() => {
//                     showError(args[0]);
//                 });
//                 break;
//         }
//     });
// }
//
// function onRoomUpdate(roomObject) {
//     if (roomObject.players !== undefined) {
//         let players = '<ul>';
//         const count = roomObject.players.length;
//         for (let i = 0; i < count; i++) {
//             const player = roomObject.players[i];
//             players += '<li>' + player + '</li>';
//         }
//         players += '</ul>';
//         update('players', players);
//     }
// }
//
// function switchToHost(callback) {
//     document.getElementById('start').style.display = 'none';
//     const host = document.getElementById('host');
//     host.style.display = 'block';
//
//     /* Focus */
//     const input = host.getElementsByTagName('input')[0];
//     input.focus();
//
//     /* Subscribe */
//     host.onsubmit = function (event) {
//         event.stopPropagation();
//         event.preventDefault();
//         callback(input.value);
//     }
// }
//
// function showError(error) {
//     document.getElementById('error').style.display = 'block';
//     update('error', error);
// }
//
// function switchToJoin(callback) {
//     document.getElementById('start').style.display = 'none';
//     const join = document.getElementById('join');
//     join.style.display = 'block';
//
//     /* Focus */
//     const inputs = join.getElementsByTagName('input');
//     const input = inputs[0];
//     input.focus();
//
//     /* Subscribe */
//     join.onsubmit = function (event) {
//         event.stopPropagation();
//         event.preventDefault();
//
//         const data = { roomId: '', username: '' };
//
//         const count = inputs.length;
//         for (let i = 0; i < count; i++) {
//             const input = inputs[i];
//             data[input.name] = input.value;
//         }
//
//         callback(data);
//     }
// }
//
// function showBack(callback) {
//     const back = document.getElementById('back');
//     if (back !== undefined) {
//         back.style.display = 'block';
//     }
//     /* Click listener */
//     back.onclick = function() {
//         hideBack(() => {
//             switchToStart(() => {});
//         });
//     };
//     callback();
// }
//
// function hideBack(callback) {
//     const back = document.getElementById('back');
//     if (back !== undefined) {
//         back.style.display = 'none';
//     }
//     callback();
// }
//
// function showLeave(callback) {
//     const leave = document.getElementById('leave');
//     if (leave !== undefined) {
//         leave.style.display = 'block';
//     }
//     /* Click listener */
//     leave.onclick = function() {
//         /* Leave the room */
//         socket.disconnect();
//         /* Remove local storage */
//         window.localStorage.removeItem('dictio-roomId');
//         window.localStorage.removeItem('dictio-username');
//         /* Remove lobby class from other content elements */
//         const contentLeft = document.getElementsByClassName('content-left')[0];
//         if (contentLeft !== null && contentLeft !== undefined) {
//             contentLeft.classList.remove('lobby');
//         }
//         const contentCenter = document.getElementsByClassName('content-center')[0];
//         if (contentCenter !== null && contentCenter !== undefined) {
//             contentCenter.classList.remove('lobby');
//         }
//         /* Switch back */
//         hideLeave(() => {
//             switchToStart(() => {});
//         });
//     };
//     callback();
// }
//
// function hideLeave(callback) {
//     const leave = document.getElementById('leave');
//     if (leave !== undefined) {
//         leave.style.display = 'none';
//     }
//     callback();
// }
//
// function switchToStart(callback) {
//     const children = document.getElementsByClassName('content-right')[0].children;
//     const count = children.length;
//     for (let i = 0; i < count; i++) {
//         const child = children[i];
//         if (child.id === 'start') {
//             child.style.display = 'block';
//         } else {
//             child.style.display = 'none';
//         }
//     }
//     callback();
// }
//
// function switchToLoading(callback) {
//     const children = document.getElementsByClassName('content-right')[0].children;
//     const count = children.length;
//     for (let i = 0; i < count; i++) {
//         const child = children[i];
//         if (child.id === 'loading') {
//             child.style.display = 'block';
//         } else {
//             child.style.display = 'none';
//         }
//     }
//     callback();
// }
//
// function switchToLobby(callback) {
//     hideBack(() => {
//         showLeave(() => {
//             /* Add lobby class to other content elements */
//             const contentLeft = document.getElementsByClassName('content-left')[0];
//             if (contentLeft !== null && contentLeft !== undefined) {
//                 contentLeft.classList.add('lobby');
//             }
//             const contentCenter = document.getElementsByClassName('content-center')[0];
//             if (contentCenter !== null && contentCenter !== undefined) {
//                 contentCenter.classList.add('lobby');
//             }
//             /* Show right content */
//             const children = document.getElementsByClassName('content-right')[0].children;
//             const count = children.length;
//             for (let i = 0; i < count; i++) {
//                 const child = children[i];
//                 if (child.id === 'lobby') {
//                     child.style.display = 'block';
//                     /* Enable the chat functionality */
//                     enableChat(child);
//                 } else {
//                     child.style.display = 'none';
//                 }
//             }
//             callback();
//         });
//     });
// }
//
// function enableChat(htmlWrap) {
//     /* Chat */
//     const chat = htmlWrap.getElementsByClassName('chat')[0];
//     /* Form */
//     const form = chat.getElementsByTagName('form')[0];
//     /* Subscribe form */
//     form.onsubmit = function (event) {
//         event.stopPropagation();
//         event.preventDefault();
//         /* The message */
//         const message = event.target.getElementsByTagName('input')[0].value;
//         /* Send the message */
//         socket.emit(message);
//     }
// }
//
// function update(placeholder, value) {
//     const elements = document.querySelectorAll('[data-placeholder="' + placeholder + '"]');
//     const count = elements.length;
//     for (let i = 0; i < count; i++) {
//         const element = elements[i];
//         element.innerHTML = value;
//     }
// }
//
// /* Main action */
// function main() {
//
//     // /* Check if credentials are stored in case of refresh */
//     // const storedRoomId = window.localStorage.getItem('dictio-roomId');
//     // const storedUsername = window.localStorage.getItem('dictio-username');
//     //
//     // if (storedRoomId !== null && storedUsername !== null) {
//     //     connect(storedRoomId, storedUsername);
//     // }
//
// }
// main();