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
// requires
const userData = require('./jsonBuilder.js');

// Response Function
const respond = (request, response, status, content) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.write(JSON.stringify(content));
    response.end();
}


const getUser = (request, response, body) => {
    let responseJSON = {};

    // Need to check incoming body data

    // If it exists, simply return the data
    if (userData[body.name]){
        responseJSON = userData[body.name];
        return respond(request, response, 200, responseJSON);
    }

    // If it doesn't exist, create the user


    respond(request, response, 200, userData.data);
};


module.exports = {
    getUser,
};