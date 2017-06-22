import Metalsmith from 'metalsmith';
import markdown from 'metalsmith-markdown';
import pdf from 'metalsmith-pdf';

function metalSmithPdf(options) {
    Metalsmith(__dirname)
        .source('../examples')
        .destination('../output')
        .clean(true)
        .use(markdown())
        .use(pdf({
            pattern: '**/*.html',
            pageSize: 'A4',
            cover: './cover.jpg'
        }))
        .build((error) => {
            if (error) {
                throw new Error('Error building files');
            }

            console.log('file built')
        });
}

export default metalSmithPdf;
