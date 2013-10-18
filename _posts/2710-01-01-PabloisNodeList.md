---
category: pablo_isnodelist
heading: Pablo.isNodeList(obj)
path: api/pablo.isnodelist
---

Returns boolean `true` if the object is DOM NodeList - e.g. the result of a selector query or child nodes of an element; otherwise `false`.

    var el = Pablo.g()[0];
    alert(Pablo.isNodeList(el.childNodes)); // true
