package fireants.BE.configuration.jwt;

public interface JwtProperties {
    String SECRET = "fireants.kang.cho.ooh";
    int EXPIRATION_TIME = 1000 * 60 * 10; // 10분
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
