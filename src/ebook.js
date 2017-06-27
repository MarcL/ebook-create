import convertHtmlToPDF from './convertHtmlToPdf';
import {extname} from 'path';
import slugify from 'slugify';

const shouldConvertFile = (fileName, metadata) => {
    return /\.html/.test(extname(fileName)) && !metadata.path;
};

function ebookPlugin(options) {
    return function(files, metalsmith, done) {
        const destinationPath = `${metalsmith.destination()}/`;
        const metadata = metalsmith.metadata();

        if (!metadata.title) {
            return done(new Error('Please set metadata title'));
        }

        let fileList = [];
        Object.keys(files).forEach(file => {
            const currentFileMetadata = files[file];

            if (shouldConvertFile(file, currentFileMetadata)) {
                const contents = currentFileMetadata.contents.toString();
                const bookTitle = slugify(metadata.title.toLowerCase());

                const filePath = `${destinationPath}${bookTitle}.pdf`;

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
            .catch(error => {
                console.log('Error generating PDF');
                console.log(`\t${error}`);
            });

        done();
    };
}

export default ebookPlugin;
