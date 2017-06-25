---
title: chapter1
---

# Chapter 1

## Hello World

Street art try-hard crucifix typewriter portland vape sartorial. Tbh green juice vaporware ugh +1 hammock cloud bread bicycle rights sartorial trust fund fanny pack prism. Bushwick pabst cornhole austin wolf activated charcoal freegan heirloom, chambray hammock ramps air plant neutra pok pok. Vaporware vinyl snackwave gochujang bitters. Put a bird on it locavore pop-up deep v. Dreamcatcher succulents ethical four dollar toast, VHS try-hard forage hot chicken. Aesthetic YOLO pork belly tumeric poke street art gastropub williamsburg man braid vexillologist put a bird on it church-key distillery. Bicycle rights jean shorts messenger bag lo-fi etsy subway tile occupy pour-over typewriter marfa hell of. Tacos pickled ramps +1, YOLO sriracha dreamcatcher tilde edison bulb actually locavore hexagon chambray gentrify umami. Cloud bread kombucha hella blog. Actually health goth vaporware vice. Sustainable letterpress poke offal la croix vape.

```javascript
import fs from 'fs';
import markdownPdf from 'markdown-pdf';

fs.createReadStream('./examples/test.md')
    .pipe(markdownPdf())
    .pipe(fs.createWriteStream('./output/test.pdf'));
```
