import convertHtmlToPDF from './convertHtmlToPdf';
import {extname} from 'path';
import slugify from 'slugify';
import pluginKit from 'metalsmith-plugin-kit';
import constants from './constants';
import logSymbols from 'log-symbols';

const shouldConvertFile = (fileName, metadata) => {
    return /\.html/.test(extname(fileName)) && !metadata.path;
};

function ebookPlugin(options) {
    const optionsOverride = pluginKit.defaultOptions({
        pdf: constants.pdf,
        pattern: ['**/*']
    }, options);

    let destinationPath;
    let metadata;
    return pluginKit.middleware({
        before: (files, metalsmith, done) => {
            destinationPath = `${metalsmith.destination()}/`;
            metadata = metalsmith.metadata();

            const message = metadata.title
                ? undefined
                : new Error(`${logSymbols.error} Please set metadata title`);

            done(message);
        },
        each: (filename, fileObject) => {
            const contents = fileObject.contents.toString();
            const bookTitle = slugify(metadata.title.toLowerCase());

            const filePath = fileObject.path
                ? `${destinationPath}${fileObject.path}${fileObject.title}.pdf`
                : `${destinationPath}${bookTitle}.pdf`;

            const pdfOptions = Object.assign({}, options.pdf, {
                base: `file://${destinationPath}`
            });

            return convertHtmlToPDF(contents, pdfOptions, filePath)
                .then(message => console.log(message));
        },
        match: optionsOverride.pattern
    });
}

export default ebookPlugin;
