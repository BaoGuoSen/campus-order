package com.example.demo.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.dish;
import com.example.demo.entity.paymentBo;
import com.example.demo.service.payService;

@RestController
@RequestMapping(value = "pay")
public class payController {
	
	@Autowired
	private payService payService;
	
	/**
     *  下单支付
     * */
    @PostMapping(value = "/confirm" , produces = {"text/html;charset=UTF-8"})
    public Object pay (@RequestBody dish dish) throws Exception {
        //这个接口其实应该是post方式的，但是我这里图方便，直接以get方式访问，
        //且返回格式是text/html，这样前端页面就能直接显示支付宝返回的html片段
        //真实场景下由post方式请求，返回code、msg、data那种格式的标准结构，让前端拿到data里的
        //html片段之后自行加载

//        paymentBo bo = new paymentBo();
        return payService.pay(dish);
    }

    /**
     *  支付成功的回调
     * */
    @PostMapping(value = "/fallback")
    public Object fallback (HttpServletRequest request) {
        Map map = request.getParameterMap();
        System.out.println("进入了回调");
        return null;
    }
}
