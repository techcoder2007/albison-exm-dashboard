import { users } from "../data/users.js";
import { adminData } from "../data/admin.js";

const usersTableBody = document.querySelector(".users-table-body");
const signInModal = document.getElementById("authentication-modal");
const authenticationModalOverlay = document.getElementById(
  "authentication-modal-overlay"
);
const signOut = document.querySelector(".sign-out-btn");

const signInForm = document.getElementById("sign-in-form");

users.forEach((user) => {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td class="px-6 py-4">
            ${user.name?.firstname + " " + user.name?.lastname}
        </td>
        <td class="px-6 py-4">
            ${user.email}
        </td>
        <td class="px-6 py-4">
            ${user.phone}
        </td>
         <td class="px-6 py-4">
            ${user.address.street}
        </td>
    `;
  usersTableBody.appendChild(row);
});

document.addEventListener("DOMContentLoaded", () => {
  const verify = localStorage.getItem("loggedInUser");
  if (!verify) {
    signInModal.classList.remove("hidden");
    signInModal.classList.add("flex");
    authenticationModalOverlay.classList.remove("hidden");
  } else {
    signInModal.classList.add("hidden");
    signInModal.classList.remove("flex");
    authenticationModalOverlay.classList.add("hidden");
  }
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === adminData.email && password === adminData.password) {
    localStorage.setItem("loggedInUser", true);
    signInModal.classList.add("hidden");
    signInModal.classList.remove("flex");
    authenticationModalOverlay.classList.add("hidden");
  } else {
    alert("Wrong email or password");
  }
});


signOut.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  signInModal.classList.remove("hidden");
  signInModal.classList.add("flex");
  authenticationModalOverlay.classList.remove("hidden");
  window.location.reload();
})