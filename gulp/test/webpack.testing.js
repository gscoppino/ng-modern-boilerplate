import path from 'path';

export default {
    // Output bundle as IIFE.
    target: 'web',

    resolve: {
        // Allow importing files relative to the application root.
        root: path.resolve(process.cwd(), 'src'),

        // Allow importing modules from node_modules.
        modulesDirectories: ['node_modules']
    },

    // The section configures the pipeline that imports are applied against.
    // Imports that match patterns in the pipeline will have those pipelines
    // applied to them (unless they are explicitly excluded).
    // NOTE: The pipeline is evaluated tail to head at each stage.
    module: {
        preLoaders: [
            // Lint all Javascript files.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['eslint-loader']
            }
        ],
        loaders: [
            // Import HTML as raw strings.
            {
                test: /\.html$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['raw-loader']
            },
            // Transform ES2015 syntax to ES5 for all source files, and instrument
            // the code so we can obtain coverage metrics at runtime.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [/\.spec\.js$/, path.resolve(process.cwd(), 'node_modules')],
                loaders: ['babel-istanbul']
            },
            // Transform ES2015 syntax to ES5 for all spec files.
            {
                test: /\.spec\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['babel-loader']
            }
        ]
    },

    // Emit a sourcemap that will be inlined into the bundle.
    devtool: 'inline-source-map'
};