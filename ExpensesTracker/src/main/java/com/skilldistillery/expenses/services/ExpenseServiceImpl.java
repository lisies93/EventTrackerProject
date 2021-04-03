package com.skilldistillery.expenses.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.expenses.entities.Expense;
import com.skilldistillery.expenses.repositories.CategoryRepository;
import com.skilldistillery.expenses.repositories.ExpenseRepository;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseRepository eRepo;

	@Autowired
	private CategoryRepository catRepo;

	@Override
	public List<Expense> allExpenses() {
		return eRepo.findAll();
	}

	@Override
	public Expense retrieveExpense(int id) {
		Expense exp = null;
		Optional<Expense> oExp = eRepo.findById(id);
		if (oExp.isPresent()) {
			exp = oExp.get();
		}
		return exp;
	}

	@Override
	public List<Expense> getExpensesByNameOrDescription(String name, String desc) {
		return eRepo.findByNameLikeOrDescriptionLikeIgnoreCase(name, desc);
	}

	@Override
	public Expense create(Expense exp) {
		return eRepo.saveAndFlush(exp);
	}

	@Override
	public Expense update(Expense exp, int id) {

		Expense managedExpense = retrieveExpense(id);

		if (managedExpense != null) {
			managedExpense.setName(exp.getName());
			managedExpense.setDescription(exp.getDescription());
			managedExpense.setAmount(exp.getAmount());
			managedExpense.setPaymentMethod(exp.getPaymentMethod());
			managedExpense.setCategory(exp.getCategory());
			eRepo.saveAndFlush(managedExpense);
			return managedExpense;
		}

		return null;

	}

	@Override
	public Expense delete(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Expense softDelete(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Expense> findExpensesByCategoryId(int catId) {

		if (!catRepo.existsById(catId)) {
			return null;
		}

		return eRepo.findByCategory_Id(catId);

	}

}
