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
    if (userData.data[body.userName][body.name]){
        responseJSON.message = 'Name already exists, please change the name';
        responseJSON.id = 'nameAlreadyExists';
        return respond(request, response, 400, responseJSON);
    }

    // Creates the data for a blank squadron
    userData.createSquadronData(body.userName, body.name, body.points, body.faction);

    // Sends a response
    responseJSON.message = 'Successfully created squadron';
    responseJSON.content = userData.data[body.userName];
    respond(request, response, 201, responseJSON);
};

// Get Squadron Info Response
const getSquadronInfo = (request, response, params) => {
    const responseJSON = {};

    // If missing parameters, back out
    if (!params.user || !params.name){
        responseJSON.message = 'Needs a user and name parameter';
        responseJSON.id = 'addMissingParams';
        return respond(request, response, 400, responseJSON);
    }

    // If invalid user or squadron name, back out
    if (!userData.data[params.user] || !userData.data[params.user][params.name]){
        responseJSON.message = 'Invalid User or Squadron. Content does not exist';
        responseJSON.id = 'squadronNotFound';
        return respond(request, response, 404, responseJSON);
    }

    responseJSON.message = 'Successfully Loaded In Squadron';
    responseJSON.content = userData.data[params.user][params.name];
    return respond(request, response, 200, responseJSON);
};

const getPilotInfo = (request, response, params) => {
    const responseJSON = {};
    if (!params.faction){
        responseJSON.message = 'Need a faction parameter';
        responseJSON.id = 'missingFactionParam';
        return respond(request, response, 400, responseJSON);
    }

    /*
    console.log(params.faction);
    if (params.faction !== 'Rebel Alliance' || params.faction !== 'Galactic Empire' || params.faction !== 'Scum and Villainy') {
        responseJSON.message = 'Faction parameters is not correct';
        responseJSON.id = 'invalidFactionParam';
        return respond(request, response, 400, responseJSON);
    }
    */

    data = userData.getFactionData(params.faction);
    responseJSON.message = 'Sucessfully got faction data';
    responseJSON.content = data;
    return respond(request, response, 200, responseJSON);
};


module.exports = {
    getUser,
    createSquadron,
    getSquadronInfo,
    getPilotInfo
};