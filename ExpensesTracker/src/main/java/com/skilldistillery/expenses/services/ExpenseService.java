package com.skilldistillery.expenses.services;

import java.util.List;

import com.skilldistillery.expenses.entities.Expense;

public interface ExpenseService {

	List<Expense> allExpenses();
	Expense retrieveExpense(int id);
	
}
