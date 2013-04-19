--- 
heading: unshift(elements)
category: unshift
---

Adds the elements to the start of the collection and returns the collection.

    var collection = Pablo(['circle', 'line']);

    collection.unshift(Pablo.path());
    alert(collection[0].nodeName); // 'path'