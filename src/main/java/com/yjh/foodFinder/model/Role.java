package com.yjh.foodFinder.model;

public enum Role {
	ADMIN("관리자"), USER("회원"), GUEST("손님");
	
	private final String name;
	Role(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
}
