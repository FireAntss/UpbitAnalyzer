package fireants.BE.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import fireants.BE.configuration.jwt.JwtProperties;

import javax.servlet.http.HttpServletRequest;

public class JwtUtil {

    public static String getUsernameByJwt(HttpServletRequest request) {
        String authorization = request.getHeader(JwtProperties.HEADER_STRING);
        String jwtToken = authorization.replace(JwtProperties.TOKEN_PREFIX, "");
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

        return username;
    }

}
