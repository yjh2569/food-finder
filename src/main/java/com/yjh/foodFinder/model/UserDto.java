package com.yjh.foodFinder.model;

import lombok.Getter;
import lombok.Setter;

public class UserDto {

	private String userid;
	private String password;
	private String username;
	private String email;
	private String regtime;
	private Role role;
	private boolean expired;

	public UserDto() {
	}

	public UserDto(String userid, String password, String username, String email) {
		this.userid = userid;
		this.password = password;
		this.username = username;
		this.email = email;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRegtime() {
		return regtime;
	}

	public void setRegtime(String regtime) {
		this.regtime = regtime;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}

	@Override
	public String toString() {
		return "UserDto [userid=" + userid + ", password=" + password + ", username=" + username + ", email=" + email
				+ ", regtime=" + regtime + ", role=" + role + ", expired=" + expired + "]";
	}

}
