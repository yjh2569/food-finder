package com.yjh.foodFinder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yjh.foodFinder.model.UserDto;
import com.yjh.foodFinder.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@CrossOrigin("*")
@Api("사용자 컨트롤러  API V1")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@ApiOperation(value = "로그인", notes = "아이디와 비밀번호를 통해 로그인해서 회원의 정보를 얻어옵니다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "로그인 성공"),
		@ApiResponse(code = 404, message = "요청 가능한 페이지 없음"),
		@ApiResponse(code = 500, message = "서버 에러")
	})
	@GetMapping("/user")
	public ResponseEntity<?> login(@RequestBody UserDto user) {
        try {
            return new ResponseEntity<UserDto>(userService.login(user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("로그인 실패 "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@ApiOperation(value = "회원 가입", notes = "입력한 정보를 바탕으로 회원 가입한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "회원 가입 성공"),
		@ApiResponse(code = 404, message = "요청 가능한 페이지 없음"),
		@ApiResponse(code = 500, message = "서버 에러")
	})
	@PostMapping("/user")
    public ResponseEntity<?> register(@RequestBody UserDto user) {
        try {
        	userService.register(user);
            return new ResponseEntity<String>("회원 가입 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("회원 가입 실패 "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
