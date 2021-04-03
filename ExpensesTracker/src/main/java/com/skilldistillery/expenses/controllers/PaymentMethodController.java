package com.skilldistillery.expenses.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.expenses.entities.PaymentMethod;
import com.skilldistillery.expenses.services.PaymentMethodService;

@RequestMapping("api")
@RestController
public class PaymentMethodController {


		@Autowired
		private PaymentMethodService pmServ;
		
		@GetMapping(path="payments")
		public List<PaymentMethod> index(){
		  return pmServ.AllPaymentMethods();
		}
		
		@PostMapping(path = "payments")
		public PaymentMethod create(@RequestBody PaymentMethod pm, HttpServletResponse resp, HttpServletRequest req) {

			try {
				pm = pmServ.create(pm);
				resp.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(pm.getId());
				resp.setHeader("Location", url.toString());
			} catch (Exception e) {
				System.err.println(e);
				resp.setStatus(400);
				pm = null;
			}
			return pm;
		}
	
}
