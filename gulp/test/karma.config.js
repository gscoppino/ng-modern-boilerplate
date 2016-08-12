import WEBPACK_TESTING_CONFIG from './webpack.testing';

export default {
    frameworks: ['jasmine'],
    files: [
        'node_modules/babel-polyfill/dist/polyfill.min.js', // Polyfill ES2015 features
        'src/main.test.js'
    ],
    preprocessors: {
        'src/main.test.js': ['webpack', 'sourcemap']
    },
    webpack: WEBPACK_TESTING_CONFIG,
    browsers: ['PhantomJS'],
    port: 9876,
    concurrency: Infinity,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
        dir: 'dist/coverage',
        reporters: [
            { type: 'text' },
            { type: 'html', subdir: 'html' }
        ]
    },
    colors: true
};
