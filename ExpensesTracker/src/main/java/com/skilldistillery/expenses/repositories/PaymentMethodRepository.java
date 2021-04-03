package com.skilldistillery.expenses.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.expenses.entities.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {

	
	
}
