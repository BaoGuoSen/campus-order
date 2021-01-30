package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.order;
import com.example.demo.entity.payOrder;
import com.example.demo.entity.store;
import com.example.demo.service.orderService;
import com.example.demo.service.payService;
import com.example.demo.service.storeService;

@RestController
@RequestMapping(value = "order")
public class orderController {
	@Autowired
	private orderService orderService;
	@Autowired
	private payService payService;
	@Autowired
	private storeService storeService;
	
	@PostMapping("/addOrder")
	public Object addOrder(@RequestBody order order) throws Exception { // 创建订单时，直接跳转支付界面，保证订单id和支付id一致
		System.out.println(order.getNote());
		order.setId(payOrder.getOrderNo());
		try {
			store store = storeService.getStoreByStoreId(order.getStoreId());
			order.setStoreLocation(store.getLocation());
			order.setStoreName(store.getName());
			order.setStoreSrc(store.getSrc());
			orderService.addOrder(order);
		} catch (Exception e) {
			System.out.println(e.toString());
			// TODO: handle exception
			return new order();
		}
		return payService.pay(order);
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
	
	@GetMapping("/getOrderById")
	public order getOrderById(String id) {
		return orderService.getOrderById(id);
	}
	
	@GetMapping("/searchById")
	public List<order> searchById(String id, String storeId) {
		return orderService.searchById(id, storeId);
	}

	@GetMapping("/searchByCustomerName")
	public List<order> searchByCustomerName(String customerName, String storeId) {
		return orderService.searchByCustomerName(customerName, storeId);
	}
	
	@GetMapping("/updateOrderStatusConfirm")
	public String updateOrderStatusConfirm(String id, String endTime) {
		System.out.println(id + "ddd" + endTime);
		orderService.updateOrderStatusConfirm(id,endTime);
		return id;
	}
	
	@PostMapping("/updateOrderRate")
	public order updateOrderRate(@RequestBody order order) {
		try {
			orderService.updateOrderRate(order);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		return order;
	}
}
