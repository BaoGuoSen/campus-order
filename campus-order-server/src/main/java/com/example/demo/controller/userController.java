package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.user;
import com.example.demo.service.userService;

@RestController
@RequestMapping(value = "user")
public class userController {
	@Autowired
	private userService userService;

	@PostMapping("/register")
	public boolean register(@RequestBody user user) {
		// 数据库密码加密
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user findUser = userService.findUser(user.getUserName());
//		System.out.println(findUser);
		if (findUser == null) {
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
		if (finUser != null) {
			if (bCryptPasswordEncoder.matches(user.getPassword(), finUser.getPassword())) {
				// 密码匹配
				return finUser;
			} else {
				// 密码不匹配
				finUser = null;
				return finUser;
			}
		} else {
			return finUser;
		}
	}

	@PostMapping("/update")
	public user update(@RequestBody user user) {
		try {
			userService.update(user);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
			return null;
		}
		return user;
	}
	
	@GetMapping("/getAllRiders")
	public List<user> getAllRiders() {
		return userService.getAllRiders();
	}
	
	@GetMapping("/getOwnerIdByOrderId")
	public String getOwnerIdByOrderId(String orderId) {
		return userService.getOwnerIdByOrderId(orderId);
	}
}
