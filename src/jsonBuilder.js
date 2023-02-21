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


module.exports ={
    data,
}