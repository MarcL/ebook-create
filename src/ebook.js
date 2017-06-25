import convertHtmlToPDF from './convertHtmlToPdf';

const shouldConvertFile = (fileName, metadata) => {
    return fileName.includes('.html') && !metadata.path;
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

        let fileList = [];
        Object.keys(files).forEach(file => {
            const currentFileMetadata = files[file];

            if (shouldConvertFile(file, currentFileMetadata)) {
                const contents = currentFileMetadata.contents.toString();
                const path = currentFileMetadata.path + '/';
                const title = currentFileMetadata.title;

                let filePath;

                if (currentFileMetadata.path) {
                    filePath = destinationPath + path + title + '.pdf';
                } else {
                    const bookTitle = metadata.title;
                    filePath = destinationPath + bookTitle + '.pdf';
                }

                const pdfOptions = Object.assign({}, options.pdf, {
                    base: `file://${destinationPath}`
                });

                fileList.push(convertHtmlToPDF(contents, pdfOptions, filePath));
            }
        });

        Promise.all(fileList)
            .then(convertedFileMessages => {
                console.log('Converted all files');
                convertedFileMessages.forEach(message => {
                    console.log(`\t${message}`);
                });
            })
            .catch((error) => {
                console.log('Error generating PDF');
                console.log(`\t${error}`);
            });

        done();
    };
}

export default ebookPlugin;
