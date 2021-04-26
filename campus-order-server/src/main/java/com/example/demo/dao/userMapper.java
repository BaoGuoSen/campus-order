package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.entity.user;

@Mapper
public interface userMapper {
	void register(user user);

	user findUser(String userName);

	void update(user user);
	
	List<user> getAllRiders();
}
