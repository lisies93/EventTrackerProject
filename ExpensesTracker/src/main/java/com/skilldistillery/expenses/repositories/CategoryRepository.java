package com.skilldistillery.expenses.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.expenses.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
