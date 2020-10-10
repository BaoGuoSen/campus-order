package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.user;
import com.example.demo.service.userService;


@RestController
public class userController {
	@Autowired
	private userService userService;
	
	@PostMapping("/register")
	public boolean register(@RequestBody user user) {
		//数据库密码加密
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user findUser = userService.findUser(user.getUserName());
//		System.out.println(findUser);
		if(findUser == null) {
			userService.register(user);
			return true;
		} else {
			return false;
		}
	}
	
	@PostMapping("/login")
	public user login(@RequestBody user user) {
		user finUser = userService.findUser(user.getUserName());
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		if(finUser != null) {
			if(bCryptPasswordEncoder.matches(user.getPassword(), finUser.getPassword())) {
				//密码匹配
				return finUser;
			} else {
				//密码不匹配
				finUser = null;
				return finUser;
			}
		} else {
			return finUser;
		}
	}
	
}
