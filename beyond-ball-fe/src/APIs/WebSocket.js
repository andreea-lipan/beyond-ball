import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import {SOCKET_ENDPOINTS} from "./Endpoints.js";
import Storage from "../utils/Storage.js"

let stompClient = null;

export function connect(itemId, element, onMessage) {

    const topic = element === "WHITEBOARD" ? SOCKET_ENDPOINTS.WHITEBOARD_INC(itemId) : SOCKET_ENDPOINTS.CLIP_INC(itemId);
    const token = Storage.getToken();

    stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
            Authorization: `Bearer ${token}`,
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


// export function connect(itemId, element, onCommentReceived) {
//     const socket = new SockJS(SOCKET_ENDPOINTS.BASE);
//     console.log(socket)
//     const topic = element === "WHITEBOARD" ? SOCKET_ENDPOINTS.WHITEBOARD_INC(itemId) : SOCKET_ENDPOINTS.CLIP_INC(itemId);
//
//     stompClient = new Client({
//         webSocketFactory: () => socket,
//         reconnectDelay: 5000,
//         onConnect: () => {
//             console.log("Connected to WebSocket");
//
//             // Subscribe to comments for the specific item
//             stompClient.subscribe(topic, (message) => {
//                 const comment = JSON.parse(message.body);
//                 onCommentReceived(comment);
//             });
//         },
//         onStompError: (frame) => {
//             console.error("WebSocket error:", frame);
//         },
//     });
//
//     stompClient.activate();
// }
//
// export function sendComment(itemId, comment, element) {
//     if (stompClient && stompClient.connected) {
//         stompClient.publish({
//             destination: element === "WHITEBOARD"? SOCKET_ENDPOINTS.WHITEBOARD(itemId) : SOCKET_ENDPOINTS.CLIP(itemId),
//             body: JSON.stringify(comment),
//         });
//     }
// }
//
export function disconnect() {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
}


