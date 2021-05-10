package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.order;

public interface orderService {
	void addOrder(order order);

	// 删
	void deleteOrder(order order);

	// 改
	void updateOrderPayStatus(String id);
	void updateOrderStatusConfirm(String id, String endTime);
	void updateOrderRate(order order);
	
	// 查
	List<order> getOrderByStoreId(String storeId);
	List<order> getOrderByRiderId(String riderId);
	
	order getOrderById(String id);
	
	String getCusById(String id);
	
	List<order> searchById(String id, String storeId);

	List<order> searchByCustomerName(String customerName, String storeId);

	List<order> getAllOrder();

	List<order> getOrderByCustomerId(String customerId);

	List<order> getOrderByDishId(String dishId);
}
