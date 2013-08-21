--- 
heading: Collections
category: api
---

When creating elements, or selecting SVG and HTML from the page, Pablo encloses these elements within an [array][array]-like "collection".

Elements are usually manipulated and filtered via the methods on the collection object, although the elements can also be worked with directly.


## Method chaining

Collection methods are generally chainable.

    /* Append an <svg> element to an HTML element */
    var svg = Pablo(demoElement).svg({
        width: 220,
        height: 220
    });

    /* Append a <rect> element to the <svg> */
    svg.rect({width:200, height:100})

        // Transform the <rect>
        .transform('translate', 70)
        .transform('rotate', 45)

        // Change attributes
        .addClass('guernica')
        .attr('fill', 'turquoise')

        // Add events
        .on('click', function(){
            alert('yes');
        });


## Read/write methods

Many methods can either get or set properties on the elements.

    // Set an attribute
    shape.attr('fill', 'orange');

    // Get the attribute
    shape.attr('fill') === 'orange'; // true


[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
