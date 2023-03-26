const todoInput = document.querySelector('.todo-input');
const todoBtn =document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo')



todoList.addEventListener('click', completeTodo)

function addTodo(event){
    event.preventDefault();

    const todoDiv =document.createElement('div');
    todoDiv.className = 'todo-wrapper';
    todoDiv.innerHTML =`<li class="todo-item">
    ${todoInput.value}
    <button class="complete-btn">&#10003;</button>
    <button class="delete-btn">&#10006;</button> 
    </li>`

    
   todoList.appendChild(todoDiv);

    todoInput.value='';
}

function completeTodo(event){
  if(event.target.classList.contains('complete-btn')){
    const todoItem = event.target.parentElement;
    todoItem.classList.add('completed')
  }if(event.target.classList.contains('delete-btn')){
    const todoItem = event.target.parentElement;
    const todoDiv = todoItem.parentElement;
    todoDiv.remove();
  }
}

function todoFilter(e){
  const todos =todoList.childNodes;
  todos.forEach(function(todoEl){
    if (todoEl.nodeName === "LI"){
      switch(e.target.value){
        case "all":
          todoEl.style.display ="flex";
          break;


        case "completed":
          if(todoEl.children[0].classList.contains("completed")){
            todoEl.style.display ="flex";  
          }else{
            todoEl.style.display ="none"; 
          }
          break; 


          case "uncompleted":
            if(todoEl.children[0].classList.contains("uncompleted")){
              todoEl.style.display ="none";  
            }else{
              todoEl.style.display ="flex"; 
            }
            break;   
      }
      todos.filter(todoFilter);
    }
  })

}



todoBtn.addEventListener('click',addTodo);
filterOptions.addEventListener('change',todoFilter)
