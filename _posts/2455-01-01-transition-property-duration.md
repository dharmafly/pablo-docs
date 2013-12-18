---
path: api/transition
heading: "transition(property, duration)"
category: api_transition
---

Creates one or more CSS transitions on each element in the collection.

`property` is the name of a CSS property and `duration` is the duration of the transition in milliseconds.

Click the circle below to transition the CSS:

    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'red',
            fill: 'blue'
        });

    circle.transition('stroke-width', 1000);
          .on('click', function(){
              circle.css('stroke-width', 30);
          });


Vendor-prefixed properties, like `-webkit-transform` can be passed in unprefixed:

    var svg = Pablo(demoElement).svg({width:'100%', height:260}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'red',
            fill: 'blue'
        });

    circle.transition('transform', 1000);
          .on('click', function(){
              circle.css('transform', 'translate(400px 100px)');
          });

