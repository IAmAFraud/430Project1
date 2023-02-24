/* Squadron Format
{
    'User': {
        'Squadron Name': {
            name: 'Squadron Name',
            points: pointsMax,
            faction: 'Faction',
            ships: {
                'Ship 1':{
                    name: 'Ship 1',
                    points: pointsCost,
                    image: imageURL,
                },
            },
        },
    },

}
*/


// const filtered = data.filter(x => x.faction === 'Rebel Alliance')

// The base data for storing squadrons
const data = {
    'Sample': {
        'Sample Squadron': {
            name: 'Sample Squadron',
            points: 50,
            faction: 'Rebel Alliance',
            ships: {}
        },
        'Empire\'s Elite': {
            name: 'Empire\'s Elite',
            points: 100,
            faction: 'Galactic Empire',
            ships: {}
        }
    }
};

// Function for creating a new user
const createNewUserData = (name) => {
    data[name] = {};
};

// Function for creating new blank squadrons
const createSquadronData = (userName, name, points, faction) => {
    data[userName][name] = {};
    data[userName][name]['name'] = name;
    data[userName][name]['points'] = points;
    data[userName][name]['faction'] = faction;
    data[userName][name]['ships'] = {};
};


module.exports ={
    data,
    createNewUserData,
    createSquadronData,
}