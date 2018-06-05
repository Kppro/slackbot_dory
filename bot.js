const RtmClient  = require('@slack/client').RtmClient;
// const WebClient  = require('@slack/client').WebClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const bot_token = "xoxb-376760662918-375782643699-ZJ1waVnJf6nFkHjpNUQJZE1O";
const rtm       = new RtmClient(bot_token);
// const web       = new WebClient(bot_token);
/*
const botName = 'dory';

const startCommand = "pr ";

var commands = [
	"list"	
];

var store = [];

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (data) => {
    console.log(`Authenticated to ${data.team.name}`);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    if (message.type === 'message' && message.text) {
		const userName = getUsernameFromId(message.user);

		if (username == botName) return;

    	// not a valid command
    	if (!message.text.indexOf(startCommand) === 0) {
    		rtm.sendMessage('@' + userName + ' je n\'ai pas compris votre demande');
    	}

        var command = message.text.replace(startCommand, "").trim();
        if (command.indexOf(" ") !== -1) command = command.split(" ")[0];

        console.log("command received : " + command);

        onCommand(command);
    }
});

function onCommand(c) {
	if (c == "list") {
		if (!store.length) {
			console.log("store is empty");
			rtm.sendMessage('0 pull request en attente de review');
		} else  {
			var result = store.join("\n");
			rtm.sendMessage(store.length + ' pull request en attente de review :\n' + result);
		}
	}

	if (c.indexOf("http://") === 0 || c.indexOf("https://") === 0) {
		console.log("new pr in store : " + p);
		store.push(c);
		rtm.sendMessage('votre pr est ajoutée dans la pile');
	}
}

var users = [];

function updateUsers(data) {
    users = data.members;
}

function getUsernameFromId(id) {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'unknown member';
}

// fetch users in channel
web.users.list((err, data) => {
    if (err) {
        console.error('web.users.list Error:', err);
    } else {
        updateUsers(data);
    }
});

rtm.start();

*/