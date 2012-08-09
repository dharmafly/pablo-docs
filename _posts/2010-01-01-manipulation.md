---
category: reference
heading: Manipulation
---


Pablo also has an assortment of methods for changing the properties of 
SVG nodes.

Attributes
--

CSS properties carry over to SVG natively. 

This means you can use CSS to set SVG node properties by appending a style 
element and editing its content, using `style().content(css)`.

    // Create the root node.
    var paper = Pablo(demoElement).root({height:100});

    // Append a <style> element
    paper
        .style()
        // Change text content of style (Similar to jQuery's text() method)
        .content(
            '* {stroke-width:20}' +
            'circle {fill:green}'
        );

    paper._('circle', {stroke: 'red', cx:50, cy:50, r:25});



Hyperlinks
----

The `a(options)` element method can be used to set up hyperlinked SVG elements.

In the example below `<a>` elements are created and SVG elements are appended 
as children.

    var paper  = Pablo(demoElement).root({height: 130}),
        circle = paper.circle({cx:60, cy:60, r:50, fill:'red'}),
        text   = paper.text({x:220, y:30}).content('we ♥ pablo');

    paper.a({
        _link: 'https://github.com/dharmafly/pablo',
        target: '_blank'
    })
    (circle);

    paper.a({
        _link: 'https://github.com/dharmafly',
        target: '_blank'
    })
    (text);