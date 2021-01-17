package com.example.demo.entity;

import java.math.BigDecimal;

public class paymentBo {
	private String subject;
	private BigDecimal total = BigDecimal.ZERO;
	
	public paymentBo(String subject, BigDecimal total) {
		super();
		this.subject = subject;
		this.total = total;
	}
	public paymentBo() {
		super();
	}
	/**
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}
	/**
	 * @param subject the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}
	/**
	 * @return the total
	 */
	public BigDecimal getTotal() {
		return total;
	}
	/**
	 * @param total the total to set
	 */
	public void setTotal(BigDecimal total) {
		this.total = total;
	}
	
	
}
