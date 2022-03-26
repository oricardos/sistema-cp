'use strict';

const openModal = () => document.querySelector('.modal').classList.add('active');
const closeModal = () => {
    clearFields();
    document.querySelector('.modal').classList.remove('active');
};
const form = ['name', 'email', 'phone', 'city'];

const client = {}

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
    console.log(delClient)
}

//Add interação com layout
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    return form.map(field => document.getElementById(field).value = '');
}

const handleSubmit = (evt) => {
    if (isValidFields()) {
        evt.preventDefault();

        form.map(field => {
            const inputFieldValue = document.getElementById(field).value;
            return client[field] = inputFieldValue
        });

        createClient(client);
        updateScreen();
        closeModal();
    }
}

const createTableRow = (client) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" class="button green">Editar</button>
            <button type="button" class="button red">Excluir</button>
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

updateScreen();

//Event Listeners
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('save').addEventListener('click', handleSubmit);
document.getElementById('cancel').addEventListener('click', closeModal);