---
path: api/transition
heading: transition(name)
category: api_transition
---


Get an array of values for the named transition.

    /* Given an element with a CSS transition... */
    var elem = Pablo.rect().transition('opacity 1s, fill 2s');
    
    // Get a named transition
    alert(elem.transition('fill'));

