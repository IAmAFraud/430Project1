//requires
const path = require('path');

module.exports = {
    entry: {
        homepage: './client/homepageClient.js',
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
    watchOptions: {
        aggregateTimeout: 200,
    }
}