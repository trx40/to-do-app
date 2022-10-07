


$(document).ready(function () {

    // ---------------------------------------------------------------------------------------------- 
    //                          GET ALL LIST ITEMS
    // ---------------------------------------------------------------------------------------------- 

    $.get('http://localhost:3000/todos', function (todos) {
        todos.forEach(function (todo) {
            $('#todo-list').append(
                `
 			<li class="list-group-item d-flex align-items-center">
 				<form action="/todos/${todo._id}" method="POST" id="editItem-form">
 					<div class="form-group">
 						<label for="${todo._id}">Item Text</label>
 						<input type="text" value="${todo.text}" name="todo[text]" class="form-control" id="${todo._id}">
 					</div>
 					<button class="btn btn-primary mt-3">Update Item</button>
 				</form>
 				<span class="flex-grow-1 lead">
 					${todo.text}
 				</span>
 				<div class="d-inline-flex gap-2 justify-content-end" id="btnGroup">
 					<button id="editItem-button" class="btn btn-md btn-warning">Edit</button>
 					<form style="display: inline" method="POST" action="/todos/${todo._id}" id="delItem-form">
 						<button type="submit" class="btn btn-md btn-danger">Delete</button>
 					</form>
 				</div>
 				<div class="clearfix"></div>
 			</li>
 			`
            )
        })
    });

    // ---------------------------------------------------------------------------------------------- 
    //                          ADDING NEW TODOS FROM NEW ITEM FORM AT INDEX
    // ---------------------------------------------------------------------------------------------- 
    $('#newItem-form').submit(function (event) {
        event.preventDefault();
        let formData = $(this).serialize();
        let actionUrl = 'http://localhost:3000' + $(this).attr('action')
        if (formData !== "") {
            $.ajax({
                url: actionUrl,
                data: formData,
                type: 'POST',
                success: function (data) {
                    $('#todo-list').append(           // APPENDING THE NEW LIST ITEM TO THE UL=> TODO LIST
                        `
                     <li class="list-group-item d-flex align-items-center">
                            <!-- EDIT FORM -->
                            <form action="/todos/${data._id}" method="POST" id="editItem-form">
                                <div class="${data._id}">
                                    <label for="item-text">Item Text</label>
                                    <input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
                                </div>
                                <button class="btn btn-primary mt-3">Update Item</button>
                            </form>
                            <!--  -->
                            <span class="flex-grow-1 lead">
                                ${data.text}
                            </span>
                            <div class="gap-2 d-inline-flex justifiy-content-end" id="btnGroup">

                                <button id="editItem-button" class="btn btn-md btn-warning">Edit</button>

                                <form action="/todos/${data._id}" method="POST" id="delItem-form">
                                    <button type="submit" class="btn btn-md btn-danger">Delete</button>
                                </form>

                            </div>
                    </li>
                
                `
                    )
                    $('#newItem-form').find('.form-control').val('')
                }
            })
        }
    });
    // ---------------------------------------------------------------------------------------------- 
    //                          TOGGLE VISIBILITY OF EDIT FORM ON CLICK OF EDIT BUTTON
    // ---------------------------------------------------------------------------------------------- 
    $('#todo-list').on('click', '#editItem-button', function () {
        $(this).parent().siblings('#editItem-form').toggle();
    })

    $('#todo-list').on('submit', '#editItem-form', function (event) {
        event.preventDefault()
        let toDoItem = $(this).serialize()
        let actionUrl = 'http://localhost:3000' + $(this).attr('action')
        let $originalItem = $(this).parent('.list-group-item')     // CAPTURING ORIGINAL ITEM SO IT CAN BE EDITED LATER

        $.ajax({
            url: actionUrl,
            data: toDoItem,
            type: 'PUT',
            originalItem: $originalItem,
            success: function (data) {
                this.originalItem.html(               // REPLACE THE ENTIRE ORIGINAL LIST GROUP ELEMENT AFTER EDITING
                    `
                <!-- EDIT FORM -->                                                                                     
                <form action="/todos/${data._id}" method="POST" id="editItem-form">
                    <div class="form-group">
                        <label for="${data._id}">Item Text</label>
                        <input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
                    </div>
                    <button class="btn btn-primary mt-3">Update Item</button>
                </form>
                <!--  -->
                <span class="flex-grow-1 lead">
                     ${data.text} 
                </span>
                 <div class="gap-2 d-flex justifiy-content-end">

                    <button id="editItem-button" class="btn btn-md btn-warning">Edit</button>

                        <form action="/todos/${data._id}" method="POST" id="delItem-form">
                            <button type="submit" class="btn btn-md btn-danger">Delete</button>
                        </form>

                </div>

                `
                )
            }
        })
    })

    // ---------------------------------------------------------------------------------------------- 
    //                          DELETING TODO FROM INDEX
    // ---------------------------------------------------------------------------------------------- 
    $('#todo-list').on('submit', '#delItem-form', function (event) {
        event.preventDefault();
        let confirmResponse = confirm('Are you sure?')
        if (confirmResponse) {
            let actionUrl = 'http://localhost:3000' + $(this).attr('action')
            let $itemToDelete = $(this).parent('#btnGroup').parent('.list-group-item') // TRAVERSE DOM TO LOCATE THE LIST ELEMENT
            $.ajax({
                url: actionUrl,
                type: 'DELETE',
                itemToDelete: $itemToDelete,
                success: function (data) {
                    this.itemToDelete.remove()        // REMOVES THE LIST ELEMENT FROM THE DOM
                }
            })
        }
    })
    // ---------------------------------------------------------------------------------------------- 
    //                          SEARCH FUNCTIONALITY
    // ---------------------------------------------------------------------------------------------- 
    $('#search').on('input', function (event) {
        event.preventDefault()

        $.get(`http://localhost:3000/todos?keyword=${encodeURIComponent(event.target.value)}`, function (data) {
            $('#todo-list').html('')
            data.forEach(function (todo) {
                $('#todo-list').append(
                    `
                <li class="list-group-item d-flex align-items-center">
                            <!-- EDIT FORM -->
                            <form action="/todos/${todo._id}" method="POST" id="editItem-form">
                                <div class="${todo._id}">
                                    <label for="item-text">Item Text</label>
                                    <input type="text" value="${todo.text}" name="todo[text]" class="form-control" id="${todo._id}">
                                </div>
                                <button class="btn btn-primary mt-3">Update Item</button>
                            </form>
                            <!--  -->
                            <span class="flex-grow-1 lead">
                                ${todo.text}
                            </span>
                            <div class="gap-2 d-flex justifiy-content-end" id="btnGroup">

                                <button id="editItem-button" class="btn btn-md btn-warning">Edit</button>

                                <form action="/todos/${todo._id}" method="POST" id="delItem-form">
                                    <button type="submit" class="btn btn-md btn-danger">Delete</button>
                                </form>

                            </div>
                    </li>
                `
                )
            })
        })
    })

})