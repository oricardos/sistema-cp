'use strict';

const openModal = () => document.querySelector('.modal').classList.add('active');
const closeModal = () => {
    clearFields();
    document.querySelector('.modal').classList.remove('active');
};
const form = ['name', 'email', 'phone', 'city'];

const title = document.getElementById('modal_title');

//CRUD

const getItemsFromLocalStorage = () => JSON.parse(localStorage.getItem('clients')) || [];
const setItemsFromLocalStorage = (value) => localStorage.setItem('clients', JSON.stringify(value));

//CREATE
const createClient = (client) => {
    const db_client = getItemsFromLocalStorage();
    db_client.push(client);
    setItemsFromLocalStorage(db_client);
}

//READ
const readClient = () => getItemsFromLocalStorage();

//UPDATE 
const updateClient = (index, client) => {
    const updtClient = readClient();
    updtClient[index] = client;
    setItemsFromLocalStorage(updtClient);
}

//DELETE
const deleteClient = (index) => {
    const delClient = readClient();
    delClient.splice(index, 1)
    setItemsFromLocalStorage(delClient)
    updateScreen();
}

//Add interação com layout
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    return form.map(field => document.getElementById(field).value = '');
}

const handleSubmit = () => {
    if (isValidFields()) {        
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value,
        }

        //melhor solução, ver depois como usar desse jeito
        // form.map(field => {
        //     const inputFieldValue = document.getElementById(field).value;
        //     return client[field] = inputFieldValue
        // });

        const index = document.getElementById('name').dataset.index;
        if (index === 'new'){
            createClient(client);
            updateScreen();
            closeModal();
        } else {
            updateClient(index, client);
            updateScreen();
            closeModal();
        }
        
    }
}

const createTableRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" id="edit-${index}" class="button green">Editar</button>
            <button type="button" id="delete-${index}" class="button red">Excluir</button>
        </td>
    `
    document.getElementById('tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tbody > tr');
    rows.forEach(row => {
        row.parentNode.removeChild(row) //remove o tr
    })
}

const updateScreen = () => {
    const dbClient = readClient();
    clearTable()
    dbClient.forEach(createTableRow);
}

const fillFields = (client) => {
    document.getElementById('name').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone;
    document.getElementById('city').value = client.city;
    document.getElementById('name').dataset.index = client.index;
}

const editClient = (index) => {
    const getClient = readClient()[index];
    getClient.index = index;
    fillFields(getClient);
    openModal();
}

const editOrDelete = (evt) => {
    if (evt.target.type === 'button'){
        const [action, index] = evt.target.id.split('-');

        if (action === 'edit'){
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Você está prestes a excluir o cliente ${client.name}, tem certeza disso?`);
            if (response) deleteClient(index);
        }
    }
}

updateScreen();

//Event Listeners
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('save').addEventListener('click', handleSubmit);
document.getElementById('cancel').addEventListener('click', closeModal);
document.getElementById('tbody').addEventListener('click', editOrDelete);