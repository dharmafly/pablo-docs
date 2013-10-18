---
category: pablo_extend
heading: "Pablo.extend(target, source)"
path: api/pablo.extend
---

Copies properties from the `source` object to the `target` object and returns the target.

    var obj = Pablo.extend({foo:1}, {bar:2});
    alert(JSON.stringify(obj)); // {"foo":1,"bar":2}

