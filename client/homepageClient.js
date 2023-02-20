// Handles a response from the server
const handleResponse = async (response, method, form) => {
    const jsonRes = await response.json();
    console.log(jsonRes);
}

// Function to Get the User
const getUser = async (loginForm) => {
    const method = loginForm.getAttribute('method');
    const name = loginForm.querySelector('#nameField').value;

    const formData = `name=${name}`;

    const response = await fetch('/getUser', {
    method: method,
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'accept': 'application/json',
    },
    body: formData,
    });

    handleResponse(response, method);
    
};


// Init Function
const init = () => {
    const loginForm = document.querySelector("#loginForm");

    const login = (e) => {
        e.preventDefault();
        getUser(loginForm);
        return false;
    }

    loginForm.addEventListener('submit', login);
};

window.onload = init;