---
path: api/transition
heading: "transition(name, null)"
category: api_transition
---


Remove the named transform on the element.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.css({fill: 'purple', opacity:0.5})
        .transition('opacity 3000, fill 5000');

    rect.transition('opacity', null);

    window.setTimeout(function(){
        rect.css({fill:'darkblue', opacity:1});
    }, 600);
