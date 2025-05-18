package diss.beyondballbe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

import static org.springframework.messaging.simp.SimpMessageType.SUBSCRIBE;
import static org.springframework.messaging.simp.stomp.StompCommand.SEND;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint that clients will connect to
        registry.addEndpoint("/ws").setAllowedOrigins("*").addInterceptors(new LoggingHandshakeInterceptor()); // Match frontend host
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Prefix for messages from client to server
        config.setApplicationDestinationPrefixes("/app");

        // Prefix for topics that clients can subscribe to
        config.enableSimpleBroker("/topic");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

                switch (accessor.getCommand()) {
                    case CONNECT:
                        System.out.println("🔌 STOMP CONNECT from session: " + accessor.getSessionId());
                        break;
                    case SUBSCRIBE:
                        System.out.println("📡 STOMP SUBSCRIBE to " + accessor.getDestination());
                        break;
                    case SEND:
                        System.out.println("📨 STOMP SEND to " + accessor.getDestination());
                        break;
                    default:
                        break;
                }

                return message;
            }
        });
    }
}
class LoggingHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) {

        System.out.println("🔌 WebSocket handshake attempt: " + request.getURI());

        // Optional: log headers or IP
        var headers = request.getHeaders();
        System.out.println("🔐 Headers: " + headers);

        return true; // Continue with the handshake
    }

    @Override
    public void afterHandshake(ServerHttpRequest request,
                               ServerHttpResponse response,
                               WebSocketHandler wsHandler,
                               Exception exception) {
        // Optional: log after handshake
        System.out.println("✅ WebSocket handshake completed.");
    }
}