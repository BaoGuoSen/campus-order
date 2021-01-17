package com.example.demo.entity;

public class dish {
	private String id;
	private String storeId;
	private String src;
	private String name;
	private float price;
	private int sellCount;

	public dish() {
		super();
	}

	public dish(String id, String storeId, String src, String name, float price, int sellCount) {
		super();
		this.id = id;
		this.storeId = storeId;
		this.src = src;
		this.name = name;
		this.price = price;
		this.sellCount = sellCount;
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
	 * @return the src
	 */
	public String getSrc() {
		return src;
	}

	/**
	 * @param src the src to set
	 */
	public void setSrc(String src) {
		this.src = src;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the price
	 */
	public float getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(float price) {
		this.price = price;
	}

	/**
	 * @return the sellCount
	 */
	public int getSellCount() {
		return sellCount;
	}

	/**
	 * @param sellCount the sellCount to set
	 */
	public void setSellCount(int sellCount) {
		this.sellCount = sellCount;
	}

}
