function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<p>' + message + '</p>');
}

function processUserInput(chatApp, socket) {
    var message = $('#send_message').val();
    var systemMessage;

    if (message.charAt(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#show_message').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#cur_room').text(), message);
        $('#show_message').append(divEscapedContentElement(message));
        $('#show_message').scrollTop($('#show_message').prop('scrollHeight'));
    }

    $('#send_message').val('');
}

var socket = io.connect();

$(document).ready(function () {
    var chatApp = new Chat(socket);

    socket.on('nameResult', function (result) {
        var message;

        if (result.success) {
            message = '| You are now known as ' + result.name + '. |';
        } else {
            message = result.message;
        }
        $('#show_message').append(divSystemContentElement(message));
    });

    socket.on('joinResult', function (result) {
        $('#cur_room').text(result.room);
        $('#show_message').append(divSystemContentElement('| Room changed. |'));
    });

    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#show_message').append(newElement);
    });

    socket.on('rooms', function (rooms) {
        $('#room_list').empty();

        for (var room in rooms) {
            room = room.substring(1, room.length);
            if (room != '') {
                $('#room_list').append(divEscapedContentElement(room));
            }
        }

        $('#room_list div').click(function () {
            chatApp.processCommand('/join ' + $(this).text());
            $('#send_message').focus();
        });
    });

    setInterval(function () {
        socket.emit('rooms');
    }, 1000);

    $('#send_message').focus();

    $('#send_form').submit(function () {
        processUserInput(chatApp, socket);
        return false;
    });
});

