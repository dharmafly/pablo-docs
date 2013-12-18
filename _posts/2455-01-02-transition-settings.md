---
path: api/transition
heading: transition(settings)
category: api_transition
---


Other transition properties can be set by passing in an object of settings:

    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'red',
            fill: 'blue'
        });

    circle.transition({
        property: 'stroke-width',
        from: 0,
        to: 30,
        dur: 3000,
        timing: 'ease-out'
    });



