package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.dish;
import com.example.demo.entity.store;
import com.example.demo.service.storeService;

@RestController
@RequestMapping(value = "store")
public class storeController {
	@Autowired
	private storeService storeService;

	@PostMapping("/register")
	public boolean register(@RequestBody store store) {
		try {
			storeService.register(store);
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		return true;
	}

	@PostMapping("/addDish")
	public boolean addDish(@RequestBody dish dish) {
		try {
			storeService.addDish(dish);
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		return true;
	}

	@PostMapping("/deleteDish")
	public boolean deleteDish(@RequestBody dish dish) {
		try {
			storeService.deleteDish(dish);
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		return true;
	}

	@PostMapping("/updateDish")
	public dish updateDish(@RequestBody dish dish) {
		try {
			storeService.updateDish(dish);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		return dish;
	}

	@PostMapping("/updateStore")
	public store updateStore(@RequestBody store store) {
		try {
			storeService.updateStore(store);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		return store;
	}

	@GetMapping("/getStoreById")
	public store getStoreById(String ownerId) {
		return storeService.getStoreById(ownerId);
	}

	@GetMapping("/getDishsByStoreId")
	public List<dish> getDishsByStoreId(String storeId) {
		return storeService.getDishsByStoreId(storeId);
	}

	@GetMapping("/searchByStoreName")
	public List<store> searchByStoreName(String storeName) {
		return storeService.searchByStoreName(storeName);
	}
	
	@GetMapping("/searchByValue")
	public List<dish> searchByValue(String value, String storeId) {
		return storeService.searchByValue(value,storeId);
	}

	@GetMapping("/getAllDishs")
	public List<dish> getAllDishs() {
		return storeService.getAllDishs();
	}
	
	@GetMapping("/getAllStores")
	public List<store> getAllStores() {
		return storeService.getAllStores();
	}
}
