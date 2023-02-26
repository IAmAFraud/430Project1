// Saved Client Data
// Faction Ship Types
const rebelShips = ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',
  'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',
  'YT-1300', 'YT-2400', 'Z-95 Headhunter'];

// Squadron object
let squadronObj;
let currentPoints = 0;

// Function for printing squadron's cards
const printSquadron = () => {
    const squadron = document.querySelector('#squadron');
    squadron.innerHTML = '';
    for(let ship in squadronObj['ships']){
        const div = document.createElement('div');
        div.id = ship.name;
        div.innerHTML = `<p>Pilot: ${squadronObj['ships'][ship].name}  
            Points: ${squadronObj['ships'][ship].points}</p>`;

        const img = document.createElement('img');
        img.src = `/getImage?path=${squadronObj['ships'][ship].image}`;

        div.appendChild(img);
        squadron.appendChild(div);
    }
};

// Adds a ship to the local squadron data
const addShip = (_name, _points, _image) => {
    squadronObj['ships'][_name] = {
        name: _name,
        points: _points,
        image: _image
    }

    squadronObj.currentPoints += _points;
    document.querySelector('#stats').textContent = `Points: ${squadronObj.currentPoints}/${squadronObj.maxPoints}     
        Faction: ${squadronObj.faction}`;

    printSquadron();
};

const handleResponse = async (response, key) => {
  const { status } = response;
  switch (status) {
    case 200:
      break;

    case 201:
        break;

    // Removing a Ship, Needs to Reprint the Ships
    case 204:
      return;

    case 400:
      break;

    case 404:
      break;

    default:
      break;
  }

  const resJSON = await response.json();
  if (status === 200) {
    if (key === 'squadron') {
        squadronObj = resJSON.content;
        document.querySelector('#squadronName').textContent += squadronObj.name;
        document.querySelector('#stats').textContent = `Points: ${squadronObj.currentPoints}/${squadronObj.maxPoints}     
        Faction: ${squadronObj.faction}`;

        // Creates Tabs for Ships
        const pilots = document.querySelector('#pilots');
        pilots.innerHTML = '';

        // Info on how to create for in loops
        // https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript
        for (const ship in rebelShips) {
            const div = document.createElement('div');
            div.textContent = rebelShips[ship];
            div.id = rebelShips[ship].replace(/ /g, '-');
            div.addEventListener('click', () => {}); // Functionality for opening tabs of ships

            pilots.appendChild(div);
        }

        // Prints the squadron to the screen
        printSquadron();

        // Loads in the faction's pilots if the squadron is loaded in
        const pilotResponse = await fetch(`/getFactionData?faction=${resJSON.content.faction}`, {
            method: 'get',
            headers: {
            accept: 'application/json',
            },
        });

        handleResponse(pilotResponse, 'pilots');
    } else if (key === 'pilots') {
      console.log(resJSON.content);

      for (const ship in rebelShips) {
        const filtered = resJSON.content.filter((x) => x.ship === rebelShips[ship]);

        // Info on how to replace all spaces in a string
        // https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match
        const tab = document.querySelector(`#${rebelShips[ship].replace(/ /g, '-')}`);
        for (const pilot in filtered) {
            const div = document.createElement('div');
            div.id = filtered[pilot].name;
            div.innerHTML = `<p>Pilot: ${filtered[pilot].name}  Points: ${filtered[pilot].points}</p>`;

            // Creates a button to add the card to the squadron
            const button = document.createElement('button');
            button.textContent = 'Add To Squadron';
            button.addEventListener('click', async () => {
                // Checks if the card will bring the squadrons points above the maximum value
                if (squadronObj.currentPoints + filtered[pilot].points > squadronObj.maxPoints){
                    console.log('Cannot fit into squadron');
                    return;
                }

                // Adds the ship to the client's side
                addShip(filtered[pilot].name, filtered[pilot].points, filtered[pilot].image);
            });

            const img = document.createElement('img');
            img.src = `/getImage?path=${filtered[pilot].image}`;

            div.appendChild(button);
            div.appendChild(img);
            tab.appendChild(div);
        }
      }
    }
  } else if (status === 201) {
    
  } else if (status === 400) {
    console.log(resJSON.message);
  }
};

const init = async () => {
  const squadronResponse = await fetch(`/getSquadronInfo${window.location.search}`, {
    method: 'get',
    headers: {
      'content-type': 'application:x-www-form-urlencoded',
      accept: 'application/json',
    },
  });
  handleResponse(squadronResponse, 'squadron');
};

window.onload = init;
