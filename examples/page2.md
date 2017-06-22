# Page 2

## Hello Page 2

This is a document.

```js
import fs from 'fs';
import markdownPdf from 'markdown-pdf';

fs.createReadStream('./examples/test.md')
    .pipe(markdownPdf())
    .pipe(fs.createWriteStream('./output/test.pdf'));
```
