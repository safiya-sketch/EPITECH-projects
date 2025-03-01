const form = document.querySelector("form");
const input = document.querySelector("input");
const todo = document.getElementById("todo");
const done = document.getElementById("done");

function storeList() {
  window.localStorage.todoList = todo.innerHTML;
}

// add an item to the Todo list everytime the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the page from default reloading everytime the form is submitted

  todo.innerHTML += ` <li> ${item.value} </li> `;
  item.value = ""; // empty the input text from the previous text input for a cleaner result
  storeList();
});

// everytime a li from the Todo list is clicked check if the li is checked if yes remove the li if not add checked css status
todo.addEventListener("click", (e) => {
  if (e.target.classList.contains("checked")) {
    e.target.remove();
  } else {
    e.target.classList.add("checked");
    // then when the todo li is checked add it to the done list
    done.innerHTML += ` <li> ${e.target.innerText} </li> `;
    done.addEventListener("click", (ev) => {
      ev.target.remove();
    });
  }
  storeList();
});
