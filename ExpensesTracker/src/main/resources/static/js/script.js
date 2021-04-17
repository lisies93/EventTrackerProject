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


    document.getElementById('createExpense').addEventListener('click', loadCategoriesToCreateExpense);


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
          loadCategoriesToUpdateExpense(expense);
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
    let deleteMsg = document.getElementById('deleteMsg');
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

function loadCategoriesToCreateExpense(e){
    e.preventDefault();
   
     let xhr = new XMLHttpRequest();

     xhr.open('GET', 'api/categories');
     xhr.onreadystatechange = function (){
         if(xhr.readyState === 4){
             if(xhr.status === 200){
                 var categories = JSON.parse(xhr.responseText);
                 console.log(categories);
                 
                 loadPaymentsToCreateExpense(categories);
             } else {
                 displayError('Error retrieving categories');             
                }
            
         }
       
     };
    
     xhr.send();
 
   
    
}

function loadPaymentsToCreateExpense(categories){
   
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/payments');
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var payments = JSON.parse(xhr.responseText);
                createExpenseForm(categories,payments);
                
            } else {
                displayError('Error retrieving categories');             
               }
             
        }
      
    };
   
    xhr.send();
    
  
   
}


function loadCategoriesToUpdateExpense(expense){
   
     let xhr = new XMLHttpRequest();

     xhr.open('GET', 'api/categories');
     xhr.onreadystatechange = function (){
         if(xhr.readyState === 4){
             if(xhr.status === 200){
                 var categories = JSON.parse(xhr.responseText);
                 console.log(categories);
                 
                 loadPaymentsToUpdateExpense(categories,expense);
             } else {
                 displayError('Error retrieving categories');             
                }
            
         }
       
     };
    
     xhr.send();
 
   
    
}

function loadPaymentsToUpdateExpense(categories,expense){
   
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'api/payments');
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var payments = JSON.parse(xhr.responseText);
                updateExpenseForm(expense,categories,payments);
                
            } else {
                displayError('Error retrieving categories');             
               }
             
        }
      
    };
   
    xhr.send();
    
  
   
}



function displayError(msg){
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
    let deleteMsg = document.getElementById('deleteMsg');
    updateExpenseDiv.textContent = '';
    let h3 = document.createElement('h3');
    h3.textContent = msg;
    errorDiv.appendChild(h3);
}

function displayExpenses(expenses){
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
    let deleteMsg = document.getElementById('deleteMsg');
    updateExpenseDiv.textContent = '';
  


  var table = document.createElement('table');
  table.classList = "table table-striped table-hover";
  var thead = document.createElement('thead');
  var tableRow = document.createElement('tr');

var expense = expenses[0];

  for (var p in expense) {
      if(p !== 'active'){
        var th = document.createElement('th');
  th.textContent = p;
  th.style.border = '1px solid black';
  tableRow.appendChild(th);
      }
 
  }

  thead.appendChild(tableRow);
  table.appendChild(thead);


var tbody = document.createElement('tbody');

for (var i = 0; i < expenses.length; i++) {
  var tr = document.createElement('tr');
  for (var p in expenses[i]) {
      if(p !== 'active'){

      
      if(p === 'category' || p === 'paymentMethod'){
        var td = document.createElement('td');
        td.textContent = expenses[i][p].name;
        td.style.border = '1px solid black';
        td.style.backgroundColor = 'white';
        tr.appendChild(td);
      } else {
          if(p === 'amount'){
            var td = document.createElement('td');
            td.textContent = '$'+expenses[i][p];
            td.style.border = '1px solid black';
            td.style.backgroundColor = 'white';
            tr.appendChild(td); 
          } else{
        var td = document.createElement('td');
        td.textContent = expenses[i][p];
        td.style.border = '1px solid black';
        td.style.backgroundColor = 'white';
        tr.appendChild(td);
    }
        }
      }
   

  }
  tbody.appendChild(tr);
}

 table.appendChild(tbody);
 table.style.border = '1px solid black';
 table.style.backgroundColor = 'pink';

  document.body.appendChild(table);


}

 function createExpenseForm(categories,payments){
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
    let deleteMsg = document.getElementById('deleteMsg');
    updateExpenseDiv.textContent = '';

    let cat = [];
    cat = categories;
    let pay = [];
    pay = payments;
    
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
    input.required = true;
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
    input.required = true;
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
    input.required = true;
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'paymentMethod';
    label.textContent = 'Payment Method ';
    form.appendChild(label);
    let select = document.createElement('select');
    select.name = 'payments';
    form.appendChild(select);
    for (let i= 0; i < pay.length; i++) {
    let option = document.createElement('option');
    option.text = pay[i].name;
    option.value = pay[i].id;
    select.add(option);    
    }        
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    label = document.createElement('label');
    label.for = 'category';
    label.textContent = 'Category ';
    form.appendChild(label);
    select = document.createElement('select');
    select.name = 'categories';
    form.appendChild(select);
    for (let i= 0; i < cat.length; i++) {
    let option = document.createElement('option');
    option.text = cat[i].name;
    option.value = cat[i].id;
    select.add(option);    
    }        
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    input = document.createElement('input');
    input.type = 'submit';
    input.name = 'createSubmit';
    input.value = 'Create Expense';
    input.classList = "btn btn-secondary";
    input.addEventListener('click', function (e){
        document.getElementsByTagName('input').required = true;
        
        createExpense(e);
    });
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);


}


// CREATE EXPENSE ---------------------------


var createExpense = function(e) {
e.preventDefault();
    var exp = document.createForm;
    var expense = {
      
      name: exp.name.value,
      description: exp.description.value,
      amount: exp.amount.value,
      paymentMethod: {
         id: exp.payments.value},
      category: {
          id : exp.categories.value}
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



// UPDATE EXPENSE -----------------------------

function updateExpenseForm(expense,categories,payments){
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
    let deleteMsg = document.getElementById('deleteMsg');
    updateExpenseDiv.textContent = '';
    let cat = [];
    cat = categories;
    let pay = [];
    pay = payments;


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
    let select = document.createElement('select');
    select.name = 'payments';
    form.appendChild(select);
    for (let i= 0; i < pay.length; i++) {
    let option = document.createElement('option');
    option.text = pay[i].name;
    if(pay[i].id === expense.paymentMethod.id){
        option.value = expense.paymentMethod.id;
        option.name = expense.paymentMethod.name;
        option.selected = 'selected';
    } else{
        option.value = pay[i].id;
    }
    select.add(option);    
    }        
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);



    label = document.createElement('label');
    label.for = 'category';
    label.textContent = 'Category ';
    form.appendChild(label);
    select = document.createElement('select');
    select.name = 'categories';
    form.appendChild(select);
    for (let i= 0; i < cat.length; i++) {
    let option = document.createElement('option');
    option.text = cat[i].name;
    if(cat[i].id === expense.category.id){
        option.value = expense.category.id;
        option.name = expense.category.name;
        option.selected = 'selected';
    } else{
        option.value = cat[i].id;
    }
    select.add(option);    
    }        
    br = document.createElement('BR');
    form.appendChild(br);
    br = document.createElement('BR');
    form.appendChild(br);

    input = document.createElement('input');
    input.type = 'submit';
    input.name = 'submit';
    input.classList = "btn btn-secondary";
    input.value = 'Update Expense';
    input.addEventListener('click', updateExpense);
    form.appendChild(input);
    br = document.createElement('BR');
    form.appendChild(br);

    document.getElementsByTagName('input').required = true;

}


var updateExpense = function(e) {
    e.preventDefault();

    let allExpensesDiv = document.getElementById('expensesTable');
    allExpensesDiv.textContent = '';

        var exp = document.updateForm;
        var expense = {
          id: exp.id.value,
          name: exp.name.value,
          description: exp.description.value,
          amount: exp.amount.value,
          paymentMethod: {
             id: exp.payments.value},
          category: {
              id : exp.categories.value}
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



      // DELETE EXPENSE
       

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
    let deleteMsg = document.getElementById('deleteMsg');
    updateExpenseDiv.textContent = '';
    let expenseIdDiv = document.getElementById('expenseDetails');
    expenseIdDiv.textContent = '';
    let deleteDiv = document.getElementById('deleteMsg');
    deleteDiv.textContent = '';
    let h3 = document.createElement('h3');
    h3.textContent = msg;
    deleteDiv.appendChild(h3);
}

