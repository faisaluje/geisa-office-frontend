import { URL_WEBSOCKET } from 'app/constants';
import openSocket from 'socket.io-client';

class WebSocket {
	socket;

	connect() {
		this.socket = openSocket(URL_WEBSOCKET);
	}

	isConnected() {
		return this.socket.json.connected;
	}
}

const webSocket = new WebSocket();

export default webSocket;
