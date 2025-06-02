//  הרשמה והתחברות (usersList, currentUser)
let userName;
let password;
let keyList = 'usersList';
let keyCurrentUser = 'currentUser';

// אלמנטים להרשמה
const signupUserName = document.getElementById('signupUserName');
const signupPassword = document.getElementById('signupPassword');
const btnSignup = document.getElementById('btnSignup');
const btnGoToLogin = document.getElementById('btnGoToLogin');

// אלמנטים להתחברות
const loginName = document.getElementById('loginName');
const loginPassword = document.getElementById('loginPassword');
const btnLogin = document.getElementById('btnLogin');
const btngoToRegister = document.getElementById('btngoToRegister');

// בדיקה אם משתמש קיים כבר
function userExists(userName) {
    if (localStorage[keyList] !== undefined) {
        let usersList = JSON.parse(localStorage.getItem(keyList));
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === userName) {
                return i;
            }
        }
    }
    return undefined;
}

// מעבר לעמוד התחברות
if (btnGoToLogin) {
    btnGoToLogin.addEventListener('click', function () {
        window.location.href = "login.html";
    });
}

// מעבר לעמוד הרשמה
if (btngoToRegister) {
    btngoToRegister.addEventListener('click', function () {
        window.location.href = "register.html";
    });
}

// הרשמת משתמש חדש
if (btnSignup) {
    btnSignup.addEventListener('click', function () {
        userName = signupUserName.value;
        password = signupPassword.value;

        if (userName.length < 8 || password.length < 8) {
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
            if (!usersList) {
                usersList = [];
            } else {
                usersList = JSON.parse(usersList);
            }
            usersList.push(newUser);
            localStorage.setItem(keyList, JSON.stringify(usersList));
            alert("Registration successful");
            window.location.href = "login.html";
        } else {
            alert("Username already exists");
        }
    });
}

// התחברות משתמש קיים
if (btnLogin) {
    btnLogin.addEventListener('click', function () {
        userName = loginName.value;
        password = loginPassword.value;

        let userIndex = userExists(userName);
        if (userIndex !== undefined) {
            let usersList = JSON.parse(localStorage.getItem(keyList));
            if (usersList[userIndex].password === password) {
                let currentUser = {
                    name: userName,
                    password: password
                };
                localStorage.setItem(keyCurrentUser, JSON.stringify(currentUser));
                alert("Login successful");
                window.location.href = "index.html";
            } else {
                alert("Incorrect password");
            }
        } else {
            alert("User not found");
        }
    });
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    const nameP = document.getElementById("userName");
  if (nameP) {
    nameP.textContent = currentUser.name;
  }
} else {
    window.location.href = "login.html";
}

const signOutBtn = document.getElementById("SignOut");
if (signOutBtn) {
  signOutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}
