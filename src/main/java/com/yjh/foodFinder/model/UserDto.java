package com.yjh.foodFinder.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	private String userid;
	private String password;
	private String name;
	private String phoneNumber;
	private String email;
	
	public UserDto() {
	}
	
	public UserDto(User user) {
		this.userid = user.getUserid();
		this.password = user.getPassword();
		this.name = user.getName();
		this.phoneNumber = user.getPhoneNumber();
		this.email = user.getEmail();
	}
}
