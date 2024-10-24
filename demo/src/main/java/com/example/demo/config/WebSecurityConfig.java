package com.example.demo.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.security.JwtAuthenticationFilter;
import com.example.demo.security.OAuthSuccessHandler;
import com.example.demo.security.OAuthUserServiceImpl;
import com.example.demo.security.RedirectUrlCokkieFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
   
   @Autowired
   private JwtAuthenticationFilter jwtAuthenticationFilter;
   
   @Autowired
   private OAuthUserServiceImpl oAuthUserService;
   
   @Autowired
   private OAuthSuccessHandler oAuthSuccessHandler;
   
   @Autowired
   private RedirectUrlCokkieFilter redirectUrlCokkieFilter;
   
   @Bean
   protected DefaultSecurityFilterChain securityFilterChain(
         HttpSecurity http) throws Exception {

      http
         .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
         .csrf(csrfConfigurer -> csrfConfigurer.disable())
         .httpBasic(httpBasicConfigurer -> httpBasicConfigurer.disable())
         .sessionManagement(sessionManagementConfigurer ->
               sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
           )
         
         .authorizeHttpRequests(authorizeRequestsConfigurer -> 
            authorizeRequestsConfigurer
            .requestMatchers("/", "/auth/**","/oauth2/**").permitAll()
            .anyRequest().authenticated()
         )
         .oauth2Login() //oauth2Login 활성화
         .redirectionEndpoint() //아무 주소도 넣지 않았다면 베이스 URL인 http://localhost:5000으로 리다이렉트한다.
         .baseUri("/oauth2/callback/*")//인증이 성공하면 리다이렉트할 엔드포인트의 URI
         .and()
         .authorizationEndpoint()
         //OAuth2 인증의 흐름에서 권한 부여 엔드포인트를 설정하기 위한것이다.
         //OAuth2 에서 클라이언트 애플리케이션이 사용자를 대신해 권한을 요청할 때 사용되는 
         //엔드포인트가 권한 부여 엔드포인트이다.
         //사용자는 이 엔드포인트로 리다이렉션되어 권한을 승인하는 과정을 거친다.
         .baseUri("/auth/authorize")
         //OAuth2 권한 부여 요청을 처리하는 엔드포인트의 기본 URI를 설정하는 것이다.
         //즉, 어플리케이션은 사용자가 로그인을 시도할 때 이 엔드포인트를 통해 OAuth2권한 요청을 수행한다.
         .and()
         //OAuth2 제공자로부터 사용자 정보를 가져올 때 사용하는 엔드포인트를 설정한다.
         //이 부분은 OAuth2 인증이 성공한 후, 사용자 프로필 데이터를 가져오는 역할
         .userInfoEndpoint() //사용자 정보를 처리하는 서비스를 지정하는 메서드
         .userService(oAuthUserService) //oauth2 인증이 성공한 뒤 실행될 동작을 정의하는메서드
         .and()
         .successHandler(oAuthSuccessHandler)
         .and()
         .exceptionHandling()
         //시큐리티에서 발생하는 예외상황, 예를 들어 인증되지 않은 사용자가 자원에 접근하려고 할때 어떤 동작을 할지 정의할 수 있다.
         .authenticationEntryPoint(new Http403ForbiddenEntryPoint()); //oauth2 로그인 설정
         //인증이 필요한 자원에 대해 인증되지 않은 사용자가 접근할 때 403응답을 반환하도록 설정하는것.

      http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
      http.addFilterAfter(redirectUrlCokkieFilter, OAuth2AuthorizationRequestRedirectFilter.class);
      
      return http.build();
   }

   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      //React 애플리케이션이 실행되는 출처에서 오는 요청을 허용
      configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"
    		  ,"http://app.todo-test-gabia.store"
    		  ,"https://app.todo-test-gabia.store"));
      //HTTP메서드 허용
      configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
      //모든 헤더를 허용
      configuration.setAllowedHeaders(Arrays.asList("*"));
      //쿠키나 인증 정보를 포함한 요청을 허용
      configuration.setAllowCredentials(true);
      
      //모든 경로에 대해 CORS설정을 적용
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
   }
}