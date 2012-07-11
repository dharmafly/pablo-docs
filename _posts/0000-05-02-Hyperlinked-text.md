---
category: reference
---

Pablo's `a(options)` method can be used to set up hyperlinks on svg elements.

Take note of how only the 'text' svg element is hyperlinked.

    var paper = Pablo($output[0]).root({width: 500, height: 500});

    paper
    ._('circle', {cx:200, cy:150, r:50, fill:'#f33', stroke:'#050'})
    .a({
        _link: 'https://github.com/dharmafly/pablo',
        target: '_blank'
    })
    ._('text', {
        _content:'we ♥ pablo',
        x:300,
        y:170,
        fill:'#777',
        transform:'rotate(-45 300 170)'
    });