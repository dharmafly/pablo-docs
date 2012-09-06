--- 
category: reference
heading: Attributes
---


`.attr()`
--------

Returns an object listing all the attributes from the first element in the collection.

    var paper = Pablo(demoElement).root({height:100}),
        rect  = paper.rect({
            width: 200,
            height:100,
            fill: 'gold'
        }),
        attributes = rect.attr();

    alert(JSON.stringify(attributes));
    // {width:200, height:100, fill:'gold'}


`.attr(attributeName)`
---------------------

Returns the value of the named attribute on the first element in the collection.

    var paper = Pablo(demoElement).root({height:100}),
        rect  = paper.rect({
            width: 200,
            height:100,
            fill: 'gold'
        }),
        value = rect.attr('fill');

    alert(value); // 'gold'


`.attr(attributeName, value)`
----------------------------

Sets the named attribute to the specified value, on all elements in the collection and returns the collection.

    var paper = Pablo(demoElement).root({height:100}),
        rect  = paper.rect({
            width: 200,
            height:100,
            fill: 'gold'
        });

    rect.attr('fill', 'silver');


`.attr(attributes)`
------------------

Sets multiple attributes (supplied as an object), on all elements in the collection and returns the collection.

    var paper = Pablo(demoElement).root({height:100}),
        rect  = paper.rect();

    rect.attr({
        width: 200,
        height:100,
        fill: 'orange'
    });


Attribute value functions
-------------------------

Attribute values may alternatively be supplied as a callback function. The callback is passed two arguments: the element and its index in the collection. This can be used for varying the attribute value for successive elements in a collection:

    var paper = Pablo(demoElement).root({height:220}),
        circle = paper.circle({
            cy:110,
            fill:'rgba(120,150,90,0.2)',
            stroke:'#777'
        });

    circle.duplicate(20)
          .attr({
              cx: function(el, i){
                  return i * 10 + ((i + 1) * 10);
              },
              r: function(el, i){
                  return i * 5 + 10;
              }
          });


Attribute value arrays
----------------------

Attribute values may alternatively be supplied as an array. For each element in the collection, the element's index in the collection is used to pluck a value from the array:

    var paper  = Pablo(demoElement).root({height:100}),
        circle = paper.circle({cy:50, r:50}),
        colors = ['red', 'green', 'blue', 'yellow', 'purple'],
        cx     = [50, 150, 250, 350, 450];

    circle.duplicate(5)
          .attr({fill:colors, cx:cx});


`.removeAttr(attributeName)`
---------------------------

Removes an attribute and returns the collection.

    var paper = Pablo(demoElement).root({height:100}),
        rect  = paper.rect({
            width: 200,
            height:100,
            fill: 'gold'
        });

    rect.removeAttr('fill');
    // the default fill is black


`.addClass(className)`
----------------------

Adds the specified CSS class to all elements in the collection and returns the collection.

	var rect = Pablo.rect();

    rect.addClass('ringo');
    alert(rect.attr('class')); // 'ringo'


`.removeClass(className)`
----------------------

Removes the specified CSS class from all elements in the collection and returns the collection.

	var rect = Pablo.rect({'class': 'john paul george stimpy ringo'});
        
    rect.removeClass('stimpy');
    alert(rect.attr('class')); // 'john paul george ringo'


`.hasClass(className)`
----------------------

Returns boolean `true` or `false` depending on whether or not the first element has the specified CSS class.

	var rect = Pablo.rect({'class': 'john paul george ringo'});
    alert(rect.hasClass('george')); // true


`.toggleClass(className)`
----------------------

For each element in the collection, add the specified class if it is not present, otherwise remove it.

	var rect = Pablo.rect({'class': 'john paul george ringo'});
    rect.toggleClass('george');
    alert(rect.hasClass('george')); // false
