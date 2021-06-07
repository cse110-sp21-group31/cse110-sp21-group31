// babel.config.js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: '>2%',
                },
            },
        ],
    ],
};
