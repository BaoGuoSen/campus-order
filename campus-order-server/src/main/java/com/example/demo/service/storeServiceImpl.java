package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.storeMapper;
import com.example.demo.entity.dish;
import com.example.demo.entity.store;

@Service
public class storeServiceImpl implements storeService {

	@Autowired
	private storeMapper storeMapper;

	@Override
	public void register(store store) {
		// TODO Auto-generated method stub
		storeMapper.register(store);
	}

	@Override
	public store getStoreById(String ownerId) {
		// TODO Auto-generated method stub
		store store = storeMapper.getStoreById(ownerId);
		System.out.println(store);
		return store;
	}
	
	@Override
	public store getStoreByStoreId(String id) {
		// TODO Auto-generated method stub
		store store = storeMapper.getStoreByStoreId(id);
		System.out.println(store);
		return store;
	}
	
	@Override
	public void addDish(dish dish) {
		// TODO Auto-generated method stub
		storeMapper.addDish(dish);
	}

	@Override
	public List<dish> getDishsByStoreId(String storeId) {
		// TODO Auto-generated method stub
		return storeMapper.getDishsByStoreId(storeId);
	}

	@Override
	public void deleteDish(dish dish) {
		// TODO Auto-generated method stub
		storeMapper.deleteDish(dish);
	}
	
	@Override
	public List<store> searchByStoreName(String storeName) {
		// TODO Auto-generated method stub
		return storeMapper.searchByStoreName(storeName);
	}
	
	@Override
	public List<dish> searchByValue(String value,String storeId) {
		// TODO Auto-generated method stub
		return storeMapper.searchByValue(value,storeId);
	}

	@Override
	public void updateDish(dish dish) {
		// TODO Auto-generated method stub
		storeMapper.updateDish(dish);
	}

	@Override
	public void updateStore(store store) {
		// TODO Auto-generated method stub
		storeMapper.updateStore(store);
	}

	@Override
	public List<dish> getAllDishs() {
		// TODO Auto-generated method stub
		return storeMapper.getAllDishs();
	}
	
	@Override
	public List<store> getAllStores() {
		// TODO Auto-generated method stub
		return storeMapper.getAllStores();
	}

}
