module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'~/styles': './src/styles',
						'~/assets': './src/assets',
						'~/components': './src/components',
						'~/contexts': './src/contexts',
						'~/utils': './src/utils',
						'~/hooks': './src/hooks',
						'~/entities': './src/entities',
						'~/database': './src/database',
						'~/lang': './src/lang',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
