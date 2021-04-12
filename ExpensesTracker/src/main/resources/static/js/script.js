window.addEventListener('load', function(e){
 console.log('script.js loaded');
 init();
});

function init(){

    document.expenseFormById.lookup.addEventListener('click', function(event) {
        event.preventDefault();
        var expenseId = document.expenseFormById.expenseId.value;
        if (!isNaN(expenseId) && expenseId > 0) {
          getExpense(expenseId);
        }
      });


    document.getElementById('allExpenses').addEventListener('click', loadExpenses);


    document.getElementById('createExpense').addEventListener('click', createExpenseForm);


    document.expenseDeleteFormById.lookup.addEventListener('click', function(event) {
        event.preventDefault();
        var expenseId = document.expenseDeleteFormById.expenseId.value;
        if (!isNaN(expenseId) && expenseId > 0) {
          deleteExpense(expenseId);
        }
      });


    document.expenseUpdateFormById.lookup.addEventListener('click', function(event) {
        event.preventDefault();
        var expenseId = document.expenseUpdateFormById.expenseId.value;
        if (!isNaN(expenseId) && expenseId > 0) {
          updateExpenseById(expenseId);
        }
      });


}

function getExpense(expenseId) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/expenses/' + expenseId);
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
  
          let expense = JSON.parse(xhr.responseText);
          console.log(expense.title);
          displayExpense(expense);
        } else {
          displayError(`Expense id ${expenseId} not found`);
        }
      }
    };
  
    xhr.send();
  }

  function updateExpenseById(expenseId) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/expenses/' + expenseId);
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
  
          let expense = JSON.parse(xhr.responseText);
          updateExpenseForm(expense);
        } else {
          displayError(`Expense id ${expenseId} not found`);
        }
      }
    };
  
    xhr.send();
  }



  function displayExpense(expense) {
    let errorDiv = document.getElementById('errors');
    errorDiv.textContent = '';
    let allExpensesDiv = document.getElementById('expensesTable');
    allExpensesDiv.textContent = '';
    var dataDiv = document.getElementById('expenseDetails');
    dataDiv.textContent = '';
    let createExpenseDiv = document.getElementById('createExpenseDiv');
    createExpenseDiv.textContent = '';
    let updateExpenseDiv = document.getElementById('updateExpenseDiv');
    updateExpenseDiv.textContent = '';
  
    var h1 = document.createElement('h1');
    h1.textContent = expense.name;
    h1.style.textAlign = 'center';
    dataDiv.appendChild(h1);
  
    var blockquote = document.createElement('blockquote');
    blockquote.textContent = expense.description;
    dataDiv.appendChild(blockquote);
  
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');
    li.textContent = 'Amount : $' + expense.amount;
    li2.textContent = 'Created Date : ' + expense.createdDate;
    li3.textContent = 'Payment method : ' + expense.paymentMethod.name;
    li4.textContent = 'Category : ' + expense.category.name;
  
    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
  
    dataDiv.appendChild(ul);

  }



function loadExpenses(e){
    e.preventDefault();
     let xhr = new XMLHttpRequest();

     xhr.open('GET', 'api/active/expenses');
     xhr.onreadystatechange = function (){
         if(xhr.readyState === 4){
             if(xhr.status === 200){
                 let expenses = JSON.parse(xhr.responseText);
                 displayExpenses(expenses);
             } else {
                 displayError('Error retrieving expenses');             
                }
         }
       
     };
     xhr.send();
}

function loadCategories(e){
   
     let xhr = new XMLHttpRequest();

     xhr.open('GET', 'api/categories');
     xhr.onreadystatechange = function (){
         if(xhr.readyState === 4){
             if(xhr.status === 200){
                 var categories = JSON.parse(xhr.responseText);
                 console.log(categories);
                 return JSON.parse(xhr.responseText);
                 //  displayCategories(categories);
             } else {
                 displayError('Error retrieving categories');             
                }
                return JSON.parse(xhr.responseText);
         }
       
     };
    
     xhr.send();
     return xhr.onreadystatechange();
   
    
}

function displayError(msg){
    let expenseIdDiv = document.getElementById('expenseDetails');
    expenseIdDiv.textContent = '';
    let div = document.getElementById('errors');
    div.textContent = '';
    let h3 = document.createElement('h3');
    h3.textContent = msg;
    div.appendChild(h3);
}

function displayExpenses(expenses){
    let errorDiv = document.getElementById('errors');
    errorDiv.textContent = '';
let expenseDetailsDiv = document.getElementById('expenseDetails');
 expenseDetailsDiv.textContent = '';
  let div = document.getElementById('expensesTable');
for (const expense of expenses) {
    let li = document.createElement('li');
    li.textContent = expense.name;
    div.appendChild(li);
}

}

 function createExpenseForm(e){
    e.preventDefault();

    let createDiv = document.getElementById('createExpenseDiv');

    let h3 = document.createElement('h3');
    h3.textContent = 'Add a new expense';
    createDiv.appendChild(h3);
    let br = document.createElement('BR');

    let form = document.createElement('form');
    form.name = 'createForm';
    createDiv.appendChild(form);

    let label = document.createElement('label');
    label.for = 'name';
    label.textContent = 'Name ';
    form.appendChild(label);
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.placeholder = 'Name';
    form.appendChild(input);
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'description';
    label.textContent = 'Description ';
    form.appendChild(label);
    let textArea = document.createElement('textarea');
    textArea.rows = 4;
    textArea.cols = 30;
    textArea.name = 'description';
    textArea.placeholder = 'Description';
    form.appendChild(textArea);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'amount';
    label.textContent = 'Amount ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'number';
    input.name = 'amount';
    input.placeholder = 'Amount';
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'paymentMethod';
    label.textContent = 'Payment Method ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'paymentMethod';
    input.placeholder = 'Payment Method';
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'category';
    label.textContent = 'Category ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'category';
    input.placeholder = 'Category';
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    input = document.createElement('input');
    input.type = 'submit';
    input.name = 'createSubmit';
    input.value = 'Create Expense';
    input.addEventListener('click', createExpense);
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);


//  console.log(categories);
//  let select = document.getElementById('category');
//  categories.forEach((item, i) => {
//      console.log('item[i]');
//      let option = document.createElement('option');
//      option.value = item[i].name;
//      option.textContent = item[i].name;
//      select.appendChild(option);
//  });
}




var createExpense = function(e) {
e.preventDefault();
    var exp = document.createForm;
    var expense = {
      
      name: exp.name.value,
      description: exp.description.value,
      amount: exp.amount.value,
      paymentMethod: {
         id: exp.paymentMethod.value},
      category: {
          id : exp.category.value}
    };
    postExpense(expense);
  }
  
  function postExpense(expense) {
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/expenses');
  
    xhr.setRequestHeader("Content-type", "application/json");
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          var createdExpense = JSON.parse(xhr.responseText);
          console.log(createdExpense.id);
          getExpense(createdExpense.id);
  
        } else {
          displayError('Error creating expense: ' + xhr.status)
        }
      }
    };
    var expObjectJson = JSON.stringify(expense);
  
    xhr.send(expObjectJson);
  
  }



// UPDATE EXPENSEEEEEEEEEEEEE -----------------------------

function updateExpenseForm(expense){

    let updateDiv = document.getElementById('updateExpenseDiv');

    let h3 = document.createElement('h3');
    h3.textContent = 'Update an expense';
    updateDiv.appendChild(h3);
    let br = document.createElement('BR');

    let form = document.createElement('form');
    form.name = 'updateForm';
    updateDiv.appendChild(form);


    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'id';
    input.value = expense.id;
    form.appendChild(input);

    let label = document.createElement('label');
    label.for = 'name';
    label.textContent = 'Name ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.value = expense.name;
    form.appendChild(input);
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'description';
    label.textContent = 'Description ';
    form.appendChild(label);
    let textArea = document.createElement('textarea');
    textArea.rows = 4;
    textArea.cols = 30;
    textArea.name = 'description';
    textArea.value = expense.description;
    form.appendChild(textArea);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'amount';
    label.textContent = 'Amount ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'number';
    input.name = 'amount';
    input.value = expense.amount;
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'paymentMethod';
    label.textContent = 'Payment Method ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'paymentMethod';
    input.value = expense.paymentMethod.name
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'category';
    label.textContent = 'Category ';
    form.appendChild(label);
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'category';
    input.value = expense.category.name;
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    input = document.createElement('input');
    input.type = 'submit';
    input.name = 'submit';
    input.value = 'Update Expense';
    input.addEventListener('click', updateExpense);
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);


//  console.log(categories);
//  let select = document.getElementById('category');
//  categories.forEach((item, i) => {
//      console.log('item[i]');
//      let option = document.createElement('option');
//      option.value = item[i].name;
//      option.textContent = item[i].name;
//      select.appendChild(option);
//  });

}


var updateExpense = function(e) {
    e.preventDefault();
        var exp = document.updateForm;
        var expense = {
          id: exp.id.value,
          name: exp.name.value,
          description: exp.description.value,
          amount: exp.amount.value,
          paymentMethod: {
             id: exp.paymentMethod.value},
          category: {
              id : exp.category.value}
        };
        console.log(expense);
        putExpense(expense);
      }
      
      function putExpense(expense) {
      
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'api/expenses/' + expense.id);
      
        xhr.setRequestHeader("Content-type", "application/json");
      
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
              var updatedExpense = JSON.parse(xhr.responseText);
              console.log(updatedExpense.id);
              getExpense(updatedExpense.id);
      
            } else {
              displayError('Error updating expense: ' + xhr.status)
            }
          }
        };
        var expObjectJson = JSON.stringify(expense);
      
        xhr.send(expObjectJson);
      
      }



      // DELETEEE EXPENSEEEEEE
       

      function deleteExpense(expenseId){
    
        let xhr = new XMLHttpRequest();
   
        xhr.open('DELETE', 'api/expenses/' + expenseId);
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 204){
                    deleteMsg('The expense was deleted successfully'); 
                } else if(xhr.status === 400){
                    deleteMsg(`Expense with id ${expenseId} not found`); 
                }else {
                    deleteMsg('Error deleting expense');             
                   }
            }
          
        };
       
        xhr.send();

      
       
   }

   function deleteMsg(msg){
    let expenseIdDiv = document.getElementById('expenseDetails');
    expenseIdDiv.textContent = '';
    let deleteDiv = document.getElementById('deleteMsg');
    deleteDiv.textContent = '';
    let h3 = document.createElement('h3');
    h3.textContent = msg;
    deleteDiv.appendChild(h3);
}

