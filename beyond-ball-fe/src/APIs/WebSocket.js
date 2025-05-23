import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import {SOCKET_ENDPOINTS} from "./Endpoints.js";
import Storage from "../utils/Storage.js"

let stompClient = null;

export function connect(itemId, element, onMessage) {

    let topic = "";

    switch (element) {
        case "WHITEBOARD":
            topic = SOCKET_ENDPOINTS.WHITEBOARD(itemId);
            break
        case "CLIP":
            topic = SOCKET_ENDPOINTS.CLIP(itemId);
            break
        case "COMMENT":
            topic = SOCKET_ENDPOINTS.WHITEBOARD_COMMENT(itemId);
            break
        case "NOTE":
            topic = SOCKET_ENDPOINTS.CLIP_NOTE(itemId);
            break
        case "FOLDER":
            topic = SOCKET_ENDPOINTS.FOLDER(itemId);
            break
        default:
            console.error("Invalid element type");
        return;
    }

    const token = Storage.getToken();

    stompClient = new Client({
        // brokerURL: `${import.meta.env.VITE_WS_API_URL}`, // frontend makes requests to the same origin it was loaded from
        brokerURL: `ws://${import.meta.env.VITE_API_URL}:8080/ws`, // frontend makes requests to the same origin it was loaded from
        connectHeaders: {
            Authorization: `Bearer ${token}`,    //todo check out how to get token on backend
        },
        debug: function (str) {
            console.log('[STOMP DEBUG]', str);
        },
        reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
        onConnect: () => {
            console.log('STOMP connected');

            // Subscribe to item-specific topic
            stompClient.subscribe(topic, (message) => {
                const data = JSON.parse(message.body);
                console.log("Received message:", data);
                onMessage(data);
            });
        },
        onStompError: (frame) => {
            console.error('STOMP error:', frame.headers['message']);
        },
    });

    stompClient.activate();
}

export function disconnect() {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
}


