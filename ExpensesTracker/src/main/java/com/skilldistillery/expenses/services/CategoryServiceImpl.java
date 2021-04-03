package com.skilldistillery.expenses.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.expenses.entities.Category;
import com.skilldistillery.expenses.repositories.CategoryRepository;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository catRepo;

	@Override
	public List<Category> index() {
		return catRepo.findAll();
	}

	@Override
	public Category findById(int id) {
		Category c = null;
		
		Optional<Category> oCat = catRepo.findById(id);
		if(oCat.isPresent()) {
			c = oCat.get();
		}
		
		return c;
	}
}
