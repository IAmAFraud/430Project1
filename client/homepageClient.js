const init = () => {
    const loginForm = document.querySelector("#loginForm");

    const login = (e) => {
        e.preventDefault();
        console.log(document.querySelector("#nameField").value);
        return false;
    }

    loginForm.addEventListener('submit', login);
}

window.onload = init;