//  הרשמה והתחברות (usersList, currentUser)
let userName;
let password;
let keyList = 'usersList';
let keyCurrentUser = 'currentUser';

const singupUserName = document.getElementById('singupUserName');
const singupPassword = document.getElementById('singupPassword');
const btnSignup = document.getElementById('btnSignup');
const btnGoToLogin = document.getElementById('btnGoToLogin');

function userExists(userName) {
    if (localStorage[keyList] !== undefined) {
        let usersList = localStorage.getItem(keyList);
        usersList = JSON.parse(usersList);
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === userName) {
                return i;
            }
        }
    }
    else {
        alert("No users registered");
        window.location.href = "register.html";
    }
}

btnSignup.addEventListener('click', function() {
    userName = singupUserName.value;
    password = singupPassword.value;

    if (userName.length<8 || password.length<8) {
        alert('Username and password must be at least 8 characters long');
        return;
    }

    let userIndex = userExists(userName);

    if (userIndex === undefined) {
        let newUser = {
            name: userName,
            password: password
        };
        let usersList = localStorage.getItem(keyList);
        if (usersList === undefined || usersList === null) {
           usersList = [];
        } else {
            usersList = JSON.parse(usersList);
        }
        usersList.push(newUser);
        localStorage.setItem(keyList, JSON.stringify(usersList));
        alert("Registration successful");
        window.location.href = "login.html";
    } 
    else {
        alert("Username already exists");
    }
});

const loginName = document.getElementById('loginName');
const loginPassword = document.getElementById('loginPassword');
const btnLogin = document.getElementById('btnLogin');
const btngoToRegister = document.getElementById('btngoToRegister');

btnLogin.addEventListener('click',function() {
    userName = loginName.value;
    password = loginPassword.value;
    let userIndex = userExists(userName);
    if (userIndex !== undefined) {
        if (usersList[userIndex].password === password) {
                    let currentUser = {
                        name: userName,
                        password: password
                    };
                    localStorage.setItem(keyCurrentUser, JSON.stringify(currentUser));
                    alert("login successful");
                    window.location.href = "index.html";
                }
                else {
                    alert("Incorrect password");
                }
    }
    else {
        alert("User not found");
    }

});