package com.skilldistillery.expenses.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.expenses.entities.Expense;
import com.skilldistillery.expenses.repositories.ExpenseRepository;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {
    
	@Autowired
	private ExpenseRepository eRepo;
	
	@Override
	public List<Expense> allExpenses() {
		// TODO Auto-generated method stub
		return eRepo.findAll();
	}

	@Override
	public Expense retrieveExpense(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
