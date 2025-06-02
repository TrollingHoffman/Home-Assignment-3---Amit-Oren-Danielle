//  הוספה/ביטול השכרות, לפי currentUser
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "login.html";
}
