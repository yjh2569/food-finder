package com.yjh.foodFinder.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.yjh.foodFinder.model.dao.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUserid(username)
				.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
	}
	
	
}
