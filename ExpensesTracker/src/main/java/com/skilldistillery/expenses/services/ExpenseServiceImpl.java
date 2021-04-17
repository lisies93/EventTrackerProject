package com.skilldistillery.expenses.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.expenses.entities.Expense;
import com.skilldistillery.expenses.repositories.CategoryRepository;
import com.skilldistillery.expenses.repositories.ExpenseRepository;
import com.skilldistillery.expenses.repositories.PaymentMethodRepository;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseRepository eRepo;

	@Autowired
	private CategoryRepository catRepo;

	@Autowired
	private PaymentMethodRepository pmRepo;

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
		
		if (exp.getActive() == null ) {
			exp.setActive(true);
		}
		
		LocalDate lt
        = LocalDate.now();
		
		if (exp.getCreatedDate() == null) {
			exp.setCreatedDate(lt);
		}
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
			managedExpense.setCreatedDate(exp.getCreatedDate());
			eRepo.saveAndFlush(managedExpense);
			return managedExpense;
		}

		return null;

	}

	@Override
	public boolean delete(int id) {
		boolean expenseWasDeleted = false;

		Expense exp = retrieveExpense(id);
		
		if(exp != null) {
			exp.getCategory().removeExpense(exp);
			exp.getPaymentMethod().removeExpense(exp);
			eRepo.deleteById(id);
			expenseWasDeleted = true;
		}


		return expenseWasDeleted;
	}

	@Override
	public boolean softDelete(int id) {
		Expense e = retrieveExpense(id);
		e.setActive(false);
		if (e.getActive() == false) {
			return true;
		}
		return false;
	}

	@Override
	public List<Expense> findExpensesByCategoryId(int catId) {

		if (!catRepo.existsById(catId)) {
			return null;
		}

		return eRepo.findByCategory_Id(catId);

	}

	@Override
	public List<Expense> findExpensesByPaymentMethodId(int pId) {
		if (!pmRepo.existsById(pId)) {
			return null;
		}

		return eRepo.findByPaymentMethod_Id(pId);
	}

	@Override
	public List<Expense> allActiveExpenses() {
		return eRepo.findByActiveTrue();
	}

}
