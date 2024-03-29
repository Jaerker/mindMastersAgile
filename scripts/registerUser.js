// registration.js

import api from './api.js';

import { users } from './loginPage.js';

// Function to check if the username is already taken
async function isUsernameTaken(username) {
    const userList = await api.user.list();
    return userList.some(user => user.username === username);
}

// Function to check if the email is already taken
async function isEmailTaken(email) {
    const userList = await api.user.list();
    return userList.some(user => user.email === email);
}

// Function to handle the registration process
async function registerUser(username, email, password, confirmPassword) {
    // Check if username is already taken
    if (await isUsernameTaken(username)) {
        return { success: false, message: 'Username is already taken.' };
    }

    // Check if email is already taken
    if (await isEmailTaken(email)) {
        return { success: false, message: 'Email is already taken.' };
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match.' };
    }

    // Create user object
    const userToAdd = {
        username: username,
        email: email,
        password: password // You might want to hash the password before storing it
    };

    // Add user to the users array
    users.push(userToAdd);

    // Add user to the user list
    const result = await api.user.add(userToAdd);
    if (result === true) {

        return { success: true, message: 'User registered successfully.' };
    } else {
        // Remove the user from the users array if adding to the API fails
        users.pop();
        return { success: false, message: 'Failed to register user.' };
    }
    
}

document.querySelector('.register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const registrationResult = await registerUser(username, email, password, confirmPassword);
    if (registrationResult.success) {
        alert(registrationResult.message);
        location.href = '/products.html';
    } else {
        alert(registrationResult.message);
        
    }
});