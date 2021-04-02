package com.skilldistillery.expenses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ExpenseTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Expense exp;
		
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
			exp = em.find(Expense.class, 1);
		}

		@AfterEach
		void tearDown() throws Exception {
			em.close();
			exp = null;
		}

		@Test
		@DisplayName("testing expense mapping")
		void test1() {
			
			assertNotNull(exp);
			assertEquals("facebook ads", exp.getName());
		}

}
