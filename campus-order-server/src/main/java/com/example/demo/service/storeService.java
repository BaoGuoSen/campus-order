package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.dish;
import com.example.demo.entity.store;

public interface storeService {
	void register(store store);

	store getStoreById(String ownerId);
	store getStoreByStoreId(String id);
	
	void addDish(dish dish);

	List<dish> getDishsByStoreId(String storeId);
	
	List<store> searchByStoreName(String storeName);
	
	List<dish> searchByValue(String value,String storeId);

	void deleteDish(dish dish);

	void updateDish(dish dish);

	void updateStore(store store);

	List<dish> getAllDishs();
	
	List<store> getAllStores(); 
}
