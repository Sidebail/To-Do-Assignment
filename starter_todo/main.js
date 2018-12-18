/*
  The Goal:
  Build a To Do list application that allows you
  to add a new entry, edit an existing entry, and
  remove an existing entry.
 */

// Step 1 - Select and store the tbody HTML Element.
// INSIGHT: We'll be storing the item entires in the
// tbody. Storing this HTMLElement will give us better
// access to add new items.
var tbodyEle = document.querySelector("#toDoItems");


// Step 2 - Select and store the item template HTML Element.
// INSIGHT: HTML templates are handy for keeping your
// HTML out of your JavaScript. This makes portability easier.
var itemTemplateEle = document.querySelector("#itemTemplate");


// Step 3 - Select and store the following HTML Elements:
// INSIGHT: This form will give the user the ability to
// provide information about a new to do item.
// Step 3a - The Item Name field
var itemNameFieldEle = document.querySelector("#itemName");
console.log(itemNameFieldEle);
// Step 3b - The Due Date field
var itemDueDateFieldEle = document.querySelector("#dueDate");

// Step 3c - The 'Create New Item' button for adding a new item
// INSIGHT: We'll listen to the click event on this
// button. That should tell us the user is ready to
// add the information to a new item.
var bCreateNewItem = document.querySelector("#addNewItem");


// Step 4 - Add a click event listener to the HTML Element
// you stored in Step 3c (should've been the 'Create New Item')
// button.
bCreateNewItem.addEventListener('click',function(event){
  console.log(itemNameFieldEle.value);
  // Step 4a - Check if item name is blank
  if(itemNameFieldEle.value == "" && isDateSet() == false){
    // Step 4b - Alert the user they need to enter a name
    itemNameFieldEle.style.backgroundColor = "red";
    
    // Step 4c - Return false to exit the event listener
    return false;
    

  }
  
  itemNameFieldEle.style.backgroundColor = "white";
  itemDueDateFieldEle.style.backgroundColor = "white";
  
  // Step 4d - Uncomment the next line to store the template content:
  let content = itemTemplate.content;

  // Step 4e - Uncomment the next line to import the template content
  // into a new node:
  let newItemRow = document.importNode(content, true);

  // Step 4f - Using DOM walking, access the item entry cell
  // and store the current item name value
  newItemRow.querySelector(".item-entry").textContent = itemNameFieldEle.value;
  newItemRow.querySelector(".item-entry").style.color = "white";
  // Step 4f - Using DOM walking, access the item due date cell
  // and store the current due date value
  newItemRow.querySelector(".item-due-date").textContent = itemDueDateFieldEle.value;
  newItemRow.querySelector(".item-due-date").style.color = "white";
  // Step 4g - Using DOM walking, access the item delete button
  // and make the onclick property equal to a function definition
  // named removeItem

  newItemRow.querySelector(".item-actions").querySelector(".item-delete").addEventListener('click', removeItem);

  // Step 4h- Using DOM walking, access the item edit button
  // and make the onclick property equal to a function definition
  // named editItem
  newItemRow.querySelector(".item-actions").querySelector(".item-edit").addEventListener('click', editItem);

  // Step 4i - Reset the item name field value to nothing
  itemNameFieldEle.value = "";

  // Step 4j - Reset the due date field value to nothing
  itemDueDateFieldEle.value = "";

  // Step 4k - Prepend the new item row to the to do items list
  // INSIGHT: We're prepending as we want new items to go to the
  // top. If you want them to be in reverse, then you will need
  // to append them instead.
  tbodyEle.prepend(newItemRow);

  
});
// Step 5 - Create a new function called 'removeItem'. You will need
// to capture the event in the parameter.
removeItem = function(event){
  // Step 5a - Access the closest parent tr HTML element
  // and remove it
  // INSIGHT: .closest() is a handy method that will move up the DOM
  // tree and attempt to find the closest ancestor that matches the
  // passed selector.
  console.log(event.target.parentElement.parentElement);
  event.target.parentElement.closest("tr").remove();
  
  


}
// Step 6 - Create a new function called 'editItem'. You will need
// to capture the event in the parameter.
editItem = function(event){
  // Step 6a - Using DOM walking:
  // First find the closest tr tag.
  // Next, find an item entry that is a child of the tr tag.
  // INSIGHT: DOM walking is the act of moving up and down through
  // ancestors and children of the DOM. We can use methods like
  // .closest() and .querySelector() to do this efficiently.
  // Store the result in a variable
  let itemEntryTemp = event.target.closest("tr").querySelector(".item-entry");
  let itemDueDateTemp = event.target.closest("tr").querySelector(".item-due-date");

  // Step 6b - Using the .setAttribute() method, set the attribute
  // 'contenteditable' to true
  // INSIGHT: Content Editable is an attribute introduced in HTML 5
  // that allows regular non-field based HTML elements to have their
  // text edited inline. This is a convenient feature that is utilized
  // by many online WYSIWYG editors like TinyMCE and CKEditor.
  itemEntryTemp.setAttribute("contenteditable", "true");
  itemDueDateTemp.setAttribute("contenteditable", "true");
  // Step 6c - Trigger focus on the element
  itemEntryTemp.focus();

  // Step 6d - Create an eventlistener on the blur event
  itemEntryTemp.addEventListener('blur',function(){
    // Step 6e - Remove the attribute 'contenteditable'
    // INSIGHT: .addAttribute() and .removeAttribute() add
    // and remove attributes applied to an HTML Element.
    itemEntryTemp.removeAttribute("contenteditable");
    itemEntryTemp.style.backgroundColor = "white"

  });
  itemDueDateTemp.addEventListener('blur',function(){
    // Step 6e - Remove the attribute 'contenteditable'
    // INSIGHT: .addAttribute() and .removeAttribute() add
    // and remove attributes applied to an HTML Element.
    itemDueDateTemp.removeAttribute("contenteditable");
    itemDueDateTemp.style.backgroundColor = "white"

  });
  itemEntryTemp.style.backgroundColor = "skyblue";
  itemDueDateTemp.style.backgroundColor = "skyblue";

};
/*
  Step 7 - TAKE IT FURTHER
 */
// Step 7a - Using CSS you learned in your first semester
// style the To Do list to make it nicer than the default
// Bootstrap stylings.
document.querySelector("body").style.backgroundColor = "orange";
document.querySelector("h1").style.color = "white";
document.querySelectorAll("label").forEach(ele => {
  ele.style.color = "white";
});
document.querySelectorAll("th").forEach(ele => {
  ele.style.color = "white";
});
// Step 7b- Hide the 'Create New Item' form.
var formEle = document.querySelector('#newItemForm');
formEle.style.visibility = "hidden";
// Step 7c - Add a button that toggle the 'Create New Item's'
// form visibility.
var bToggle = document.createElement('button');
document.querySelector('header').append(bToggle);
bToggle.textContent = "Create new To-Do thing!";
bToggle.addEventListener('click', event => {
  if(formEle.style.visibility == "hidden"){
    formEle.style.visibility = "visible";
    bToggle.textContent = "Stop creating new To-Do thing!"
  }else{
    formEle.style.visibility = "hidden";
    bToggle.textContent = "Create new To-Do thing!"
  }
})
// Step 7d - Validate the date and alert the user if it is empty. ------------ MODIFIED ON CLICK FOR CREATE NEW ITEM
console.log(itemDueDateFieldEle.textContent);
function isDateSet(){
  if(itemDueDateFieldEle.textContent == ""){
    itemDueDateFieldEle.style.backgroundColor = "red";
    return false;
  }else{
    itemDueDateFieldEle.style.backgroundColor = "white";
    return true;
  }
}
// Step 7e - Create a way for the user to edit the date:
// INSIGHT: This will take some thought but will demonstrate
// your understanding of JavaScript.

/**
 * Modified the editItem function. Yes, i know its not user friendly and does not validate the date to date format.
 * Yes, i am lazy.
 */

// BONUS: Use prototyping, objects, storage solutions, frameworks,
// and/or date plugins to demonstrate your knowledge and outside
// learning.

//Okay, this is going to be lazy one

var lazyObject = {
  w1: "Lazy",
  w2: "Object",
  w3: "Made",
  w4: "A Header"
}

lazyObject.makeLazyHeader = function(){
  document.querySelector("h1").textContent = `${this.w1} ${this.w2} ${this.w3} ${this.w4}`;
  document.querySelector("h1").textContent.fontsize = 76;
}

lazyObject.makeLazyHeader();

// Shaun, see ya on summer! Want to get to ur wonderfull classes once again. Have a good christmas :)