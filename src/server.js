// Requires
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imgHandler = require('./imgResponses.js');

// Creates the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Structs for GET, HEAD, and POST requests
const getStruct = {
  '/': htmlHandler.getHomepageHTML,
  '/homepageStyle.css': htmlHandler.getCSS,
  '/homepageBundle.js': htmlHandler.getHomepageJS,
  '/editSquadron': htmlHandler.getEditorHTML,
  '/editorBundle.js': htmlHandler.getEditorJS,
  '/getSquadronInfo': jsonHandler.getSquadronInfo,
  '/getFactionData': jsonHandler.getPilotInfo,
  '/getImage': imgHandler.getImage,
  notFound: htmlHandler.getHomepageHTML,
};

const postStruct = {
  '/getUser': jsonHandler.getUser,
  '/createSquadron': jsonHandler.createSquadron,
  '/saveSquadron': jsonHandler.saveSquadron,
};

// Parse Body Function
const parseBody = (request, response, handlerFunction) => {
  const body = [];

  request.on('error', (err) => {
    console.log(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();

    let parsedBody;
    if (request.headers['content-type'] === 'application/json') {
      parsedBody = JSON.parse(bodyString);
    } else {
      parsedBody = query.parse(bodyString);
    }

    handlerFunction(request, response, parsedBody);
  });
};

// Handles Get Requests
const handleGet = (request, response, parsedUrl) => {
  const func = getStruct[parsedUrl.pathname];
  const params = query.parse(parsedUrl.query);

  if (func) {
    func(request, response, params);
  } else {
    getStruct.notFound(request, response);
  }
};

// Handles Post Requests
const handlePost = (request, response, parsedUrl) => {
  const func = postStruct[parsedUrl.pathname];

  if (func) {
    parseBody(request, response, func);
  } else {
    getStruct.notFound(request, response);
  }
};

// On Request Function
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      handleGet(request, response, parsedUrl);
      break;

    case 'POST':
      handlePost(request, response, parsedUrl);
      break;

    default:
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
