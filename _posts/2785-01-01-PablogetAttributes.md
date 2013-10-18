---
category: pablo_getattributes
heading: Pablo.getAttributes(element)
path: api/pablo.getattributes
---

Returns an object of attributes on the DOM element.

    var el = document.createElement('a'),
        attributes;
    
    el.setAttribute('href', 'http://example.com');
    attributes = Pablo.getAttributes(el);

    alert(el.href);
