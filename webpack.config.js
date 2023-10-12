const path = require('path');
module.exports = {
    // entry: path.resolve(__dirname, '../src/main.js'),
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    // },
    // outputDir: 'dist',
    // devtool: 'eval-source-map',
    publicPath: './',

    devServer: {
        open: false,
        host: "0.0.0.0",
        port: 9999,
        https: false,
        hotOnly: false,
    }
}
