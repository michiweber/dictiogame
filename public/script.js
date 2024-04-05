/*
* Variables
*/

let socket;


function hostGame() {
    /* Show back button */
    showBack(() => {
        /* Switch to select username */
        switchToHost(username => {
            /* Switch to loading */
            switchToLoading(() => {
                connect('', username);
            });
        });
    });
}

function joinGame() {
    /* Show back button */
    showBack(() => {
        /* Switch to select username */
        switchToJoin(data => {
            /* Switch to loading */
            switchToLoading(() => {
                connect(data.roomId, data.username);
            });
        });
    });
}

function connect(roomId, username) {
    /* Create a room with socket.io */
    socket = io.connect(window.location.origin,{query:'room=' + roomId + '&username=' + username});
    socket.onAny((eventName, ...args) => {
        console.log(eventName, args);
        switch (eventName) {
            case 'roomId':
                /* Switch to lobby */
                switchToLobby(() => {
                    update('roomId', args[0]);
                });
                /* Store the info */
                window.localStorage.setItem('dictio-roomId', args[0]);
                window.localStorage.setItem('dictio-username', username);
                break;
            case 'roomUpdate':
                onRoomUpdate(args[0]);
                break;
        }
    });
}

function onRoomUpdate(roomObject) {
    if (roomObject.players !== undefined) {
        let players = '<ul>';
        const count = roomObject.players.length;
        for (let i = 0; i < count; i++) {
            const player = roomObject.players[i];
            players += '<li>' + player + '</li>';
        }
        players += '</ul>';
        update('players', players);
    }
}

function switchToHost(callback) {
    document.getElementById('start').style.display = 'none';
    const host = document.getElementById('host');
    host.style.display = 'block';

    /* Focus */
    const input = host.getElementsByTagName('input')[0];
    input.focus();

    /* Subscribe */
    host.onsubmit = function (event) {
        event.stopPropagation();
        event.preventDefault();
        callback(input.value);
    }
}

function switchToJoin(callback) {
    document.getElementById('start').style.display = 'none';
    const join = document.getElementById('join');
    join.style.display = 'block';

    /* Focus */
    const inputs = join.getElementsByTagName('input');
    const input = inputs[0];
    input.focus();

    /* Subscribe */
    join.onsubmit = function (event) {
        event.stopPropagation();
        event.preventDefault();

        const data = { roomId: '', username: '' };

        const count = inputs.length;
        for (let i = 0; i < count; i++) {
            const input = inputs[i];
            data[input.name] = input.value;
        }

        callback(data);
    }
}

function showBack(callback) {
    const back = document.getElementById('back');
    if (back !== undefined) {
        back.style.display = 'block';
    }
    /* Click listener */
    back.onclick = function() {
        hideBack(() => {
            switchToStart(() => {});
        });
    };
    callback();
}

function hideBack(callback) {
    const back = document.getElementById('back');
    if (back !== undefined) {
        back.style.display = 'none';
    }
    callback();
}

function showLeave(callback) {
    const leave = document.getElementById('leave');
    if (leave !== undefined) {
        leave.style.display = 'block';
    }
    /* Click listener */
    leave.onclick = function() {
        /* Leave the room */
        socket.disconnect();
        /* Remove local storage */
        window.localStorage.removeItem('dictio-roomId');
        window.localStorage.removeItem('dictio-username');
        /* Switch back */
        hideLeave(() => {
            switchToStart(() => {});
        });
    };
    callback();
}

function hideLeave(callback) {
    const leave = document.getElementById('leave');
    if (leave !== undefined) {
        leave.style.display = 'none';
    }
    callback();
}

function switchToStart(callback) {
    const children = document.getElementsByClassName('content-right')[0].children;
    const count = children.length;
    for (let i = 0; i < count; i++) {
        const child = children[i];
        if (child.id === 'start') {
            child.style.display = 'block';
        } else {
            child.style.display = 'none';
        }
    }
    callback();
}

function switchToLoading(callback) {
    const children = document.getElementsByClassName('content-right')[0].children;
    const count = children.length;
    for (let i = 0; i < count; i++) {
        const child = children[i];
        if (child.id === 'loading') {
            child.style.display = 'block';
        } else {
            child.style.display = 'none';
        }
    }
    callback();
}

function switchToLobby(callback) {
    hideBack(() => {
        showLeave(() => {
            const children = document.getElementsByClassName('content-right')[0].children;
            const count = children.length;
            for (let i = 0; i < count; i++) {
                const child = children[i];
                if (child.id === 'lobby') {
                    child.style.display = 'block';
                } else {
                    child.style.display = 'none';
                }
            }
            callback();
        });
    });
}

function update(placeholder, value) {
    const elements = document.querySelectorAll('[data-placeholder="' + placeholder + '"]');
    const count = elements.length;
    for (let i = 0; i < count; i++) {
        const element = elements[i];
        element.innerHTML = value;
    }
}

/* Main action */
function main() {

    /* Check if credentials are stored in case of refresh */
    const storedRoomId = window.localStorage.getItem('dictio-roomId');
    const storedUsername = window.localStorage.getItem('dictio-username');

    if (storedRoomId !== null && storedUsername !== null) {
        connect(storedRoomId, storedUsername);
    }

}
main();