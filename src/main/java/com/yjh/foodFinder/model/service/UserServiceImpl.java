package com.yjh.foodFinder.model.service;

import java.sql.SQLException;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yjh.foodFinder.model.UserDto;
import com.yjh.foodFinder.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService{
	
	private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }
	
	@Override
	@Transactional(readOnly = true)
	public UserDto login(UserDto user) {
		UserDto u = userMapper.checkById(user.getUserid());
		if (u != null) {
			boolean check = passwordEncoder.matches(user.getPassword(), u.getPassword());
			if (check) return u;
		}
		return null;
	}

	@Override
	@Transactional
	public void register(UserDto user) throws SQLException {
		UserDto u = userMapper.checkById(user.getUserid());
		if (u != null) throw new DuplicateKeyException("해당 아이디는 사용할 수 없습니다.");
		String encodePassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodePassword);
		userMapper.register(user);		
	}

}
