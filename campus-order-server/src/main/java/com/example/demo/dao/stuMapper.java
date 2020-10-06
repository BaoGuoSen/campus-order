package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.entity.stu;

@Mapper
public interface stuMapper {
	List<stu> get();
}
