package com.yjh.foodFinder.model.service;

import com.yjh.foodFinder.model.User;
import com.yjh.foodFinder.model.UserDto;

public interface UserService {
	boolean idCheck(String userid);
	User login(UserDto user) throws Exception;
	void register(UserDto user);
}
