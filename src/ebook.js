import pdf from 'html-pdf';

function ebookPlugin(options) {
    return function (files, metalsmith, done) {
        const destinationPath = `${metalsmith.destination()}/`;
        const metadata = metalsmith.metadata();

    	// THROW ERROR IF TITLE ATTRIBUTE IS NOT SET
    	if (!metadata.title) {
    		return done(new Error('Please set metadata title'));
    	}

        // console.log(files);
        Object.keys(files).forEach((file) => {
            if (file.includes('.html')) {
                var contents = files[file].contents.toString();
                var path = files[file].path + '/';
                var title = files[file].title;

                var p0 = new Promise((resolve, reject) => {
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

                    createPDF(contents, pdfOptions, filePath);

                    function createPDF(contents, options, filePath){
                        console.log(`-- Writing : ${filePath}`);
                        pdf.create(contents, options).toFile(filePath, function(err, res) {
                            if (err) {
                                reject();
                            } else {
                                resolve(contents, options);
                            }
                        });
                    }
                });

                p0.then(function(){
                    console.log("PDF CREATED");
                }).catch((error) => {
                    console.log('ERROR GENERATING PDF');
                    console.log(`\t${error}`);
                });
            }
        });

        done();
    };
};

export default ebookPlugin;
