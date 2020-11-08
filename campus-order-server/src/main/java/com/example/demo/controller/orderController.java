package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.order;
import com.example.demo.service.orderService;

@RestController
@RequestMapping(value="order")
public class orderController {
	@Autowired
	private orderService orderService;
	
	@PostMapping("/addOrder")
	public order addOrder(@RequestBody order order) {
		System.out.println(order.getId());
		try {
			orderService.addOrder(order);
		} catch (Exception e) {
			System.out.println(e.toString());
			// TODO: handle exception
			return new order();
		}
		return order;
	}
	
	@PostMapping("/deleteOrder")
	public order deleteOrder(@RequestBody order order) {
		try {
			orderService.deleteOrder(order);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		return order;
	}
	
	@GetMapping("/getAllOrder")
	public List<order> getAllDishs() {
		return orderService.getAllOrder();
	}
	
	@GetMapping("/getOrderByCustomerId")
	public List<order> getOrderByCustomerId(String customerId) {
		return orderService.getOrderByCustomerId(customerId);
	}
	
	@GetMapping("/getOrderByStoreId")
	public List<order> getOrderByStoreId(String storeId) {
		return orderService.getOrderByStoreId(storeId);
	}
	
	@GetMapping("/getOrderByDishId")
	public List<order> getOrderByDishId(String dishId) {
		return orderService.getOrderByDishId(dishId);
	}
	
	@GetMapping("/searchById")
	public List<order> searchById(String id,String storeId) {
		return orderService.searchById(id,storeId);
	}
	
	@GetMapping("/searchByCustomerName")
	public List<order> searchByCustomerName(String customerName,String storeId) {
		return orderService.searchByCustomerName(customerName,storeId);
	}
}
