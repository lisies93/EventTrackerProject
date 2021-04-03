package com.skilldistillery.expenses.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public List<Expense> listExpenses() {
		return eServ.allExpenses();
	}

	@GetMapping(path = "expenses/{id}")
	public Expense findById(@PathVariable int id, HttpServletResponse resp) {

		Expense exp = eServ.retrieveExpense(id);

		if (exp == null) {
			resp.setStatus(404);
		}

		return exp;
	}

	@GetMapping(path = "expenses/search/{keyword}")
	public List<Expense> findByNameOrDescription(@PathVariable String keyword, HttpServletResponse resp) {

		keyword = "%" + keyword + "%";
		List<Expense> expenses = eServ.getExpensesByNameOrDescription(keyword, keyword);

		return expenses;
	}
	
	@PostMapping(path = "expenses")
	public Expense create(@RequestBody Expense exp, HttpServletResponse resp, HttpServletRequest req) {

		try {
			exp = eServ.create(exp);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(exp.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			System.err.println(e);
			resp.setStatus(400);
			exp = null;
		}
		return exp;
	}
	
	@PutMapping(path = "expenses/{id}")
	public Expense update(@PathVariable int id, @RequestBody Expense exp, HttpServletResponse resp) {

		try {
			exp = eServ.update(exp, id);
			if (exp == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println(e);
			resp.setStatus(400);
			exp = null;
		}
		return exp;
	}
	
	@GetMapping(path = "categories/{id}/expenses")
	public List<Expense> findExpensesByCategory(@PathVariable int id, HttpServletResponse resp) {

		List<Expense> expenses = eServ.findExpensesByCategoryId(id);
		if (expenses == null) {
			resp.setStatus(404);
		}

		return expenses;
	}

}
