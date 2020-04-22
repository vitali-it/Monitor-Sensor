package com.monitor.sensor.security;

import java.util.*;
import java.util.function.Function;
import io.jsonwebtoken.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {

    public static final long JWT_TOKEN_VALIDITY = 60 * 60;

    private final String secret = "javasecret";

    public String getUsernameFromToken(final String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public <T> T getClaimFromToken(final String token, final Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(final String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public Date getExpirationDateFromToken(final String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateToken(final UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    private String doGenerateToken(final Map<String, Object> claims, final String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public Boolean validateToken(final String token, final UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(final String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    
    public String getUsernameFromRequestTokenHeader(final String requestTokenHeader) {
        final String jwtToken = extractTokenFromRequestTokenHeader(requestTokenHeader).get();
        return getUsernameFromToken(jwtToken);
    }
    
    public Optional<String> extractTokenFromRequestTokenHeader(final String requestTokenHeader) {
        final Optional<String> token;
        if (requestTokenHeader == null) {
            token = Optional.ofNullable(null);
        } else {
            token = Optional.of(requestTokenHeader.substring(7));
        }
        return token;
    }
}
