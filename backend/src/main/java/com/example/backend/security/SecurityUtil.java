package com.example.backend.security;

import com.example.backend.model.enums.Role;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.Optional;

@Component
public class SecurityUtil {
    private final ClerkService clerkService;

    public SecurityUtil(ClerkService clerkService) {
        this.clerkService = clerkService;
    }

    public Role extractRoleFromJWT(Jwt jwt) {
        @SuppressWarnings("unchecked")
        Map<String,?> metadata = jwt.getClaim("publicMetadata");
        if (metadata == null) {
            metadata = jwt.getClaim("metadata");
        }

        String userRole = Optional.ofNullable(metadata)
                .map(m -> (String) m.get("role"))
                .orElse("user");

        if (!metadataContainsRole(metadata)) {
            String userId = jwt.getSubject();
            clerkService.setUserRole(userId, userRole);
        }

        return Role.valueOf(userRole.toUpperCase());
    }
    private boolean metadataContainsRole(Map<String,?> metadata) {
        return metadata != null && metadata.get("role") instanceof String;
    }
}
