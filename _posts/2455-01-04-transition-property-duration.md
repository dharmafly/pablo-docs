---
path: api/transition
heading: "transition(property, duration)"
category: api_transition
---


Creates one or more CSS transitions on each element in the collection. When a transition is set, whenever the named CSS property is modified, the change will take place over the specified duration.

`property` is the name of a CSS property and `duration` is the length of the transition in milliseconds.

In this example, the `stroke-width` CSS property is transitioned. Click the circles to start the transition.

    var container = Pablo(demoElement),
        svg = container.svg({width:'100%', height:160}),
        circles = Pablo.circle().duplicate(2).attr({
            r:  50,
            cx: function(el,i){return i * 140 + 80},
            cy: 80,
            stroke: 'lightblue',
            fill: 'darkblue',
            cursor: 'pointer'
        }).appendTo(svg);

    // Transition any changes to `stroke-width` over 1000ms
    circles.transition('stroke-width', 1000);

    container.on('click', function(){
        // Change the `stroke-width`
        circles.css('stroke-width', 60);

        // Change it back after a delay
        window.setTimeout(function(){
            circles.css('stroke-width', 0);
        }, 750);
    });

    alert('Click me');


## CSS transitions and transforms

`transition()` works well with CSS transforms and the [`transformCss()`](/api/transformCss/) method.

    var container = Pablo(demoElement),
        svg = container.svg({width:'100%', height:260}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'lightblue',
            'stroke-width': 35,
            fill: 'darkblue',
            cursor: 'pointer'
        });

    // Transition the CSS `transform` property, over 1000ms
    circle.transition('transform', 600);

    container.on('click', function(){
        // Set a new CSS transform
        circle.transformCss('translate', ['350px', '100px']);

        // Change it back after a delay
        window.setTimeout(function(){
            circle.transformCss('translate', [0, 0]);
        }, 400);
    });

    alert('Click me');

Working with CSS transitions and transforms is usually a spaghetti mess of vendor-prefixing, but Pablo abstracts this away so that prefixed properties may be passed in unprefixed. So, `transform` can be passed in and Pablo will assign `-webkit-transform`, `-moz-transform` or some other variation, according to the browser.

