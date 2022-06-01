const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
   entry: '/app.js',
   mode: 'production',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   module: {
      rules: [{
         test:/\.(s*)css$/,
         use: [
            miniCss.loader,
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // <-- !!IMPORTANT!!
              }
            }
         ]
      }]
   },
   plugins: [
      new miniCss({
         filename: 'style.css',
      }),
   ]
};