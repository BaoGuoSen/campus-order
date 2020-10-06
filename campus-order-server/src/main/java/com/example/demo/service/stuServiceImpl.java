package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.stuMapper;
import com.example.demo.entity.stu;

@Service
public class stuServiceImpl implements stuService {
	@Autowired
	private stuMapper stuMapper;
	
	@Override
	public List<stu> get() {
		// TODO Auto-generated method stub
		return stuMapper.get();
	}

}
