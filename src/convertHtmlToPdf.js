import htmlToPdf from 'html-pdf';
import logSymbols from 'log-symbols';

function convertHtmlToPDF(contents, options, filePath) {
    return new Promise((resolve, reject) => {
        console.log(`-- Converting : ${filePath}`);
        htmlToPdf
            .create(contents, options)
            .toFile(filePath, (error) => {
                if (error) {
                    const message = `${logSymbols.error} Error converting : ${filePath} : ${error.message}`;
                    resolve(message);
                } else {
                    const message = `${logSymbols.success} Converted : ${filePath}`;
                    resolve(message);
                }
            });
    });
};

export default convertHtmlToPDF;
