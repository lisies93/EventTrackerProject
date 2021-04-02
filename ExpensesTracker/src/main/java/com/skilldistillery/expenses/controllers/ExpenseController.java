package com.skilldistillery.expenses.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.expenses.entities.Expense;
import com.skilldistillery.expenses.services.ExpenseService;

@RequestMapping("api")
@RestController
public class ExpenseController {
	
	@Autowired
	private ExpenseService eServ;

	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
	
	@GetMapping("expenses")
	public List<Expense> listExpenses(){
		return eServ.allExpenses();
	}
	
}
