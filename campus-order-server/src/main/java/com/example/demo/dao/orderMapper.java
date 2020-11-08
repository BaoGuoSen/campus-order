package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.entity.order;

@Mapper
public interface orderMapper {
	//增
	void addOrder(order order);
	//删
	void deleteOrder(order order);
	//改
	//查
	List<order> getOrderByStoreId(String storeId);
	List<order> searchById(@Param("id")String id,@Param("storeId")String storeId);
	List<order> searchByCustomerName(@Param("customerName")String customerName,@Param("storeId")String storeId);
	List<order> getAllOrder();
	List<order> getOrderByCustomerId(String customerId);
	List<order> getOrderByDishId(String dishId);
}
