import Metalsmith from 'metalsmith';
import markdown from 'metalsmith-markdown';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import permalinks from 'metalsmith-permalinks';
import metallic from 'metalsmith-metallic';
import ebook from './ebook';

function metalSmithPdf(options) {
    Metalsmith(__dirname)
        .metadata({
            title: 'Test ebook',
            destination: 'Test ebook description',
            generator: 'Metalsmith',
            url: 'https://www.metalsmith.io'
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
            pdf: {
                "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
                "orientation": "portrait", // portrait or landscape
            }
        }))
        .build((error, files) => {
            if (error) {
                console.log(error.message);
            }

            console.log('Finished building')
        });
}

export default metalSmithPdf;
