package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.stu;
import com.example.demo.service.stuService;

@RestController
public class hello {
	
	@Autowired
	private stuService stuService;
	
	@RequestMapping("/hello")
	public String hello() {
		return "hello,bgs";
	}
	
	@RequestMapping("/get")
	public List<stu> get() {
		return stuService.get();
	}
}
