package com.example.demo.entity;

public class user {
	public String id;
	public String userName;
	public String password;
	public int userType;
	public String location;

	public user() {
		super();
	}

	public user(String id, String userName, String password, int userType, String location) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.userType = userType;
		this.location = location;
	}

	public user(String id, String userName, String password, int userType) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.userType = userType;
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
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the userType
	 */
	public int getUserType() {
		return userType;
	}

	/**
	 * @param userType the userType to set
	 */
	public void setUserType(int userType) {
		this.userType = userType;
	}

	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}

}
