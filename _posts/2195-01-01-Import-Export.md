---
heading: Import / Export
category: api
path: api
---

These collection methods load and save SVG files and convert.


## [load(url, \[callback\], \[replace\])](/api/load/)

Load an external SVG file and append it to each element in the collection.


## [markup(\[asCompleteFile\])](/api/markup/)

Get a string of SVG or HTML markup for all the elements the collection.


## [dataUrl(\[type\], \[callback\])](/api/dataUrl/)

Convert the elements in the collection to a data URL for an SVG, PNG or JPEG image.


## [toImage(\[type\], \[callback\])](/api/toImage/)

Convert the elements in the collection to a single HTML image element, using either SVG, PNG or JPEG formats.


## [toCanvas(\[callback\], \[canvas\])](/api/toCanvas/)

Convert the elements in the collection to an HTML canvas element.


## [withViewPort()](/api/withViewport/)

Attach the elements in the collection to a new `<svg>` element, [cropped](/api/crop/).
