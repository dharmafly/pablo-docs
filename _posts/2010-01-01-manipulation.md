--- 
heading: Manipulation
category: reference
---


Pablo collections, and the SVG elements they contain, can be manipulated in a number of ways.


`attr()`: Get attributes


Without arguments, the `attr()` method returns an object corresponding to the element's attributes.

    var square = Pablo.rect({width: 100, fill: 'red'});
    square.attr(); // returns {width: 100, fill: 'red'}


`attr(attributeName)`: Get an named attribute
--

Passing two strings sets the corresponding attribute:

    square.attr('fill', 'blue'); // makes the square blue


`attr(attributes)`: Set multiple attributes


Passing all the attributes to be changed as an object:

    square.attr({fill:'orange', width:50});


`removeAttr(attributeName)`: Remove attribute
-

CSS properties carry over to SVG natively. 

This means you can use CSS to set SVG node properties by appending a style 
element and editing its content, using `style().content(css)`.

    // Create the root node.
    var paper = Pablo(demoElement).root({height:100}),
        circle = Pablo.circle({stroke: 'red', cx:50, cy:50, r:25});

    // Append a <style> element
    paper.style()
        // Add the CSS rules by setting the text content of the style element
        .content(
            '* {stroke-width:20}' +
            'circle {fill:green}'
        );
    paper.append(circle);


As with HTML, `<style>` elements affect the styling of every other element in the document - but this only extends to the same SVG document, not the containing HTML document).


Hyperlinks
----

SVG elements can be hyperlinked to other resources by embedded them within an `<a>` element, as with HTML.

In the example below `<a>` elements are created and SVG elements are appended 
as children.

    var paper  = Pablo(demoElement).root({height: 130}),
        circle = paper.circle({cx:60, cy:60, r:50, fill:'red'}),
        text   = paper.text({x:220, y:30}).content('we ♥ pablo'),
        link1  = paper.a({
            _link: 'https://github.com/dharmafly',
            target: '_blank'
        }),
        link2  = paper.a({
            _link: 'https://github.com/dharmafly/pablo',
            target: '_blank'
        });

    circle.appendTo(link1);
    text.appendTo(link2);