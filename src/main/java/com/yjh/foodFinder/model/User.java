package com.yjh.foodFinder.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String userid;
	private String password;
	private String name;
	private String phoneNumber;
	private String email;

	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> roles = new ArrayList<>();

	public User() {
	}
	
	public User(Long id, String userid, String password, String name, String phoneNumber, String email,
			List<String> roles) {
		this.id = id;
		this.userid = userid;
		this.password = password;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.roles = roles;
	}

	public User(String userid, String password, String name, String email) {
		this.userid = userid;
		this.password = password;
		this.name = name;
		this.email = email;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return userid;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public User updateInfo(UserDto userDto) {
		this.userid = userDto.getUserid();
		this.password = userDto.getPassword();
		this.phoneNumber = userDto.getPassword();
		this.name = userDto.getName();
		this.email = userDto.getEmail();
		return this;
	}
}
