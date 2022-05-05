package com.yjh.foodFinder.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yjh.foodFinder.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserid(String userid);
}
