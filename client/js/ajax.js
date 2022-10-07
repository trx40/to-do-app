"use strict";

$(document).ready(function () {
  // ---------------------------------------------------------------------------------------------- 
  //                          GET ALL LIST ITEMS
  // ---------------------------------------------------------------------------------------------- 
  $.get('http://localhost:3000/todos', function (todos) {
    todos.forEach(function (todo) {
      $('#todo-list').append("\n \t\t\t<li class=\"list-group-item d-flex align-items-center\">\n \t\t\t\t<form action=\"/todos/" + todo._id + "\" method=\"POST\" id=\"editItem-form\">\n \t\t\t\t\t<div class=\"form-group\">\n \t\t\t\t\t\t<label for=\"" + todo._id + "\">Item Text</label>\n \t\t\t\t\t\t<input type=\"text\" value=\"" + todo.text + "\" name=\"todo[text]\" class=\"form-control\" id=\"" + todo._id + "\">\n \t\t\t\t\t</div>\n \t\t\t\t\t<button class=\"btn btn-primary mt-3\">Update Item</button>\n \t\t\t\t</form>\n \t\t\t\t<span class=\"flex-grow-1 lead\">\n \t\t\t\t\t" + todo.text + "\n \t\t\t\t</span>\n \t\t\t\t<div class=\"d-inline-flex gap-2 justify-content-end\" id=\"btnGroup\">\n \t\t\t\t\t<button id=\"editItem-button\" class=\"btn btn-md btn-warning\">Edit</button>\n \t\t\t\t\t<form style=\"display: inline\" method=\"POST\" action=\"/todos/" + todo._id + "\" id=\"delItem-form\">\n \t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-md btn-danger\">Delete</button>\n \t\t\t\t\t</form>\n \t\t\t\t</div>\n \t\t\t\t<div class=\"clearfix\"></div>\n \t\t\t</li>\n \t\t\t");
    });
  }); // ---------------------------------------------------------------------------------------------- 
  //                          ADDING NEW TODOS FROM NEW ITEM FORM AT INDEX
  // ---------------------------------------------------------------------------------------------- 

  $('#newItem-form').submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var actionUrl = 'http://localhost:3000' + $(this).attr('action');

    if (formData !== "") {
      $.ajax({
        url: actionUrl,
        data: formData,
        type: 'POST',
        success: function success(data) {
          $('#todo-list').append( // APPENDING THE NEW LIST ITEM TO THE UL=> TODO LIST
          "\n                     <li class=\"list-group-item d-flex align-items-center\">\n                            <!-- EDIT FORM -->\n                            <form action=\"/todos/" + data._id + "\" method=\"POST\" id=\"editItem-form\">\n                                <div class=\"" + data._id + "\">\n                                    <label for=\"item-text\">Item Text</label>\n                                    <input type=\"text\" value=\"" + data.text + "\" name=\"todo[text]\" class=\"form-control\" id=\"" + data._id + "\">\n                                </div>\n                                <button class=\"btn btn-primary mt-3\">Update Item</button>\n                            </form>\n                            <!--  -->\n                            <span class=\"flex-grow-1 lead\">\n                                " + data.text + "\n                            </span>\n                            <div class=\"gap-2 d-inline-flex justifiy-content-end\" id=\"btnGroup\">\n\n                                <button id=\"editItem-button\" class=\"btn btn-md btn-warning\">Edit</button>\n\n                                <form action=\"/todos/" + data._id + "\" method=\"POST\" id=\"delItem-form\">\n                                    <button type=\"submit\" class=\"btn btn-md btn-danger\">Delete</button>\n                                </form>\n\n                            </div>\n                    </li>\n                \n                ");
          $('#newItem-form').find('.form-control').val('');
        }
      });
    }
  }); // ---------------------------------------------------------------------------------------------- 
  //                          TOGGLE VISIBILITY OF EDIT FORM ON CLICK OF EDIT BUTTON
  // ---------------------------------------------------------------------------------------------- 

  $('#todo-list').on('click', '#editItem-button', function () {
    $(this).parent().siblings('#editItem-form').toggle();
  });
  $('#todo-list').on('submit', '#editItem-form', function (event) {
    event.preventDefault();
    var toDoItem = $(this).serialize();
    var actionUrl = 'http://localhost:3000' + $(this).attr('action');
    var $originalItem = $(this).parent('.list-group-item'); // CAPTURING ORIGINAL ITEM SO IT CAN BE EDITED LATER

    $.ajax({
      url: actionUrl,
      data: toDoItem,
      type: 'PUT',
      originalItem: $originalItem,
      success: function success(data) {
        this.originalItem.html( // REPLACE THE ENTIRE ORIGINAL LIST GROUP ELEMENT AFTER EDITING
        "\n                <!-- EDIT FORM -->                                                                                     \n                <form action=\"/todos/" + data._id + "\" method=\"POST\" id=\"editItem-form\">\n                    <div class=\"form-group\">\n                        <label for=\"" + data._id + "\">Item Text</label>\n                        <input type=\"text\" value=\"" + data.text + "\" name=\"todo[text]\" class=\"form-control\" id=\"" + data._id + "\">\n                    </div>\n                    <button class=\"btn btn-primary mt-3\">Update Item</button>\n                </form>\n                <!--  -->\n                <span class=\"flex-grow-1 lead\">\n                     " + data.text + " \n                </span>\n                 <div class=\"gap-2 d-flex justifiy-content-end\">\n\n                    <button id=\"editItem-button\" class=\"btn btn-md btn-warning\">Edit</button>\n\n                        <form action=\"/todos/" + data._id + "\" method=\"POST\" id=\"delItem-form\">\n                            <button type=\"submit\" class=\"btn btn-md btn-danger\">Delete</button>\n                        </form>\n\n                </div>\n\n                ");
      }
    });
  }); // ---------------------------------------------------------------------------------------------- 
  //                          DELETING TODO FROM INDEX
  // ---------------------------------------------------------------------------------------------- 

  $('#todo-list').on('submit', '#delItem-form', function (event) {
    event.preventDefault();
    var confirmResponse = confirm('Are you sure?');

    if (confirmResponse) {
      var actionUrl = 'http://localhost:3000' + $(this).attr('action');
      var $itemToDelete = $(this).parent('#btnGroup').parent('.list-group-item'); // TRAVERSE DOM TO LOCATE THE LIST ELEMENT

      $.ajax({
        url: actionUrl,
        type: 'DELETE',
        itemToDelete: $itemToDelete,
        success: function success(data) {
          this.itemToDelete.remove(); // REMOVES THE LIST ELEMENT FROM THE DOM
        }
      });
    }
  }); // ---------------------------------------------------------------------------------------------- 
  //                          SEARCH FUNCTIONALITY
  // ---------------------------------------------------------------------------------------------- 

  $('#search').on('input', function (event) {
    event.preventDefault();
    $.get("http://localhost:3000/todos?keyword=" + encodeURIComponent(event.target.value), function (data) {
      $('#todo-list').html('');
      data.forEach(function (todo) {
        $('#todo-list').append("\n                <li class=\"list-group-item d-flex align-items-center\">\n                            <!-- EDIT FORM -->\n                            <form action=\"/todos/" + todo._id + "\" method=\"POST\" id=\"editItem-form\">\n                                <div class=\"" + todo._id + "\">\n                                    <label for=\"item-text\">Item Text</label>\n                                    <input type=\"text\" value=\"" + todo.text + "\" name=\"todo[text]\" class=\"form-control\" id=\"" + todo._id + "\">\n                                </div>\n                                <button class=\"btn btn-primary mt-3\">Update Item</button>\n                            </form>\n                            <!--  -->\n                            <span class=\"flex-grow-1 lead\">\n                                " + todo.text + "\n                            </span>\n                            <div class=\"gap-2 d-flex justifiy-content-end\" id=\"btnGroup\">\n\n                                <button id=\"editItem-button\" class=\"btn btn-md btn-warning\">Edit</button>\n\n                                <form action=\"/todos/" + todo._id + "\" method=\"POST\" id=\"delItem-form\">\n                                    <button type=\"submit\" class=\"btn btn-md btn-danger\">Delete</button>\n                                </form>\n\n                            </div>\n                    </li>\n                ");
      });
    });
  });
});