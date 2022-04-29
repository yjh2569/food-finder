package com.yjh.foodFinder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yjh.foodFinder.model.UserDto;
import com.yjh.foodFinder.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@CrossOrigin("*")
@Api("어드민 컨트롤러  API V1")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> login(@RequestBody UserDto user) {
        try {
            return new ResponseEntity<UserDto>(userService.login(user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("로그인 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/user")
    public ResponseEntity<?> register(@RequestBody UserDto user) {
        try {
        	userService.register(user);
            return new ResponseEntity<String>("회원 가입 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("회원 가입 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
