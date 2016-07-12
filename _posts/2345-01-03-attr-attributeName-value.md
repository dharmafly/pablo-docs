---
category: attr
heading: "attr(attributeName, value)"
path: api/attr
---


Sets the named attribute to the specified value, on all elements in the collection and returns the collection.

    var svg = Pablo(demoElement).svg({height:100}),
        rect  = svg.rect({
            width: 200,
            height:100,
            fill: 'purple'
        });

    rect.attr('fill', 'silver');


## Array values

When calling `.attr()` on a collection that contains multiple elements, you can set a different value for each element by passing in an array as the `value`. The first item in the array will be used to set the first element's attribute, the second item will be used for the second element, etc:

    var svg = Pablo(demoElement).svg({height:100}),
        circles = svg.circle({cy:50, r:50}).duplicate(4);

    circles.attr({
        fill: ['red', 'green', 'blue', 'orange', 'purple'],
        cx: [50, 150, 250, 350, 450]
    });


If there are more elements in the collection than items in the array, then when all the array items have been used for elements, the first item will be used again, followed by the second, etc:

    var svg = Pablo(demoElement).svg({height:100}),
        circles = svg.circle({cy:50, r:50}).duplicate(4);

    circles.attr({
        fill: ['red', 'green'], // only 2 items
        cx: [50, 150, 250, 350, 450]
    });


## Function values

Similarly to array values, you can pass in a function that will be called for each element in the collection, allowing you to return the desired attribute value each time. The function will be passed two arguments, the element and its index in the collection, and must return the value for that element's attribute:

    var svg = Pablo(demoElement).svg({height:220}),
        circles = svg.circle({
            cy: 110,
            fill: 'rgba(120,150,90,0.2)',
            stroke:'#777'
        });

    circles.duplicate(20)
           .attr({
               cx: function(el, i) {return i * 20 + 10},
               r:  function(el, i) {return i * 5 + 10}
           });
