export default {
    html: {
        'src/app/app.html': {
            tag: 'app',
            childInjects: {
                'src/app/common/components/loader-spinner/loader-spinner.html': {
                    tag: 'loader-spinner',
                    childInjects: null
                }
            }
        }
    },
    css: [
        'src/app/common/styles/**/*.css',
        'src/app/common/components/loader-spinner/loader-spinner.css',
        'src/main.css',
        'src/app/app.css'
    ]
};