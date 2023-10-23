const form = document.querySelector("form");
const email = document.querySelector("input[type=email]");
const password = document.querySelector("input[type=password]");



form.addEventListener("submit", onsubmitFunction);

function onsubmitFunction (event) {

    if (email.value==="" || password.value==="" ){

        event.preventDefault()
        alert("pleas fill the form ")
        return false;
    }
}

