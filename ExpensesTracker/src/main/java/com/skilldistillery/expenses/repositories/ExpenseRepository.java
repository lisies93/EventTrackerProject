package com.skilldistillery.expenses.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.expenses.entities.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

}
