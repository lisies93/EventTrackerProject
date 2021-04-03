package com.skilldistillery.expenses.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.expenses.entities.PaymentMethod;
import com.skilldistillery.expenses.repositories.PaymentMethodRepository;

@Service
@Transactional
public class PaymentMethodServiceImpl implements PaymentMethodService {

	@Autowired
	private PaymentMethodRepository pmRepo;
	
	@Override
	public List<PaymentMethod> AllPaymentMethods() {
		return pmRepo.findAll();
	}

	@Override
	public PaymentMethod findById(int id) {
		PaymentMethod p = null;
		
		Optional<PaymentMethod> oPm = pmRepo.findById(id);
		if(oPm.isPresent()) {
			p = oPm.get();
		}
		
		return p;
	}

}
