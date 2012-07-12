---
category: reference
---

Pablo's `a(options)` method can be used to set up hyperlinks on svg elements.

Take note of the order of the chained function calls and how only the 'text' 
svg element is hyperlinked.

`a()` is only applied to multiple proceeding appended elements.

    var paper = Pablo($output[0]).root({height: 130});

    paper
    ._('circle', {cx:60, cy:60, r:50, fill:'#f33', stroke:'#050'})
    .a({
        _link: 'https://github.com/dharmafly/pablo',
        target: '_blank'
    })
    ._('text', {
        _content:'we ♥ pablo',
        x:220,
        y:30,
        fill:'#777',
        transform:'rotate(-45 300 170)'
    })
    ._('circle', {cx:260, cy:60, r:50, fill:'#3f3', stroke:'#050'})