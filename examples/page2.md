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

Add to your **package.json** as a script and execute your test suite using **npm**.

```json
{
    "scripts": {
        "test": "mocha"
    }
}
```

```bash
$ npm test
```

Or run **mocha** from the command line.

```bash
$ mocha
$ ./node_modules/mocha/bin/mocha
```