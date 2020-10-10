package com.example.demo.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.entity.user;

@Mapper
public interface userMapper {
	void register(user user);
	user findUser(String userName);
}
