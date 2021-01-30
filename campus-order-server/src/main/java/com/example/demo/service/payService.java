package com.example.demo.service;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.payment.page.models.AlipayTradePagePayResponse;
import com.example.demo.entity.dish;
import com.example.demo.entity.order;
import com.example.demo.entity.payOrder;
import com.example.demo.entity.paymentBo;

@Service
public class payService {
	//支付成功后要跳转的页面
    @Value("${alipay.returnUrl}")
    private String returnUrl;

    /**
     *  下单支付
     * @throws Exception 
     * */
    public Object pay (order order) throws Exception{ // 在下单的时候发起支付
        //从存储介质(如MySQL、Redis)查询商品信息、总金额等敏感信息

        //…………省略相关代码，这里直接赋值…………
    	paymentBo bo = new paymentBo();
        bo.setSubject(order.getDishName());
        bo.setTotal(new BigDecimal(order.getAmount()));

        //调用sdk，发起支付
        AlipayTradePagePayResponse response = Factory.Payment
                //选择网页支付平台
                .Page()
                //调用支付方法，设置订单名称、我们自己系统中的订单号、金额、回调页面
                .pay(bo.getSubject() , order.getId(), bo.getTotal().toString() , returnUrl);

        //这里的response.body，就是一个可以直接加载的html片段，
        // 这里为了简单我直接返回这个片段，前端直接
        System.out.println(response + "  pay success");
        return response.body;
    }

    public Object pay2 (order order) throws Exception{ // 在订单页面发起支付
        //从存储介质(如MySQL、Redis)查询商品信息、总金额等敏感信息

        //…………省略相关代码，这里直接赋值…………
    	paymentBo bo = new paymentBo();
        bo.setSubject(order.getDishName());
        bo.setTotal(new BigDecimal(order.getAmount()));

        //调用sdk，发起支付
        AlipayTradePagePayResponse response = Factory.Payment
                //选择网页支付平台
                .Page()
                //调用支付方法，设置订单名称、我们自己系统中的订单号、金额、回调页面
                .pay(bo.getSubject() , order.getId(), bo.getTotal().toString() , "http://localhost:8081/#/customer/cusOrderList");

        //这里的response.body，就是一个可以直接加载的html片段，
        // 这里为了简单我直接返回这个片段，前端直接
        System.out.println(response + "  pay success");
        return response.body;
    }
}
