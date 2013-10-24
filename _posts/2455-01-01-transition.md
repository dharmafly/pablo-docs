---
heading: transition
category: api
path: api
---


    var svg = Pablo(demoElement).svg(),
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


/////


    var svg = Pablo(demoElement).svg(),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'red',
            fill: 'blue'
        });

    circle.transition({
        property: ['opacity', 'stroke-width'],
        from: 0,
        to: [1, 30],
        dur: [2000, 3000],
        timing: ['ease-in', 'ease-out']
    });


/////


    var svg = Pablo(demoElement).svg(),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'red',
            fill: 'blue'
        });

    circle.transition({
        opacity: {
            from: 0,
            to: 1,
            dur: 2000,
            timing: 'ease-in'
        },
        strokeWidth: { // or 'stroke-width'
            from: 0,
            to:50,
            dur: 3000,
            timing: 'ease-out'
        }
    });
