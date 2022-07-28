// devtools
const path = require('path');
const { webpack } = require('webpack');
// html
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        portfolioPage: './src/pages/PortfolioPage/PortfolioPage.js',
        projectPage: './src/pages/ProjectPage/ProjectPage.js',
    },
    output: {
        filename: 'scripts/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]',
                },
            },
            {
                test: /\.mp4$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/videos/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/PortfolioPage/PortfolioPage.html',
            filename: 'pages/portfolio.html',
            chunks: ['portfolioPage'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/ProjectPage/ProjectPage.html',
            filename: 'pages/project.html',
            chunks: ['projectPage'],
        }),
    ],
    resolve: {
        alias: {
            Src: path.resolve(__dirname, 'src'),
            Components: path.resolve(__dirname, 'src/components'),
            Sections: path.resolve(__dirname, 'src/sections'),
        },
    },
};
