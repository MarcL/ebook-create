# Testing Markdown to PDF

## Hello World

This is a document.

```javascript
import fs from 'fs';
import markdownPdf from 'markdown-pdf';

fs.createReadStream('./examples/test.md')
    .pipe(markdownPdf())
    .pipe(fs.createWriteStream('./output/test.pdf'));
```
