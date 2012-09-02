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
-

Sets the named attribute to the specified value, on all elements in the collection and returns the collection.

    var square = Pablo.rect({width: 100, fill: 'red'});
    square.attr('fill', 'blue');


`.attr(attributes)`


Sets multiple attributes (passed in as an object), on all elements in the collection and returns the collection.

    square.attr({fill:'orange', width:50});


`.removeAttr(attributeName)`
-

Adds the specified CSS class to all elements in the collection and returns the collection.

	square.addClass('foo');


`.removeClass(className)`
--

Returns boolean `true` or `false` depending on whether or not the first element has the specified CSS class.

	square.hasClass('special');


`.toggleClass(className)`
----

For each element in the collection, add the specified class if it is not present, otherwise remove it.

	square.toggleClass('active');
