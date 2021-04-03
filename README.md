# EventTrackerProject

## Overview
This project calls on us to make a REST API delivering basic CRUD functionality for at least one table. For this specific project I've created a Spring boot app that allows a user to track their expenses, including the category of the transaction and the payment method used. Spring Data JPA is used to simplify coding of the API, so no explicit EntityManager objects or JPQL queries need be included. In addition to basic CRUD functionality.


## How to Run
The EC2 deployment of this service can be accessed at


## REST API endpoints and their functionality are as follows:

|      HTTP Method       |     Resource URI                |      Request Body     |       Returns                 |
|------------------------|---------------------------------|-----------------------|-------------------------------|
| GET                    |     `api/expenses`              |                       |  a list of all expenses       |
| GET                    |  `api/expenses/{id}`            |                       | a single expense by id        |
| GET                    | `api/expenses/search/{keyword}` |                       | a single expense by keyword   |
| POST                   |     `api/expenses`              |  a new expense entry  | expense that was created      |
|
