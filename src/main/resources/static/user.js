const url = 'http://localhost:8080/api/user'
let loggedInUser = document.querySelector('#User');
let loggedUserHeaderElements = document.querySelector('#panelUser')

fetch(url).then(res => res.json())
    .then(data => {
        loggedUserHeaderElements.innerHTML =`<span class="align-middle font-weight-bold mr-1">${data.name}  </span></b>
                <span class="align-middle mr-1">with roles:  </span>
                <span>  ${data.roles.map(role => role.name === 'ROLE_USER' ? 'USER' : 'ADMIN')}</span>`;
        loggedInUser.innerHTML = `
                                <td>${data.id}</td>
                                <td>${data.name}</td>
                                <td>${data.lastName}</td>
                                <td>${data.email}</td>
                                <td>${data.roles.map(role => role.name === 'ROLE_USER' ? 'ROLE_USER' : 'ROLE_ADMIN')}</td>
                                `;
    })






