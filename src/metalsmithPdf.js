import Metalsmith from 'metalsmith';
import markdown from 'metalsmith-markdown';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import permalinks from 'metalsmith-permalinks';
import metallic from 'metalsmith-metallic';
import ebook from './ebook';
import constants from './constants';

function metalSmithPdf(options) {
    Metalsmith(__dirname)
        .metadata({
            title: 'Test ebook',
            destination: 'Book description',
            generator: 'LeadMagnet',
            url: 'https://www.marclittlemore.io'
        })
        .source('../examples/src')
        .destination('../output')
        .clean(true)
        .use(collections({
            chapters: {
                pattern: 'chapters/*.md'
            }
        }))
        .use(markdown())
        .use(permalinks())
        .use(metallic())
        .use(layouts({
            engine: 'handlebars',
            directory: '../examples/layouts'
        }))
        .use(ebook({
            title: 'Test ebook',
            author: 'Test author',
            pdf: constants.pdf
        }))
        .build((error, files) => {
            if (error) {
                console.log(error.message);
            }

            console.log('Finished building')
        });
}

export default metalSmithPdf;
