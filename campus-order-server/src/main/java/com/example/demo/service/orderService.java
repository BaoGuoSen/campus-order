package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.order;

public interface orderService {
	void addOrder(order order);

	// 删
	void deleteOrder(order order);

	// 改
	// 查
	List<order> getOrderByStoreId(String storeId);

	List<order> searchById(String id, String storeId);

	List<order> searchByCustomerName(String customerName, String storeId);

	List<order> getAllOrder();

	List<order> getOrderByCustomerId(String customerId);

	List<order> getOrderByDishId(String dishId);
}
