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
    response.writeHead(status, {'Content-Type': 'application/json'})
    response.write(JSON.stringify(content));
    response.end();
}

// Get User Function
const getUser = (request, response, body) => {
    let responseJSON = {};

    // Need to check incoming body data
    if (!body.name) {
        responseJSON.message = 'Name value is required';
        responseJSON.id = 'addMissingParam';
        return respond(request, response, 400, responseJSON);
    }

    // If it exists, simply return the data
    if (userData.data[body.name]){
        responseJSON.message = 'Sucessfully got user';
        responseJSON.content = userData.data[body.name];
        activeUser = body.name;
        return respond(request, response, 200, responseJSON);
    }

    // If it doesn't exist, create the user
    userData.createNewUserData(body.name);
    responseJSON.message = 'Successfully created user';
    responseJSON.content = userData.data[body.name];
    activeUser = body.name;
    respond(request, response, 201, responseJSON);
};

// Function to Create Squadron
const createSquadron = (request, response, body) => {
    let responseJSON = {};

    // Checks incoming Body data to ensure it is valid
    if (!body.name){
        responseJSON.message = 'Name value is required';
        responseJSON.id = 'addMissingParam';
        return respond(request, response, 400, responseJSON);
    }

    // Need to prevent overwriting data
    console.log(userData.data[body.userName])

    // Creates the data for a blank squadron
    userData.createSquadronData(body.userName, body.name, body.points, body.faction);

    // Sends a response
    responseJSON.message = 'Successfully created squadron';
    responseJSON.content = userData.data[body.userName];
    respond(request, response, 201, responseJSON);
}


module.exports = {
    getUser,
    createSquadron,
};