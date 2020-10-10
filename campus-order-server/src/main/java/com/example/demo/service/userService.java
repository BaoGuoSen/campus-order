package com.example.demo.service;

import com.example.demo.entity.user;

public interface userService {
	void register(user user);
	user findUser(String userName);
}
