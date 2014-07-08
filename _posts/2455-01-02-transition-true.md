---
path: api/transition
heading: transition(true)
category: api_transition
---


As above, but returns an array of transform objects.

    /* Given an element with a CSS transition... */
    var elem = Pablo.rect().transition('opacity 1s, fill 2s');
    
    // get its transitions
    alert(elem.transition(true));

