const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/client/index.js',
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                include: /src/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                include: /public/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })

            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?name=images/[name].[ext]'
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};
