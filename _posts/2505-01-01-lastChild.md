---
category: lastchild
heading: "lastChild([filter])"
path: api/lastchild
---

Returns a collection of the collection’s last child element.

    var svg = Pablo(demoElement).svg({height: 60});

    svg.append(Pablo.circle({r: 30, cx: 30, cy: 30}))
        .append(Pablo.circle({r: 30, cx: 100, cy: 30}))
        .append(Pablo.circle({r: 30, cx: 170, cy: 30}));

    svg.lastChild().attr({'fill':'green'})
