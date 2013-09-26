--- 
heading: Pablo.getAttributes(element)
category: pablo.getattributes
---

Returns an object of attributes on the DOM element.

    var el = document.createElement('a'),
        attributes;
    
    el.setAttribute('href', 'http://example.com');
    attributes = Pablo.getAttributes(el);

    alert(el.href);
