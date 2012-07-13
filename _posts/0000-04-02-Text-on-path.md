---
category: reference
---
    
    var paper = Pablo($output[0]).root({width:300, height:420});

    paper
        .defs()
        ._('path', {
            id:'squiggle',
            d:'M 20 80 C 20 120 120 20 220 120 C 320 220 420 320 520 220'
        });
    paper
        .text()
        ._('textPath', {
            _link:'#squiggle',
            _content:'★ In Xanadu, did Kublah Khan a stately pleasuredome decree…',
            fill:'#997099'
        })