---
path: api/transition
heading: Multiple transitions
category: api_transition
---


One way to set mult


/////


    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
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
        dur: [3000, 50],
        timing: ['ease-in', 'ease-out']
    });


/////


    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'red',
            fill: 'blue'
        });

    circle.transition({
        opacity: {
            dur: 3000,
            from: 0,
            to: 1,
            end: function(event){
                alert(event.propertyName + ' done');
            },
            timing: 'ease-in'
        },
        strokeWidth: { // or 'stroke-width'
            dur: 500,
            from: 0,
            to: 50,
            end: function(event){
                alert(event.propertyName + ' done');
            },
            timing: 'ease-in'
        }
    });
