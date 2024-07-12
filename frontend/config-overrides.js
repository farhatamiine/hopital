const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
        util: require.resolve('util/'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert/'),  // Add this line
    };

    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ];

    return config;
}