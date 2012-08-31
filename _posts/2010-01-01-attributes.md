--- 
category: reference
heading: Attributes
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
---

    var square = Pablo().rect({width: 100, height: 100, fill: 'red'});

    // Remove the fill attribute (turns out black by default)
    square.removeAttr('fill');

    Pablo(demoElement).root({height:100}).append(square);