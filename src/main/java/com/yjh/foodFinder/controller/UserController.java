package com.yjh.foodFinder.controller;

import java.util.Collections;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yjh.foodFinder.model.User;
import com.yjh.foodFinder.model.UserDto;
import com.yjh.foodFinder.model.dao.UserRepository;
import com.yjh.foodFinder.security.JwtAuthenticationProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
//@CrossOrigin("*")
@Api("사용자 컨트롤러  API V1")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@ApiOperation(value = "로그인", notes = "아이디와 비밀번호를 통해 로그인해서 회원의 정보를 얻어옵니다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "로그인 성공"),
		@ApiResponse(code = 404, message = "요청 가능한 페이지 없음"),
		@ApiResponse(code = 500, message = "서버 에러")
	})
	@PostMapping("/login")
	public ResponseEntity<UserDto> login(@RequestBody UserDto user, HttpServletResponse response) {
		try {
			User member = userRepository.findByUserid(user.getUserid())
	        		.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID입니다."));
	        if (!passwordEncoder.matches(user.getPassword(), member.getPassword())) {
	        	throw new IllegalArgumentException("잘못된 비밀번호입니다.");
	        }
	        
	        String token = jwtAuthenticationProvider.createToken(member.getUsername(), member.getRoles());
	        response.setHeader("X-AUTH-TOKEN", token);
	        
	        Cookie cookie = new Cookie("X-AUTH-TOKEN", token);
	        cookie.setPath("/");
	        cookie.setHttpOnly(true);
	        cookie.setSecure(true);
	        response.addCookie(cookie);
	        
	        return new ResponseEntity<UserDto>(new UserDto(member), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<UserDto>(new UserDto(), HttpStatus.NOT_FOUND);
		}
        
    }
	
	@ApiOperation(value = "회원 가입", notes = "입력한 정보를 바탕으로 회원 가입한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "회원 가입 성공"),
		@ApiResponse(code = 404, message = "요청 가능한 페이지 없음"),
		@ApiResponse(code = 500, message = "서버 에러")
	})
	@PostMapping("/join")
    public ResponseEntity<?> register(@RequestBody UserDto user) {
        try {
        	userRepository.save(User.builder()
        			.email(user.getEmail())
        			.password(passwordEncoder.encode(user.getPassword()))
        			.name(user.getName())
        			.phoneNumber(user.getPhoneNumber())
        			.userid(user.getUserid())
        			.roles(Collections.singletonList("ROLE_USER"))
        			.build());
            return new ResponseEntity<String>("회원 가입 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("회원 가입 실패 "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@ApiOperation(value = "로그아웃", notes = "로그아웃합니다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "로그아웃 성공"),
		@ApiResponse(code = 404, message = "요청 가능한 페이지 없음"),
		@ApiResponse(code = 500, message = "서버 에러")
	})
	@PostMapping("/logout")
	public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("X-AUTH-TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
	}
	
	@ApiOperation(value = "사용자 정보 확인", notes = "로그인한 사용자의 정보를 얻어옵니다.")
	@GetMapping("/info")
	public UserDto getInfo() {
		Object details = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (details != null && !(details instanceof String)) return new UserDto((User) details);
		return null;
	}
}
