---
category: dataurl
heading: "dataUrl(type, callback)"
path: api/dataurl
---


Returns the data URL that describes the collection as a file of the specified `type`, which can be `"svg"` (the default), `"png"` or `"jpeg"`. The data URL is passed to the callback function.

    var shape = Pablo.circle({r:50});

    shape.dataUrl('svg', function(dataUrl){
        alert(dataUrl);
    });

    shape.dataUrl('png', function(dataUrl){
        alert(dataUrl);
    });

    shape.dataUrl('jpeg', function(dataUrl){
        alert(dataUrl);
    });

