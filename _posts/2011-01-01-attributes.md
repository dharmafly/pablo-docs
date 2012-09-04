--- 
category: reference
heading: Attributes
---



`.attr()`
--

Returns an object containing all the attributes on the first element in the collection.

    var square = Pablo.rect({width: 100, fill: 'red'});
    square.attr(); // returns {width: 100, fill: 'red'}


`.attr(attributeName)`
--

*** SEE Attribute functions


`.attr(attributeName, value)`
--

Removes an attribute and returns the collection.

    var square = Pablo().rect({width: 100, height: 100, fill: 'red'});

    // Remove the fill attribute
    square.removeAttr('fill');

    Pablo(demoElement).root({height:100}).append(square);


`.addClass(className)`
--

Removes the specified CSS class from all elements in the collection and returns the collection.

	square.removeClass('bar');


`.hasClass(className)`
--

For each element in the collection, add the specified class if it is not present, otherwise remove it.

	square.toggleClass('active');
