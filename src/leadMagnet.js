import markdownPdf from 'markdown-pdf';
import through from 'through';
import path from 'path';

function addPageBreaks(data) {
    const pageBreak = '\n\n<div style="page-break-before: always;"></div>\n\n';
    this.queue(`${data}${pageBreak}`);
}

function preProcessMd() {
    return through(addPageBreaks);
}

function createPdf(files, outputFile) {
    var markDownToPdfoptions = {
        preProcessMd: preProcessMd,
        runningsPath: path.join(__dirname, './pageRunnings.js')
    };

    markdownPdf(markDownToPdfoptions).concat.from(files).to(outputFile, () => {
        console.log(`Created : ${outputFile}`);
    });
}

function leadMagnet(options) {
    // TODO: Check if options exist
    createPdf(options.files, options.outputFile);
}

export default leadMagnet;
