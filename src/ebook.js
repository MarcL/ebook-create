import pdf from 'html-pdf';

function ebookPlugin(options) {
    return function (files, metalsmith, done) {
        const destinationPath = `${metalsmith.destination()}/`;
        const metadata = metalsmith.metadata();

    	// THROW ERROR IF TITLE ATTRIBUTE IS NOT SET
    	if (!metadata.title) {
    		return done(new Error('Please set metadata title'));
    	}

        Object.keys(files).forEach(function(file){
            console.log(file);

        	var contents = files[file].contents.toString();

        	var path = files[file].path + '/';

        	var title = files[file].title;

        	var p0 = new Promise((resolve, reject) => {
                if (files[file].path) {

                    var filePath = destinationPath + path + title + '.pdf';

                    createPDF(contents, options.pdf, filePath);
                } else {
                    const bookTitle = metadata.title;
                    var filePath = destinationPath + bookTitle + '.pdf';

                    createPDF(contents, options.pdf, filePath);
                }

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
                console.log(`/t${error}`);
        	});

        });

        done();
    };
};

export default ebookPlugin;
