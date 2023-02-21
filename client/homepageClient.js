// Handles a response from the server
const handleResponse = async (response, method, form) => {
    const htmlContent = document.querySelector('#content');
    const status = response.status;

    switch (status){
        case 200:
            htmlContent.innerHTML = '<h1>Welcome Back</h1>';
            break;

        case 201:
            htmlContent.innerHTML = '<h1>Created User</h1>';
            break;

        case 400:
            htmlContent.innerHTML = '<h1>Bad Request: Please Input a Name<h1>';
            break;

        case 404:
            htmlContent.innerHTML = '<h1>Content Not Found';
            return;

        default:
            htmlContent.innerHTML = '<h1>Status Code Not Implemented</h1>';
            break;
    }

    if (status === 200 || status === 201){
        // Gets the JSON response
        const resJSON = await response.json();
        console.log(resJSON);

        // Removes the login System, shows the Squadron Creator System
        document.querySelector('#login').style.display = 'none';
        document.querySelector('#squadronCreation').style.display = 'block';

        for (let x in resJSON['content']){
            const div = document.createElement('div');
            div.classList.add("squadron");

            content.appendChild(document.createElement('hr'));

            const name = document.createElement('h2');
            const points = document.createElement('p');
            const faction = document.createElement('p');

            name.textContent = `${resJSON['content'][x]['name']}`;
            points.textContent = `Points Max: ${resJSON['content'][x]['points']}`;
            faction.textContent = `Faction: ${resJSON['content'][x]['faction']}`;

            div.appendChild(name);
            div.appendChild(points);
            div.appendChild(faction);

            content.appendChild(div);
        }
    }
}

// Function to Get the User
const getUser = async (loginForm) => {
    const method = loginForm.getAttribute('method');
    const name = loginForm.querySelector('#userNameField').value;

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
    const loginForm = document.querySelector('#loginForm');
    const createButton = document.querySelector('#createBtn');

    const login = (e) => {
        e.preventDefault();
        getUser(loginForm);
        return false;
    }

    loginForm.addEventListener('submit', login);
};

window.onload = init;