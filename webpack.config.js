module.exports = {
    //archivo que va transformar
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        //archivo donde va a ir todo el javascript convertido
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
             
             test: /\.js$/,
             exclude: /node_modules/,
             use: {
                loader: 'babel-loader'
               }
            }
        ]
    }
};