---
category: transformcss
heading: Value functions
path: api/transformcss
---


`transformCss()` also accepts the `value` as a function, as with [`.attr()`](/api/attr/#attr-attributeName-value) and other methods:

    var svg = Pablo(demoElement).svg({height:210})
        squares = svg.rect({
            x:90, y:110,
            width:80, height:80,
            fill:'rgba(120,30,0,0.3)',
            stroke:'rgba(30,60,90,0.7)'
        }).duplicate(11);
        
    squares.transformCss('rotate', function(el, i){
        // Rotate 30 degrees for each element
        return i * 30 + 'deg';
    });

    // Use a rotation origin of (110, 105)
    squares.css('transform-origin', '110px 105px');

