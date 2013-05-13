--- 
category: lastChild
heading: lastChild([selector/fn/element])
---

Returns a collection of the collection’s last child.

    var paper = Pablo(demoElement).svg({height: 60});

    paper.append(Pablo.circle({r: 30, cx: 30, cy: 30}))
         .append(Pablo.circle({r: 30, cx: 100, cy: 30}))
         .append(Pablo.circle({r: 30, cx: 170, cy: 30}));

    paper.lastChild().attr({'fill':'green'})