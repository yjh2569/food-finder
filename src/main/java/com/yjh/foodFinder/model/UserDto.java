package com.yjh.foodFinder.model;

import lombok.Getter;
import lombok.Setter;

public class UserDto {
	private String userid;
	private String password;
	private String name;
	private String phoneNumber;
	private String email;

	public UserDto() {

	}

	public UserDto(String userid, String password, String name, String phoneNumber, String email) {
		this.userid = userid;
		this.password = password;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}

	public String getUserid() {
		return userid;
	}

	public String getPassword() {
		return password;
	}

	public String getName() {
		return name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "UserDto{" +
				"userid='" + userid + '\'' +
				", password='" + password + '\'' +
				", name='" + name + '\'' +
				", phoneNumber='" + phoneNumber + '\'' +
				", email='" + email + '\'' +
				'}';
	}
}
