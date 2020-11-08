package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.entity.dish;
import com.example.demo.entity.store;

@Mapper
public interface storeMapper {
	//增
	void register(store store);
	void addDish(dish dish);
	//删
	void deleteDish(dish dish);
	//改
	void updateDish(dish dish);
	void updateStore(store store);
	//查
	store getStoreById(String ownerId);
	List<dish> getDishsByStoreId(String storeId);
	List<dish> searchByValue(String value);
	List<dish> getAllDishs();
}
