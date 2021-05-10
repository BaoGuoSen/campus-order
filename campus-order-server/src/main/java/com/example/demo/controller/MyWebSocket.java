package com.example.demo.controller;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

@ServerEndpoint(value = "/ws/{userId}")
@Component
public class MyWebSocket {
	//静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;
    /**
     * 用来存放每个客户端对应的 WebSocketServer 对象
     */
    private static ConcurrentHashMap<String, MyWebSocket> webSocketMap = new ConcurrentHashMap<>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private String userId = "";
    /**
     * 连接建立成功调用的方法
     * @throws IOException */
    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) throws IOException {
        this.session = session;
        this.userId = userId;
        if (webSocketMap.containsKey(userId)) {
        	webSocketMap.remove(userId);
        	webSocketMap.put(userId, this);
        } else {
        	webSocketMap.put(userId, this);
        	addOnlineCount();  //在线数加1
        }
        System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
    }

    /**
     * 连接关闭调用的方法
     * @throws IOException 
     */
    @OnClose
    public void onClose() throws IOException {
    	System.out.println("关闭连接的用户Id：" + userId);
    	if (webSocketMap.containsKey(userId)) {
    		webSocketMap.remove(userId);
    		subOnlineCount(); //在线人数减1
    	}
        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     * 客户端发送过来的消息
     * @param message
     * @throws IOException 
     * */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("来自客户端的消息:" + message);
        sendInfo("顾客下单成功", message);
    }


    /**
     * 发生异常时调用
     * @param session
     * @param error
     */
     @OnError
     public void onError(Session session, Throwable error) {
         System.out.println("发生错误");
         error.printStackTrace();
     }


    /**
     * 用于主动推送信息
     * @param message
     * @throws IOException
     */
     public void sendMessage(String message) throws IOException {
         this.session.getBasicRemote().sendText(message);
         //this.session.getAsyncRemote().sendText(message);
     }


     /**
      * 用于群发自定义消息
      * */
    public static void sendInfo(String message, @PathParam("userId") String userId) throws IOException {
    	System.out.println(userId + "userId");
    	if (userId == null) {
    		for (MyWebSocket item : webSocketMap.values()) {
    			try {
    				item.sendMessage(message);
    			} catch (IOException e) {
    				continue;
    			}
    		}
    	} else if (webSocketMap.get(userId) != null) {
    		System.out.println("发送的消息" + message);
    		webSocketMap.get(userId).sendMessage(message);
    	}
        
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        MyWebSocket.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        MyWebSocket.onlineCount--;
    }
}
