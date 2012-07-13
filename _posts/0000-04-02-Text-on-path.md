---
category: reference
---

Pablo designates the subject of it's method chain to the last 
mentioned svg element.

    var paper = Pablo($output[0]).root({width:300, height:420});

    // Make a svg definition element and append a path element to it
    paper
        .defs()
        ._('path', {
            id:'squiggle',
            d:'M 20 80 C 20 120 120 20 220 120 C 320 220 420 320 520 220'
        });

    // Make a text element and append a textPath element to it.
    paper
        .text()
        ._('textPath', {
            _link:'#squiggle',
            _content:'★ In Xanadu, did Kublah Khan a stately pleasuredome decree…',
            fill:'#997099'
        })