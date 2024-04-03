function hostGame() {
    /* Switch to select username */
    switchToSelectUsername(username => {
        /* Switch to loading */
        switchToLoading(() => {
            connect(true);
        })
    });
}

function joinGame() {
    /* Switch to select username */
    switchToSelectUsername(username => {
        /* Switch to loading */
        switchToLoading(() => {
            connect(false);
        })
    });
}

function connect(isHost) {
    /* Create a room with socket.io */
    const socket = io.connect();
    socket.onAny((eventName, ...args) => {
        switch (eventName) {
            case 'uuid':
                if (isHost) {
                    console.log('UUID', args[0]);
                }
                break;
        }
    });
}

function switchToSelectUsername(callback) {
    document.getElementById('start').style.display = 'none';
    const username = document.getElementById('username');
    username.style.display = 'block';

    /* Focus */
    const input = username.getElementsByTagName('input')[0];
    input.focus();

    /* Subscribe */
    username.onsubmit = function (event) {
        event.stopPropagation();
        event.preventDefault();
        callback(input.value);
    }
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