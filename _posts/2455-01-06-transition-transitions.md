---
path: api/transition
heading: transition(transitions)
category: api_transition
---


Multiple CSS properties can be transitioned at once. Pass in an array of transition objects.

    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'lightblue',
            fill: 'darkblue'
        });

    circle.transition([
        {
            name: 'opacity',
            dur: 2000,
            from: 0,
            to: 1,
            end: function(event){
                alert(event.propertyName + ' done');
            },
            timing: 'ease-in'
        },
        {
            name: 'stroke-width', // or strokeWidth
            dur: 4000,
            from: 0,
            to: 50,
            end: function(event){
                alert(event.propertyName + ' done');
            },
            timing: 'ease-in'
        }
    ]);


Alternatively, a key-value map of transitions can be given, with each property having an array of transition values. It is not possible to set `from`, `to` or `end` with this syntax.

    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
        circle = svg.circle({
            r:  50,
            cx: 80,
            cy: 80,
            stroke: 'lightblue',
            fill: 'darkblue'
        });

    circle.transition({
        opacity: [5000, 'ease-in'],
        'stroke-width': [2000, 'ease-in']
    });

    window.setTimeout(function(){
        circle.css({opacity:0, 'stroke-width':60});
    }, 4);


