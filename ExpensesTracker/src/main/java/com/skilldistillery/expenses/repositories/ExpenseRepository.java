package com.skilldistillery.expenses.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.expenses.entities.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

	List<Expense> findByNameLikeOrDescriptionLikeIgnoreCase(String name, String desc);
	List<Expense> findByCategory_Id(int id);
	List<Expense> findByPaymentMethod_Id(int id);
	List<Expense> findByActiveTrue();

	
}
