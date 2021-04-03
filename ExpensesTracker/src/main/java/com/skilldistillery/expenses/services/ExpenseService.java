package com.skilldistillery.expenses.services;

import java.util.List;

import com.skilldistillery.expenses.entities.Expense;

public interface ExpenseService {

	List<Expense> allExpenses();
	List<Expense> allActiveExpenses();
	Expense retrieveExpense(int id);
	List<Expense> getExpensesByNameOrDescription(String name, String desc);
	Expense create(Expense exp);
	Expense update(Expense exp, int id);
	boolean delete(int id);
	boolean softDelete(int id);
	List<Expense> findExpensesByCategoryId(int catId);
	List<Expense> findExpensesByPaymentMethodId(int pId);
	
}
