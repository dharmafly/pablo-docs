---
category: children
heading: children(function)
path: api/children
---


Returns a collection containing the direct child nodes for each element in the collection, filtered by a function.

    var svg = Pablo(demoElement).svg({height: 60});

    svg.append(Pablo.circle({r: 30, cx: 30, cy: 30}))
        .append(Pablo.circle({foo: 'bar', r: 30, cx: 100, cy: 30}));

    setTimeout(function () {
      svg.children(function (item) {
        if (Pablo(item).attr('foo')) {
          return item;
        }
      }).attr('fill', 'red')
    }, 1600);
