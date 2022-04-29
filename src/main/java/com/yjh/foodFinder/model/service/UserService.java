package com.yjh.foodFinder.model.service;

import java.sql.SQLException;

import com.yjh.foodFinder.model.UserDto;

public interface UserService {
	UserDto login(UserDto user);
	void register(UserDto user) throws SQLException;
}
