package com.yjh.foodFinder.model.service;

import java.util.Collections;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.yjh.foodFinder.model.User;
import com.yjh.foodFinder.model.UserDto;
import com.yjh.foodFinder.model.dao.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public boolean idCheck(String userid) {
		try {
			userRepository.findByUserid(userid).get();
			return false;
		} catch (NoSuchElementException e) {
			return true;
		}
	}

	@Override
	public User login(UserDto user) throws IllegalArgumentException {
		User member = userRepository.findByUserid(user.getUserid())
        		.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID입니다."));
        if (!passwordEncoder.matches(user.getPassword(), member.getPassword())) {
        	throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return member;
	}

	@Override
	public void register(UserDto user) {
		userRepository.save(User.builder()
    			.email(user.getEmail())
    			.password(passwordEncoder.encode(user.getPassword()))
    			.name(user.getName())
    			.phoneNumber(user.getPhoneNumber())
    			.userid(user.getUserid())
    			.roles(Collections.singletonList("ROLE_USER"))
    			.build());
	}

}
