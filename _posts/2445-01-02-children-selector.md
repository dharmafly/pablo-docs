---
category: children
heading: children(selector)
path: api/children
---


Returns a collection containing the direct child elements for each element in the collection, filtered by a selector.

    var svg = Pablo(demoElement).svg({height: 60});

    svg.append(Pablo.circle({r: 30, cx: 30, cy: 30}))
        .append(Pablo.circle({foo: 'bar', r: 30, cx: 100, cy: 30}));

    setTimeout(function () {
      svg.children('circle[foo=bar]').attr('fill', 'red');
    }, 1600);

