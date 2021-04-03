package com.skilldistillery.expenses.services;

import java.util.List;

import com.skilldistillery.expenses.entities.Category;

public interface CategoryService {

	List<Category> index();
	Category findById(int id);
	
}
