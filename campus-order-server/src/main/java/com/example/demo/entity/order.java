package com.example.demo.entity;

public class order {
	private String id;
	private String dishId;
	private String storeId;
	private String startTime;
	private String dishName;
	private String storeName;
	private String note;
	private float amount;
	private String customerId;
	private String customerName;
	private String customerEvaluate;
	private String rate;
	private String riderId;
	private String endTime;
	private String riderName;
	private String storeSrc;
	private String storeLocation;
	private String dishSrc;
	private int status;
	public order() {
		super();
	}
	
	public order(String id, String dishId, String storeId, String startTime, String dishName, String storeName,
			String note, float amount, String customerId, String customerName, String customerEvaluate, String rate,
			String riderId, String endTime, String riderName, String storeSrc, String storeLocation,String dishSrc,int status) {
		super();
		this.id = id;
		this.dishId = dishId;
		this.storeId = storeId;
		this.startTime = startTime;
		this.dishName = dishName;
		this.storeName = storeName;
		this.note = note;
		this.amount = amount;
		this.customerId = customerId;
		this.customerName = customerName;
		this.customerEvaluate = customerEvaluate;
		this.rate = rate;
		this.riderId = riderId;
		this.endTime = endTime;
		this.riderName = riderName;
		this.storeSrc = storeSrc;
		this.storeLocation = storeLocation;
		this.dishSrc = dishSrc;
		this.status = status;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the dishId
	 */
	public String getDishId() {
		return dishId;
	}

	/**
	 * @param dishId the dishId to set
	 */
	public void setDishId(String dishId) {
		this.dishId = dishId;
	}

	/**
	 * @return the storeId
	 */
	public String getStoreId() {
		return storeId;
	}

	/**
	 * @param storeId the storeId to set
	 */
	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the dishName
	 */
	public String getDishName() {
		return dishName;
	}

	/**
	 * @param dishName the dishName to set
	 */
	public void setDishName(String dishName) {
		this.dishName = dishName;
	}

	/**
	 * @return the storeName
	 */
	public String getStoreName() {
		return storeName;
	}

	/**
	 * @param storeName the storeName to set
	 */
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	/**
	 * @return the note
	 */
	public String getNote() {
		return note;
	}

	/**
	 * @param note the note to set
	 */
	public void setNote(String note) {
		this.note = note;
	}

	/**
	 * @return the amount
	 */
	public float getAmount() {
		return amount;
	}

	/**
	 * @param amount the amount to set
	 */
	public void setAmount(float amount) {
		this.amount = amount;
	}

	/**
	 * @return the customerId
	 */
	public String getCustomerId() {
		return customerId;
	}

	/**
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	/**
	 * @return the customerName
	 */
	public String getCustomerName() {
		return customerName;
	}

	/**
	 * @param customerName the customerName to set
	 */
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * @return the customerEvaluate
	 */
	public String getCustomerEvaluate() {
		return customerEvaluate;
	}

	/**
	 * @param customerEvaluate the customerEvaluate to set
	 */
	public void setCustomerEvaluate(String customerEvaluate) {
		this.customerEvaluate = customerEvaluate;
	}

	/**
	 * @return the rate
	 */
	public String getRate() {
		return rate;
	}

	/**
	 * @param rate the rate to set
	 */
	public void setRate(String rate) {
		this.rate = rate;
	}

	/**
	 * @return the riderId
	 */
	public String getRiderId() {
		return riderId;
	}

	/**
	 * @param riderId the riderId to set
	 */
	public void setRiderId(String riderId) {
		this.riderId = riderId;
	}

	/**
	 * @return the endTime
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return the riderName
	 */
	public String getRiderName() {
		return riderName;
	}

	/**
	 * @param riderName the riderName to set
	 */
	public void setRiderName(String riderName) {
		this.riderName = riderName;
	}

	/**
	 * @return the storeSrc
	 */
	public String getStoreSrc() {
		return storeSrc;
	}

	/**
	 * @param storeSrc the storeSrc to set
	 */
	public void setStoreSrc(String storeSrc) {
		this.storeSrc = storeSrc;
	}

	/**
	 * @return the storeLocation
	 */
	public String getStoreLocation() {
		return storeLocation;
	}

	/**
	 * @param storeLocation the storeLocation to set
	 */
	public void setStoreLocation(String storeLocation) {
		this.storeLocation = storeLocation;
	}

	/**
	 * @return the dishSrc
	 */
	public String getDishSrc() {
		return dishSrc;
	}

	/**
	 * @param dishSrc the dishSrc to set
	 */
	public void setDishSrc(String dishSrc) {
		this.dishSrc = dishSrc;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}
	
}
