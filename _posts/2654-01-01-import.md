--- 
category: import
heading: import(url, callback, replace)
---

Loads an external SVG file via an Ajax request and appends it to each element in the collection. An optional `callback` function will be called after this has completed. If the `replace` argument is `true`, the elements will be emptied before the new contents is appended.

The `callback` is passed two arguments: a collection of the new contents and the XMLHttpRequest object used to load it. Within the callback, the `this` object will be the original collection.

    var rocket  = Pablo.g().import('rocket.svg');

    rocket.transform('translate', 200, 500);
