---
category: download
heading: "download([type], [filename], [callback]])"
path: api/download
---

Converts the collection to an SVG data URL (see [`dataUrl()`](/api/dataUrl/)), creates a file from the data URL and initiates its download to the local filesystem, via the browser.

    Pablo.circle({r:50})
        .download('png', 'circle.png', function(result){
            alert(result.error ? 'Fail' : 'Success');
        });


`type` is the image format: `"svg"` (default), `"png"` or `"jpeg"`

`filename` is the name of the file to be downloaded

`callback` is a function that is called upon successful and failed download attempts. If the callback is passed an error object, then the attempt failed. The callback is called with `this` as its context.

