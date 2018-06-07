
const { RTMClient, WebClient } = require('@slack/client');

const token = "xoxb-376760662918-375782643699-ZJ1waVnJf6nFkHjpNUQJZE1O";
const rtm = new RTMClient(token);
const web = new WebClient(token);

const botname = 'dory';
let botId = null;
let channelId = null;

const startCommand = "pr ";

var commands = [
	"list",
	"add",
	"review"
];

var personality = [
	"Bonjour, je m\’appelle Dory. J\’ai une maladie qui s\’appelle la trouble de mémoire immédiate.",
	"Je les ai perdu… J’ai perdu tout le monde… Mais je ne me rappelle plus qui…",
	"Et en fait je crois que j’ai jamais mangé de poisson de ma vie"
];

var store = [];


/*
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (data) => {
    console.log(`Authenticated to ${data.team.name}`);
});*/

rtm.on('message', function handleRtmMessage(message) {
	//console.log(message);
	// console.log("botId : " + botId);
	channelId = message.channel;

	// exit if not a text message
	if (message.type != 'message' || !message.text) {
		console.log("exit if not a text message");
		return;
	}
	
	// exit if not a message for the bot
	let botMention = '<@'+botId+'>';
	if (botId == null || message.text.indexOf(botMention) !== 0) {
		console.log("exit if not a message for the bot");
		return;
	}
    
    // exit if bot sent this message
    const username = getUsernameFromId(message.user);
	if (message.username == botname || username == botname) {
		console.log("exit if bot sent this message");
		return;
	}
	
	//console.log("message from : " + username);

	let messageContent = message.text.replace(botMention, '').trim();
	// exit if not a valid command prefix
	if (messageContent.indexOf(startCommand) !== 0) {
		onCommandNotFound(message);
		return;
	}

	// exit if not a valid command
    let command = messageContent.replace(startCommand, "").trim();
    let arg = "";
    if (command.indexOf(" ") !== -1) {
    	let splited = command.split(" ");
    	command = splited[0];
    	arg = splited[1];
    }

    if (commands.indexOf(command) == -1) {
		onCommandNotFound(message);
		return;
    }

    console.log("command received : " + command);

    onCommand(command, arg, username);
});

function onCommandNotFound() {
	let random = getRandomArbitrary(0, 3);
	console.log("random", random);
	let reply = personality[random];
	postMessage(reply);
}

function onCommand(c, arg, username) {
	if (c == "list") {
		if (!store.length) {
			console.log("store is empty");
			postMessage('0 pull request en attente de review');
		} else  {
			var result = store.join("\n");
			postMessage(store.length + ' pull request en attente de review :\n' + result);
		}
	} else if (c == "add") {
		if (!arg) {
			console.log("missing argument", arg);
			return;
		}

		if (arg.indexOf("http://") === 0 || arg.indexOf("https://") === 0) {
			console.log("invalid argument", arg);
			return;
		}

		console.log("new pr in store : " + arg);
		store.push(arg);
		postMessage('votre pr est ajoutée.\n' + store.length + ' pull request en attente de review.');

	} else if (c == "review") {
		var pr = store.pop();
		postMessage(username + ' commence la review de ' + pr + '\n' + 'il reste maintenant ' + store.length + ' pull request en attente de review.');

	}
}

var users = [];

function updateUsers(data) {
	// console.log("updateUsers", data);
    users = data.members;
}

function getUsernameFromId(id) {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'unknown member';
}

function updateBotId() {
	let bot = users.find(user => user.name === botname);
	botId = bot.id;
}


// fetch users in channel
web.users.list().then((data, err) => {
	// console.log('web users list', data, err);
    updateUsers(data);
    updateBotId();
});

async function getUserInfo(user) {
	var res = await web.users.info({user: user}).then((data) => data.user.name);
	console.log("getUserInfo", res);
	return res;
}

function postMessage(text) {
	web.chat.postMessage({token:token, channel: channelId, text: text, as_user: false, username: botname}).then((res) => console.log(res));
}

// On renvoie un nombre aléatoire entre une valeur min (incluse) 
// et une valeur max (exclue)
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

rtm.start();