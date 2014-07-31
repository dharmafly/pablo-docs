---
category: toimage
heading: "toImage(type, callback)"
path: api/toimage
---


As above, but passes the collection containing the `<img>` element to the `callback` function when the image has completed loading. The callback's `this` object will be the original collection.

Note that some browsers will not call the callback unless the returned image has been appended to the document.

