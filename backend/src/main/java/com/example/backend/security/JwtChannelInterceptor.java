package com.example.backend.security;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;
    private final JwtAuthenticationConverter jwtAuthenticationConverter;

    public JwtChannelInterceptor(JwtDecoder jwtDecoder,
                                 JwtAuthenticationConverter jwtAuthenticationConverter) {
        this.jwtDecoder = jwtDecoder;
        this.jwtAuthenticationConverter = jwtAuthenticationConverter;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // Wrap the raw message to access STOMP headers
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // Only intercept the CONNECT command
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            // Look for Authorization header (e.g. ["Bearer eyJ..."])
            List<String> authHeaders = accessor.getNativeHeader("Authorization");
            if (authHeaders != null && !authHeaders.isEmpty()) {
                String bearer = authHeaders.get(0);
                if (bearer.startsWith("Bearer ")) {
                    String token = bearer.substring(7);
                    // 1) Decode the JWT
                    Jwt jwt = jwtDecoder.decode(token);
                    // 2) Convert to Spring Authentication (uses your SecurityUtil under the hood)
                    Authentication auth = jwtAuthenticationConverter.convert(jwt);
                    // 3) Set as the user principal for this WebSocket session
                    accessor.setUser(auth);
                    // 4) Also populate the SecurityContext for downstream
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }

        return message;
    }
}
