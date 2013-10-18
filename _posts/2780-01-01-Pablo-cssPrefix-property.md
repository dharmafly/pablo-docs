---
category: pablo_cssprefix
heading: Pablo.cssPrefix(property)
path: api/pablo.cssprefix
---

Converts a CSS `property` string to a comma-separated string of vendor-prefixed properties.

    var property = 'transform',
        prefixed = Pablo.cssPrefix(property),
        svg = Pablo(demoElement).svg({height:100}),
        rect = svg.rect({width:100, height:100});

    // Add a CSS transition, targetting the prefixed 'transform' properties
    rect.cssPrefix({
        'transition-property': prefixed,
        'transition-duration': '1s',
        'transition-timing-function': 'ease-in'
     });

    window.setTimeout(function(){
        rect.cssPrefix('transform', 'translate(200px)');
    }, 4);

    alert(prefixed);


See also [`cssPrefix()`](/api/cssPrefix/) and [`Pablo.vendorPrefixes`](/api/Pablo.vendorPrefixes/).

