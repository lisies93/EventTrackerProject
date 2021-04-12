package com.skilldistillery.expenses.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	
	@GetMapping("active/expenses")
	public List<Expense> listActiveExpenses() {
		return eServ.allActiveExpenses();
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
	public Expense update(@PathVariable String id, @RequestBody Expense exp, HttpServletResponse resp) {
       
		int newId = Integer.parseInt(id);
		
		try {
			exp = eServ.update(exp, newId);
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
	
	@GetMapping(path = "payments/{id}/expenses")
	public List<Expense> findExpensesByPaymentMethod(@PathVariable int id, HttpServletResponse resp) {
		
		List<Expense> expenses = eServ.findExpensesByPaymentMethodId(id);
		if (expenses == null) {
			resp.setStatus(404);
		}
		
		return expenses;
	}
	
	@DeleteMapping(path = "expenses/{id}")
	public void softDelete(@PathVariable int id, HttpServletResponse resp) {

		
		try {
			if (eServ.softDelete(id)) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println(e);
			resp.setStatus(400);
		}

	}
	
	@DeleteMapping(path = "expenses/delete/{id}")
	public void delete(@PathVariable int id,
			HttpServletResponse resp) {

		if(eServ.retrieveExpense(id) == null) {
			resp.setStatus(404);
		}
		
		try {
			if(eServ.delete(id)) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println(e);
			resp.setStatus(400);
		}
		
	}

}
