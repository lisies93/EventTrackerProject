package com.skilldistillery.expenses.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	
}
