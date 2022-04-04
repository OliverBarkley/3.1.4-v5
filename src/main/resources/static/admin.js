const renderUsers = (users) => {
    output = '',
        users.forEach(user => {
            output += ` 
              <tr> 
                    <td>${user.id}</td> 
                    <td>${user.name}</td> 
                    <td>${user.lastName}</td> 
                    <td>${user.email}</td> 
                    <td>${user.roles.map(role => role.name === 'ROLE_USER' ? 'USER' : 'ADMIN')}</td> 
                    <td>${user.password}</td> 
              <td> 
                   <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info" 
                    data-toggle="modal" data-target="modal" id="edit-user" data-id="${user.id}">Изменить</button> 
               </td> 
               <td> 
                   <button type="button" class="btn btn-danger" id="delete-user" data-action="delete" 
                   data-id="${user.id}" data-target="modal">Удалить</button> 
                    </td> 
              </tr>`
        })
    info.innerHTML = output;
}
let users = [];
const updateUser = (user) => {
    const foundIndex = users.findIndex(x => x.id == user.id);
    users[foundIndex] = user;
    renderUsers(users);
    console.log('users');
}
const removeUser = (id) => {
    users = users.filter(user => user.id != id);
    console.log(users)
    renderUsers(users);
}

// GET ALL users
const info = document.querySelector('#allUsers');
const url = 'http://localhost:8080/api/admin'

fetch(url, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
        users = data;
        renderUsers(data)
    })

// ADD user
const addUserForm = document.querySelector('#addUser')

const addName = document.getElementById('nameAdd')
const addLastName = document.getElementById('lastnameAdd')
const addEmail = document.getElementById('emailAdd')
const addPassword = document.getElementById('passwordAdd')
const addRoles = document.getElementById('rolesAdd')

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: addName.value,
            lastName: addLastName.value,
            email: addEmail.value,
            password: addPassword.value,
            roles: [
                addRoles.value
            ]
        })
    })
        .then(res => res.json())
        .then(data => {
            users = data;
            renderUsers(users);
        })
})

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

// EDIT user
on(document, 'click', '#edit-user', e => {
    const userInfo = e.target.parentNode.parentNode
    document.getElementById('idEdit').value = userInfo.children[0].innerHTML
    document.getElementById('nameEdit').value = userInfo.children[1].innerHTML
    document.getElementById('lastNameEdit').value = userInfo.children[2].innerHTML
    document.getElementById('emailEdit').value = userInfo.children[3].innerHTML
    document.getElementById('rolesEdit').value = userInfo.children[4].innerHTML
    document.getElementById('passwordEdit').value = userInfo.children[5].innerHTML
    $("#modalEdit").modal("show")
})

const editUserForm = document.querySelector('#modalEdit')
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: document.getElementById('idEdit').value,
                name: document.getElementById('nameEdit').value,
                lastName: document.getElementById('lastNameEdit').value,
                email: document.getElementById('emailEdit').value,
                password: document.getElementById('passwordEdit').value,
                roles: [
                    document.getElementById('rolesEdit').value
                ]
            })
        })
            .then(res => res.json()).then(data => updateUser(data))
            .catch((e) => console.error(e))

    $("#modalEdit").modal("hide")
})

// DELETE user
let currentUserId = null;
const deleteUserForm = document.querySelector('#modalDelete')
deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch('http://localhost:8080/api/admin/' + currentUserId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            removeUser(currentUserId);
            deleteUserForm.removeEventListener('submit', () => {
            });
            $("#modalDelete").modal("hide")
        })
})

on(document, 'click', '#delete-user', e => {
    const userDelete = e.target.parentNode.parentNode
    currentUserId = userDelete.children[0].innerHTML

    document.getElementById('idDel').value = userDelete.children[0].innerHTML
    document.getElementById('nameDel').value = userDelete.children[1].innerHTML
    document.getElementById('lastNameDel').value = userDelete.children[2].innerHTML
    document.getElementById('emailDel').value = userDelete.children[3].innerHTML
    document.getElementById('rolesDel').value = userDelete.children[4].innerHTML
    $("#modalDelete").modal("show")
})

//Navigation bar
const urlUser = 'http://localhost:8080/api/user'
let logUser = document.querySelector('#navBarAdmin')

fetch(urlUser)
    .then(res => res.json())
    .then(data => {
        logUser.innerHTML = `<span class="align-middle font-weight-bold mr-1">${data.name}  </span></b> 
                <span class="align-middle mr-1"> with roles:  </span> 
                <span>  ${data.roles.map(role => role.name === 'ROLE_USER' ? 'USER' : 'ADMIN')}</span>`;
    })