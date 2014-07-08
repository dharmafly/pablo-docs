---
category: transformcss
heading: transformCss(true)
path: api/transformcss
---


As above, but returns an ordered array of transform objects.

    /* Given an element with a CSS transform... */
    var elem = Pablo.rect().transform('rotate(45deg) scale(2)');
    
    // get its transforms
    alert(elem.transformCss(true));

