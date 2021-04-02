package com.skilldistillery.expenses.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PaymentMethodTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private PaymentMethod pm;
		
		@BeforeAll
		static void setUpBeforeClass() throws Exception {
			emf = Persistence.createEntityManagerFactory("ExpensesPU");
		}

		@AfterAll
		static void tearDownAfterClass() throws Exception {
			emf.close();
		}

		@BeforeEach
		void setUp() throws Exception {
			em = emf.createEntityManager();
			pm = em.find(PaymentMethod.class, 1);
		}

		@AfterEach
		void tearDown() throws Exception {
			em.close();
			pm = null;
		}

		@Test
		@DisplayName("testing payment method mapping")
		void test1() {
			
			assertNotNull(pm);
			assertEquals("Bank of America", pm.getName());
		}
		
		@Test
		@DisplayName("testing payment method with expense mapping")
		void test2() {
			
			assertNotNull(pm);
			assertNotNull(pm.getExpenses());
			assertTrue(pm.getExpenses().size() > 0);
		}


}
