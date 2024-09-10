import { adminData } from "../data/admin.js";
const signOut = document.querySelector(".sign-out-btn");
const signInModal = document.getElementById("authentication-modal");
const authenticationModalOverlay = document.getElementById(
  "authentication-modal-overlay"
);


const signInForm = document.getElementById("sign-in-form");

signOut.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  signInModal.classList.remove("hidden");
  signInModal.classList.add("flex");
  authenticationModalOverlay.classList.remove("hidden");
  window.location.reload();
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

if (
  document.getElementById("selection-table") &&
  typeof simpleDatatables.DataTable !== "undefined"
) {
  let multiSelect = true;
  let rowNavigation = false;
  let table = null;

  const resetTable = function () {
    if (table) {
      table.destroy();
    }

    const options = {
      rowRender: (row, tr, _index) => {
        if (!tr.attributes) {
          tr.attributes = {};
        }
        if (!tr.attributes.class) {
          tr.attributes.class = "";
        }
        if (row.selected) {
          tr.attributes.class += " selected";
        } else {
          tr.attributes.class = tr.attributes.class.replace(" selected", "");
        }
        return tr;
      },
    };
    if (rowNavigation) {
      options.rowNavigation = true;
      options.tabIndex = 1;
    }

    table = new simpleDatatables.DataTable("#selection-table", options);

    // Mark all rows as unselected
    table.data.data.forEach((data) => {
      data.selected = false;
    });

    table.on("datatable.selectrow", (rowIndex, event) => {
      event.preventDefault();
      const row = table.data.data[rowIndex];
      if (row.selected) {
        row.selected = false;
      } else {
        if (!multiSelect) {
          table.data.data.forEach((data) => {
            data.selected = false;
          });
        }
        row.selected = true;
      }
      table.update();
    });
  };

  // Row navigation makes no sense on mobile, so we deactivate it and hide the checkbox.
  const isMobile = window.matchMedia("(any-pointer:coarse)").matches;
  if (isMobile) {
    rowNavigation = false;
  }

  resetTable();
}

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
