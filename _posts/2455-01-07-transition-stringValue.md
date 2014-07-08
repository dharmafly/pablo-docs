---
path: api/transition
heading: transition(stringValue)
category: api_transition
---


Set one or more transforms as a string, representing the `transform` attribute's value.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100
        });

    rect.css({fill: 'purple', opacity:0.5})
        .transition('opacity 3000, fill 5000');

    window.setTimeout(function(){
        rect.css({fill:'darkblue', opacity:1});
    }, 600);

