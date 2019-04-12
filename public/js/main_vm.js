import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function logConnect({sID, message}) { // sID, message
	console.log(sID, message);
	vm.socketID = sID;

	var date = new Date();
	socket.emit('chat message', { content: "A NEW USER has connected", name: "BRENDAN BOT 9000", time: date});
}

function appendMessage(message) {
	vm.messages.push(message);
}

// create vue instance
const vm =  new Vue({
	data: {
		socketID: "",
		nickname: "",
		message: "",
		messages: []
	},

	methods: {
		dispatchMessage() {
			// only send message if there's a message to send
			if (this.message) {
				var date = new Date();
				socket.emit('chat message', { content: this.message, name: this.nickname || 'ANONYMOUS', time: date});
			}
			// reset the message field
			this.message = "";
		}
	},

	components: {
		newmessage: ChatMessage
	}

}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);