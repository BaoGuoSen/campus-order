package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.entity.dish;
import com.example.demo.entity.store;

@Mapper
public interface storeMapper {
	// 增
	void register(store store);

	void addDish(dish dish);

	// 删
	void deleteDish(dish dish);

	// 改
	void updateDish(dish dish);

	void updateStore(store store);

	// 查
	store getStoreById(String ownerId);
	store getStoreByStoreId(String id);
	
	List<dish> getDishsByStoreId(String storeId);

	List<store> searchByStoreName(String storeName);
	
	List<dish> searchByValue(@Param("value") String value, @Param("storeId") String storeId);

	List<dish> getAllDishs();
	
	List<store> getAllStores(); 
}
