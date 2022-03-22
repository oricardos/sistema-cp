'use strict';

console.log('Hello World');

const openModal = () => document.querySelector('.modal').classList.add('active');
const closeModal = () => document.querySelector('.modal').classList.remove('active');

const tempClient = {
    name: 'luizao',
    email: 'teste@email.com',
    phone: '011-98888-9999',
    city: 'BH',
}


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
const deleteClient = (index) =>  {
    const delClient = readClient();
    delClient.splice(index, 1)
    setItemsFromLocalStorage(delClient)
    console.log(delClient)
}

//Event Listeners
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal)