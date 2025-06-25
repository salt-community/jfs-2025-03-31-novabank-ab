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

    @SuppressWarnings("unchecked")
    public Role extractRoleFromJWT(Jwt jwt) {
        Map<String,Object> claims = jwt.getClaims();

        Map<String,?> metadata = null;
        Object rawPub = claims.get("publicMetadata");
        Object rawPriv = claims.get("metadata");

        if (rawPub instanceof Map<?,?>) {
            metadata = (Map<String,?>) rawPub;
        } else if (rawPriv instanceof Map<?,?>) {
            metadata = (Map<String,?>) rawPriv;
        }

        if (metadata != null && metadata.get("role") instanceof String) {
            return Role.valueOf(((String)metadata.get("role")).toUpperCase());
        }

        String userId = jwt.getSubject();
        return clerkService.getUserRole(userId);
    }
    public String extractEmailFromJWT(Jwt jwt) {
        Object emailObj = jwt.getClaims().get("email");
        return emailObj != null ? emailObj.toString() : null;
    }

    private boolean metadataContainsRole(Map<String,?> metadata) {
        return metadata != null && metadata.get("role") instanceof String;
    }
}
