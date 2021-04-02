package com.skilldistillery.expenses.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class CategoryTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Category cat;
		
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
			cat = em.find(Category.class, 1);
		}

		@AfterEach
		void tearDown() throws Exception {
			em.close();
			cat = null;
		}

		@Test
		@DisplayName("testing category mapping")
		void test1() {
			
			assertNotNull(cat);
			assertEquals("ads", cat.getName());
		}
		
		@Test
		@DisplayName("testing category and expense mapping")
		void test2() {
			
			assertNotNull(cat);
			assertNotNull(cat.getExpenses());
			assertTrue(cat.getExpenses().size() > 0);
			
		}

	
}

