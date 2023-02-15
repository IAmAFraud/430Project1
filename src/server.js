// Requires
const http = require('http');
const htmlHandler = require('./htmlResponses.js');

// Creates the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Structs for GET, HEAD, and POST requests

// On Request Function
const onRequest = (request, response) => {
  console.log(request.url);
  if (request.url === '/bundle.js'){
    htmlHandler.getJS(request, response);
  }
  else{
    htmlHandler.getHTML(request, response); 
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
