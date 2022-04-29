package com.yjh.foodFinder.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.yjh.foodFinder.model.UserDto;

@Mapper
public interface UserMapper {
	UserDto checkById(String userid);
	void register(UserDto user);
}
