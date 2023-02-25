// Faction Ship Types
const rebelShips = ['A-Wing', 'ARC-170', 'Attack Shuttle', 'B-Wing', 'CR90 Corvette', 'E-Wing', 'GR-75 Medium Transport',
    'HWK-290', 'K-Wing', 'Scurrg H-6 Bomber', 'T-70 X-Wing', 'TIE Fighter', 'U-Wing', 'VCX-100', 'X-Wing', 'Y-Wing',
    'YT-1300', 'YT-2400', 'Z-95 Headhunter'];

const handleResponse = async (response, key) => {
    const status = response.status;
    switch (status){
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
    if (status === 200){
        if (key === 'squadron'){
            document.querySelector('#squadronName').textContent += resJSON['content']['name'];
            document.querySelector('#stats').textContent = `Points: 0/${resJSON['content']['points']}     Faction: ${resJSON['content']['faction']}`;

            // Loads in the faction's pilots if the squadron is loaded in
            const pilotResponse = await fetch (`/getFactionData?faction=${resJSON['content']['faction']}`, {
                method: 'get',
                headers: {
                    'accept': 'application/json',
                },
            });

            // Creates Tabs for Ships
            const pilots = document.querySelector('#pilots');
            pilots.innerHTML = "";
            for (let ship in rebelShips){
                const div = document.createElement('div');
                div.textContent = rebelShips[ship];
                pilots.appendChild(div);
            }

            handleResponse(pilotResponse, 'pilots');
        } else if (key === 'pilots'){
            console.log(resJSON['content']);


        }
    } else if (status === 400) {
        console.log(resJSON['message']);
    }
}


const init = async () => {
    const squadronResponse = await fetch ('/getSquadronInfo' + window.location.search, {
        method: 'get',
        headers: {
            'content-type': 'application:x-www-form-urlencoded',
            'accept': 'application/json',
        },
    });
    handleResponse(squadronResponse, 'squadron');
};

window.onload = init;