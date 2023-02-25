// Faction Ship Types
const rebelShips = ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',
  'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',
  'YT-1300', 'YT-2400', 'Z-95 Headhunter'];

const handleResponse = async (response, key) => {
  const { status } = response;
  switch (status) {
    case 200:
      break;

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
      document.querySelector('#squadronName').textContent += resJSON.content.name;
      document.querySelector('#stats').textContent = `Points: 0/${resJSON.content.points}     Faction: ${resJSON.content.faction}`;

      // Creates Tabs for Ships
      const pilots = document.querySelector('#pilots');
      pilots.innerHTML = '';

      // Info on how to create for in loops
      // https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript
      for (const ship in rebelShips) {
        const div = document.createElement('div');
        div.textContent = rebelShips[ship];
        div.id = rebelShips[ship].replace(/ /g, '-');
        div.addEventListener('click', () => {
        });
        pilots.appendChild(div);
      }

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
          tab.appendChild(div);
        }
      }
    }
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
