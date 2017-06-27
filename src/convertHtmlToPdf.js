import htmlToPdf from 'html-pdf';
import logSymbols from 'log-symbols';

function convertHtmlToPDF(contents, options, filePath) {
    return new Promise((resolve, reject) => {
        console.log(`${logSymbols.info} Converting : ${filePath}`);
        htmlToPdf.create(contents, options).toFile(filePath, error => {
            const message = error
                ? `${logSymbols.error} Error converting : ${filePath} : ${error.message}`
                : `${logSymbols.success} Converted : ${filePath}`;

            resolve(message);
        });
    });
}

export default convertHtmlToPDF;
