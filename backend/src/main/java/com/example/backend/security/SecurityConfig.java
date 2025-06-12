package com.example.backend.security;

import com.example.backend.model.enums.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain defaultFilterChain(
            HttpSecurity http,
            JwtAuthenticationConverter jwtAuthenticationConverter,
            Environment env
    ) throws Exception {

        http
                .cors(withDefaults())
                .csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**"))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/h2-console/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))
                );

        // Enable frames (iframe) only for dev profile TODO fix frameOptions() alternative
        if (List.of(env.getActiveProfiles()).contains("dev")) {
            http.headers(headers -> headers.frameOptions(frame -> frame.disable()));
        }

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(SecurityUtil securityUtil) {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setPrincipalClaimName("sub"); // Clerk userId
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            Role role = securityUtil.extractRoleFromJWT(jwt);
            return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
        });

        return converter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("https://novabank-ab-frontend-876198057788.europe-north2.run.app/"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
