import markdownPdf from 'markdown-pdf';
import through from 'through';

var markDownToPdfoptions = {
    preProcessMd: preProcessMd,
}

function addPageBreaks(data) {
    const pageBreak = '\n\n<div style="page-break-before: always;"></div>\n\n'
    this.queue(`${data}${pageBreak}`);
}

function preProcessMd () {
    return through(addPageBreaks);
}

function createPdf(files, outputFile) {
    markdownPdf(markDownToPdfoptions)
        .concat.from(files)
        .to(outputFile, () => {
            console.log(`Created : ${outputFile}`)
        })
}

function leadMagnet(options) {
    // TODO: Check if options exist
    createPdf(options.files, options.outputFile);
}

export default leadMagnet;
