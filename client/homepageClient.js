// Variables
let user = '';

// Handles a response from the server
const handleResponse = async (response, method, _user) => {
  const content = document.querySelector('#content');
  const message = document.querySelector('#messages');
  const { status } = response;

  switch (status) {
    case 200:
      message.innerHTML = '<h1>Welcome!</h1>';
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
    user = _user;
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#squadronCreation').style.display = 'block';
    document.querySelector('#logout').style.display = 'block';

    // Loops through and prints out the squadrons the user has
    for (const x in resJSON.content) {
      const div = document.createElement('div');

      // Information on how to modify classlists found here
      // https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
      div.classList.add('squadron');

      const name = document.createElement('h2');
      const points = document.createElement('p');
      const faction = document.createElement('p');
      const imageWrapper = document.createElement('p');
      const inputImg = document.createElement('input');

      name.textContent = `${resJSON.content[x].name}`;
      points.textContent = `Points Max: ${resJSON.content[x].maxPoints}`;
      faction.textContent = `Faction: ${resJSON.content[x].faction}`;

      imageWrapper.textContent = 'Edit: ';
      inputImg.type = 'image';
      inputImg.src = `/getImage?path=factions/${resJSON.content[x].faction.replace(/ /g, '-').toLowerCase()}.png`;
      inputImg.alt = 'Edit Squadron';
      inputImg.title = 'Edit Squadron';
      inputImg.addEventListener('click', () => {
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
      div.appendChild(imageWrapper);
      div.appendChild(inputImg);

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
const createSquadron = async (squadronForm) => {
  const method = squadronForm.getAttribute('method');
  const name = document.querySelector('#squadronNameField').value;
  const faction = document.querySelector('#factionSelect').value;
  const points = document.querySelector('#pointsLimit').value;

  const formData = `userName=${user}&name=${name}&faction=${faction}&points=${points}`;

  const response = await fetch('/createSquadron', {
    method,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: formData,
  });

  handleResponse(response, method, user);
};

// Logs Out the User
const logoutUser = (logoutButton) => {
  document.querySelector('#squadronCreation').style.display = 'none';
  document.querySelector('#login').style.display = 'block';
  document.querySelector('#messages').innerHTML = '<h1>Logged Out</h1>';

  loginForm.querySelector('#userNameField').value = '';
  user = '';
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
    createSquadron(squadronForm);
    return false;
  };

  const logout = (e) => {
    e.preventDefault();
    logoutUser(logoutButton);
    return false;
  };

  loginForm.addEventListener('submit', login);
  squadronForm.addEventListener('submit', create);
  logoutButton.addEventListener('click', logout);
};

window.onload = init;
