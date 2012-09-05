--- 
heading: Attributes
category: reference
---


`.attr()`
--------

Returns an object containing all the attributes on the first element in the collection.

    var square = Pablo.rect({width: 100, fill: 'red'});
    square.attr(); // returns {width: 100, fill: 'red'}


`.attr(attributeName)`
---------------------

Returns the value of the named attribute on the first element in the collection.

    var square = Pablo.rect({width: 100, fill: 'red'});
    square.attr('fill'); // returns 'red'


`.attr(callback)`
-----------------

*** SEE Attribute functions


`.attr(attributeName, value)`
----------------------------

Sets the named attribute to the specified value, on all elements in the collection and returns the collection.

    var square = Pablo.rect({width: 100, fill: 'red'});
    square.attr('fill', 'blue');


`.attr(attributes)`
------------------

Sets multiple attributes (passed in as an object), on all elements in the collection and returns the collection.

    square.attr({fill:'orange', width:50});


Attribute functions
-------------------

Attribute values may be specified as a function. The function is passed two arguments: the element and its index in the collection. This can be used for varying the attribute value for different elements in a collection:

    var paper = Pablo(demoElement).root({height:220})
        circle = paper.circle({cy:110, fill:'none', stroke:'#777'});

    circle.duplicate(30)
        .attr({
            cx: function(el, i){
                return i * 10 + ((i + 1) * 10);
            },
            r: function(el, i){
                return i * 5 + 10;
            }
        });


`.removeAttr(attributeName)`
---------------------------

Removes an attribute and returns the collection.

    var square = Pablo().rect({width: 100, height: 100, fill: 'red'});

    // Remove the fill attribute
    square.removeAttr('fill');

    Pablo(demoElement).root({height:100}).append(square);


`.addClass(className)`
----------------------

Adds the specified CSS class to all elements in the collection and returns the collection.

	square.addClass('foo');


`.removeClass(className)`
----------------------

Removes the specified CSS class from all elements in the collection and returns the collection.

	square.removeClass('bar');


`.hasClass(className)`
----------------------

Returns boolean `true` or `false` depending on whether or not the first element has the specified CSS class.

	square.hasClass('special');


`.toggleClass(className)`
----------------------

For each element in the collection, add the specified class if it is not present, otherwise remove it.

	square.toggleClass('active');
