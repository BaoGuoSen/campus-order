package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.userMapper;
import com.example.demo.entity.user;

@Service
public class userServiceImpl implements userService {
	@Autowired
	private userMapper userMapper;

	@Override
	public void register(user user) {
		// TODO Auto-generated method stub

		userMapper.register(user);
	}

	@Override
	public user findUser(String userName) {
		// TODO Auto-generated method stub
		user user = userMapper.findUser(userName);
		return user;
	}

	@Override
	public void update(user user) {
		// TODO Auto-generated method stub
		userMapper.update(user);
	}

}
