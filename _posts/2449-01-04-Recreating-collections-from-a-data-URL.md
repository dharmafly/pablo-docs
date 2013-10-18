---
category: dataurl
heading: Recreating collections from a data URL
path: api/dataurl
---


You can pass an SVG data URL directly to the `Pablo()` method to recreate the collection. For example, the data URL might have been previously saved in the browser's local storage or on the server:

    var shape = Pablo.circle({r:50}),
        dataUrl = shape.dataUrl();

    // Later...
    Pablo(dataUrl).appendTo(demoElement);
