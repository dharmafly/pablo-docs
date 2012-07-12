---
category: reference
---
    
    var paper = Pablo($output[0]).root({width:300, height:420});

    paper
        .defs()
        ._('path', {
            id:'squiggle',
            transform:'rotate(-90 300 170)',
            d:'M 20 320 C 120 220 220 120 320 220 C 420 320 520 420 620 320'
        });
    paper
        .text()
        ._('textPath', {
            _link:'#squiggle',
            _content:'★ In Xanadu, did Kublah Khan a stately pleasuredome decree…',
            fill:'#997099'
        })