package com.yjh.foodFinder.model.mapper;

import com.yjh.foodFinder.model.UserDto;

public interface UserMapper {
	UserDto checkById(String userid);
	void register(UserDto user);
}
