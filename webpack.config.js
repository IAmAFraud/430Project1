//requires
const path = require('path');

module.exports = {
    entry: './client/homepageClient.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js',
    },
    watchOptions: {
        aggregateTimeout: 200,
    }
}