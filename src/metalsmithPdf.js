import Metalsmith from 'metalsmith';
import markdown from 'metalsmith-markdown';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import permalinks from 'metalsmith-permalinks';
import metallic from 'metalsmith-metallic';
import ebook from './ebook';
import constants from './constants';

function metalSmithPdf(options) {
    const metadata = {
        title: 'Test Lead Magnet Generator',
        destination: 'Book description',
        generator: 'LeadMagnet',
        url: 'https://www.marclittlemore.com'
    };

    const pdfOptions = Object.assign({}, constants.pdf, {
        header: {
            contents: {
                first: '',
                default: `<div class="pageHeader">${metadata.title}</div>`
            }
        },
        footer: {
            contents: `<div class="pageFooter">${metadata.url}</div>`
        }
    });

    Metalsmith(__dirname)
        .metadata(metadata)
        .source('../examples/src')
        .destination('../output')
        .clean(true)
        .use(
            collections({
                chapters: {
                    pattern: 'chapters/*.md'
                }
            })
        )
        .use(markdown())
        .use(permalinks())
        .use(metallic())
        .use(
            layouts({
                engine: 'handlebars',
                directory: '../examples/layouts'
            })
        )
        .use(
            ebook({
                title: 'Test ebook',
                author: 'Test author',
                pdf: pdfOptions
            })
        )
        .build((error, files) => {
            if (error) {
                console.log(error.message);
            }

            console.log('Finished building');
        });
}

export default metalSmithPdf;
