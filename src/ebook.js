import htmlToPdf from 'html-pdf';

function convertHtmlToPDF(contents, options, filePath) {
    return new Promise((resolve, reject) => {
        console.log(`-- Converting : ${filePath}`);
        htmlToPdf
            .create(contents, options)
            .toFile(filePath, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(contents, options);
                }
            });
    });
};

function ebookPlugin(options) {
    return function(files, metalsmith, done) {
        const destinationPath = `${metalsmith.destination()}/`;
        const metadata = metalsmith.metadata();

        if (!metadata.title) {
            return done(new Error('Please set metadata title'));
        }

        // TODO:
        // - Convert files object to array
        // - Filter files to remove non-HTML names
        // - Create promise for each file conversion
        // - Promise.all() on all promise to convert
        // - Catch any errors

        // console.log(files);
        let filePromises = [];
        Object.keys(files).forEach(file => {
            if (file.includes('.html')) {
                var contents = files[file].contents.toString();
                var path = files[file].path + '/';
                var title = files[file].title;

                let filePath;

                if (files[file].path) {
                    filePath = destinationPath + path + title + '.pdf';
                } else {
                    const bookTitle = metadata.title;
                    filePath = destinationPath + bookTitle + '.pdf';
                }

                const pdfOptions = Object.assign({}, options.pdf, {
                    base: `file://${destinationPath}`
                });

                filePromises.push(convertHtmlToPDF(contents, pdfOptions, filePath));
            }
        });

        Promise.all(filePromises)
            .then(() => {
                console.log('Converted all files');
            })
            .catch((error) => {
                console.log('Error generating PDF');
                console.log(`\t${error}`);
            });

        done();
    };
}

export default ebookPlugin;
