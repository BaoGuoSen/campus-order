package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.orderMapper;
import com.example.demo.entity.order;

@Service
public class orderServiceImpl implements orderService{
	
	@Autowired
	private orderMapper orderMapper;
	
	@Override
	public void addOrder(order order) {
		// TODO Auto-generated method stub
		System.out.println(order.getId());
		orderMapper.addOrder(order);
	}

	@Override
	public void deleteOrder(order order) {
		// TODO Auto-generated method stub
		orderMapper.deleteOrder(order);
	}

	@Override
	public List<order> getOrderByStoreId(String storeId) {
		// TODO Auto-generated method stub
		return orderMapper.getOrderByStoreId(storeId);
	}

	@Override
	public List<order> getAllOrder() {
		// TODO Auto-generated method stub
		return orderMapper.getAllOrder();
	}

	@Override
	public List<order> getOrderByCustomerId(String customerId) {
		// TODO Auto-generated method stub
		return orderMapper.getOrderByCustomerId(customerId);
	}

	@Override
	public List<order> getOrderByDishId(String dishId) {
		// TODO Auto-generated method stub
		return orderMapper.getOrderByDishId(dishId);
	}

	@Override
	public List<order> searchById(String id,String storeId) {
		// TODO Auto-generated method stub
		return orderMapper.searchById(id,storeId);
	}

	@Override
	public List<order> searchByCustomerName(String customerName,String storeId) {
		// TODO Auto-generated method stub
		return orderMapper.searchByCustomerName(customerName,storeId);
	}
	
}
