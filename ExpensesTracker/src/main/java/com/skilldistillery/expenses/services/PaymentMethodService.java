package com.skilldistillery.expenses.services;

import java.util.List;

import com.skilldistillery.expenses.entities.PaymentMethod;

public interface PaymentMethodService {

	List<PaymentMethod> AllPaymentMethods();
	PaymentMethod findById(int id);
}
