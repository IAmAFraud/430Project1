// Requires
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Creates the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Structs for GET, HEAD, and POST requests
const getStruct = {
  '/': htmlHandler.getHTML,
  '/getUser': jsonHandler.getUser,
}

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
    const bodyParams = query.parse(bodyString);

    handlerFunction(request, response, bodyParams);
  });
};


// On Request Function
const onRequest = (request, response) => {
  console.log(request.url);
  if (request.url === '/bundle.js'){
    htmlHandler.getJS(request, response);
  } else if (request.url === '/'){
    htmlHandler.getHTML(request, response); 
  } else if (request.url === '/getUser'){
    parseBody(request, response, jsonHandler.getUser);
  }

};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
