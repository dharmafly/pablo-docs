---
category: transformcss
heading: transformCss(name)
path: api/transformcss
---


Get an array of values for the named transform.

    /* Given an element with a CSS transform... */
    var elem = Pablo.rect().transform('rotate(45deg) scale(2)');
    
    // get a named transform
    alert(elem.transformCss('rotate'));

