package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.user;

public interface userService {
	void register(user user);

	user findUser(String userName);

	void update(user user);
	
	List<user> getAllRiders();
}
