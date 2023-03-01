// Handles a response from the server
const handleResponse = async (response, method, user) => {
  const content = document.querySelector('#content');
  const message = document.querySelector('#messages');
  const status = response.status;

  switch (status) {
    case 200:
      message.innerHTML = '<h1>Success</h1>';
      break;

    case 201:
      message.innerHTML = '<h1>Created</h1>';
      break;

    case 400:
      message.innerHTML = '<h1>Bad Request: Check Console<h1>';
      break;

    case 404:
      message.innerHTML = '<h1>Content Not Found</h1>';
      break;

    default:
      message.innerHTML = '<h1>Status Code Not Implemented</h1>';
      break;
  }

  // Gets the JSON response
  const resJSON = await response.json();

  if (status === 400) {
    console.log(resJSON.message);
  }

  if (status === 200 || status === 201) {
    // Clears the content section of the file
    content.innerHTML = '';

    // Removes the login System, shows the Squadron Creator System
    // Info on how to hide elements
    // https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#squadronCreation').style.display = 'block';
    document.querySelector('#logout').style.display = 'block';

    // Loops through and prints out the squadrons the user has
    for (const x in resJSON.content) {
      const div = document.createElement('div');

      // Information on how to modify classlists found here
      // https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
      div.classList.add('squadron');

      content.appendChild(document.createElement('hr'));

      const name = document.createElement('h2');
      const points = document.createElement('p');
      const faction = document.createElement('p');
      const btn = document.createElement('button');

      name.textContent = `${resJSON.content[x].name}`;
      points.textContent = `Points Max: ${resJSON.content[x].maxPoints}`;
      faction.textContent = `Faction: ${resJSON.content[x].faction}`;

      btn.textContent = 'Edit Squadron';
      btn.addEventListener('click', async () => {
        try {
          // Need to figure out how to pass username and squadron name to the next page
          window.location.href = `/editSquadron?user=${user}&name=${name.textContent}`;
        } catch (err) {
          console.log(err);
        }
      });

      div.appendChild(name);
      div.appendChild(points);
      div.appendChild(faction);
      div.appendChild(btn);

      content.appendChild(div);
    }
  }
};

// Function to Get the User
const getUser = async (loginForm) => {
  const method = loginForm.getAttribute('method');
  const name = loginForm.querySelector('#userNameField').value;

  const formData = `name=${name}`;

  const response = await fetch('/getUser', {
    method,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: formData,
  });

  handleResponse(response, method, name);
};

// Function to Create a Squadron
const createSquadron = async (squadronForm, loginForm) => {
  const method = squadronForm.getAttribute('method');
  const userName = loginForm.querySelector('#userNameField').value;
  const name = squadronForm.querySelector('#squadronNameField').value;
  const faction = squadronForm.querySelector('#factionSelect').value;
  const points = squadronForm.querySelector('#pointsLimit').value;

  const formData = `userName=${userName}&name=${name}&faction=${faction}&points=${points}`;

  const response = await fetch('/createSquadron', {
    method,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: formData,
  });

  handleResponse(response, method, userName);
};

// Logs Out the User
const logoutUser = (logoutButton) => {
  document.querySelector('#squadronCreation').style.display = 'none';
  document.querySelector('#login').style.display = 'block';

  loginForm.querySelector('#userNameField').value = '';
  document.querySelector('#content').innerHTML = '';
};


// Init Function
const init = () => {
  const loginForm = document.querySelector('#loginForm');
  const squadronForm = document.querySelector('#squadronForm');
  const logoutButton = document.querySelector('#logout');

  const login = (e) => {
    e.preventDefault();
    getUser(loginForm);
    return false;
  };

  const create = (e) => {
    e.preventDefault();
    createSquadron(logoutButton, squadronForm, loginForm);
    return false;
  };

  const logout = (e) => {
    e.preventDefault();
    logoutUser(logoutButton);
    return false;
  }

  loginForm.addEventListener('submit', login);
  squadronForm.addEventListener('submit', create);
  logoutButton.addEventListener('click', logout);
};

window.onload = init;
