import chalk from 'chalk';
import htmlToPdf from 'html-pdf';
import logSymbols from 'log-symbols';

function convertHtmlToPDF(contents, options, filePath) {
    return new Promise((resolve) => {
        console.log(`${logSymbols.info} ${chalk.bold(`Converting : ${filePath}`)}`);
        htmlToPdf.create(contents, options).toFile(filePath, error => {
            const message = error
                ? `${logSymbols.error} ${chalk.red(`Error converting : ${filePath} : ${error.message}`)}`
                : `${logSymbols.success} ${chalk.green(`Converted : ${filePath}`)}`;

            resolve(message);
        });
    });
}

export default convertHtmlToPDF;
