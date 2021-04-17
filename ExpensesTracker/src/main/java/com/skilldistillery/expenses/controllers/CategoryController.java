package com.skilldistillery.expenses.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.expenses.entities.Category;
import com.skilldistillery.expenses.services.CategoryService;

@CrossOrigin({"*", "http://localhost:4300"})
@RequestMapping("api")
	@RestController
	public class CategoryController {

		@Autowired
		private CategoryService catService;
		
		@GetMapping(path="categories")
		public List<Category> index(){
		  return catService.index();
		}

		@PostMapping(path = "categories")
		public Category create(@RequestBody Category cat, HttpServletResponse resp, HttpServletRequest req) {

			try {
				cat = catService.create(cat);
				resp.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(cat.getId());
				resp.setHeader("Location", url.toString());
			} catch (Exception e) {
				System.err.println(e);
				resp.setStatus(400);
				cat = null;
			}
			return cat;
		}

}
