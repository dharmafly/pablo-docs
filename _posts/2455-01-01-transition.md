---
path: api/transition
heading: transition()
category: api_transition
---

See MDN's guide to [CSS transitions](https://developer.mozilla.org/docs/Web/CSS/transition) for the possibilities.

Get a key-value object of the element's transitions.

    /* Given an element with a CSS transition... */
    var elem = Pablo.rect().transition('opacity 1s, fill 2s');

    // get its transitions
    alert(elem.transition());

