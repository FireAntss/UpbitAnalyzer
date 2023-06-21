package fireants.BE.configuration;

import fireants.BE.configuration.jwt.JwtAuthenticationFilter;
import fireants.BE.configuration.jwt.JwtAuthorizationFilter;
import fireants.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import javax.servlet.http.HttpServletResponse;

// 1.코드받기(인증) 2.엑세스토큰(권한) 3.사용자프로필 정보를 가져오고 4-1.그 정보를 토대로 회원가입을 자동으로 진행시키기도 함
// 4-2. (이메일,전화번호,이름,아이디) 쇼핑몰 -> (집주소)

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable() // restapi는 loginform이 필요없음
                .httpBasic().disable() // httpBasic은 id와 pw를 들고 가는거라서 노출되면 위험함
                .apply(new MyCustomFilterChain())
                .and()
                .authorizeRequests()
//                .antMatchers("/api/v1/user/**")
//                .access("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
//                .antMatchers("/api/v1/manager/**")
//                .access("hasRole('MANAGER') or hasRole('ADMIN')")
                .antMatchers("/api/v1/users/join")
                .permitAll()
                .antMatchers("/api/v1/community/deleteBoardByAdmin")
                .access("hasRole('ADMIN')")
                .antMatchers("/api/v1/users/**", "/api/v1/community/**")
                .access("hasRole('MEMBER') or hasRole('ADMIN')")
                .anyRequest().permitAll()
                .and()
                .build();
    }

    public class MyCustomFilterChain extends AbstractHttpConfigurer<MyCustomFilterChain, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
        }
    }


}
