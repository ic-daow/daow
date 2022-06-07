module.exports = {
	module: {
		rules: [{
			test: '/\.(js|jsx)$/',
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'] // 也可以写成presets:['babel-preset-env']
				}
			},
			exclude: ['/node_modules/']
		}]
	}
}
