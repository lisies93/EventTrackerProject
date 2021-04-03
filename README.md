# EventTrackerProject

## Overview
This project calls on us to make a REST API delivering basic CRUD functionality for at least one table. For this specific project I've created a Spring boot app that allows a user to track their expenses, including the category of the transaction and the payment method used. Spring Data JPA is used to simplify coding of the API, so no explicit EntityManager objects or JPQL queries need be included. In addition to basic CRUD functionality.


## How to Run
The EC2 deployment of this service can be accessed at


## REST API endpoints and their functionality are as follows:

|      HTTP Method       |     Resource URI                |      Request Body             |       Returns                 |
|------------------------|---------------------------------|-------------------------------|-------------------------------|
| GET                    |     `api/expenses`              |                               |  a list of all expenses       |
| GET                    |     `api/active/expenses`       |                               | a list of all active expenses |
| GET                    |  `api/expenses/{id}`            |                               | a single expense by id        |
| GET                    | `api/expenses/search/{keyword}` |                               | a single expense by keyword   |
| POST                   |     `api/expenses`              |  a new expense entry          | expense that was created      |
| PUT                    |    `api/expenses/{id}`          | an existing expense to update | expense that was updated      |
| GET                    | `api/categories/{id}/expenses`  |                               | a list of expenses by category|
| GET                    | `api/payments/{id}/expenses`    |                               | a list of expenses by payment |
| DELETE                 |      `api/expenses/{id}`        |                               | deletes an expense temporally |
| DELETE                 |     `api/expenses/delete/{id`   |                               | deletes an expense permanently|
| GET                    |      `api/categories`           |                               |  a list of expense categories |  
| POST                   |      `api/categories`           |  a new category entry         | category that was created     |
| GET                    |      `api/payments`             |                               | a list of payment methods     |
| POST                   |      `api/payments`             | a new payment method entry    | created payment method        |
