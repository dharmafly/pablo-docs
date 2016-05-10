---
category: pablo_support
heading: Pablo.support
path: api/pablo.support
---

An object giving information about the browser's support for various features. A value of `true` means the feature is supported, or `false` if not.

    alert('This browser supports:');
    alert(Pablo.support);

    Pablo.support.image.png(function(support){
        alert('PNG image support: ' + support);
    });

    Pablo.support.image.jpeg(function(support){
        alert('JPEG image support: ' + support);
    });


## `pablo.support.basic`

The browser supports basic SVG. This is identical to the output from [`Pablo.isSupported`](/api/Pablo.isSupported/).


## `pablo.support.classList`

The browser supports CSS classLists. These are used by Pablo's [CSS methods](/api/#CSS), but Pablo uses a workaround when they are not natively supported.


## `pablo.support.dataUrl`

The browser supports creating data-uri's from SVG contents. This is required for many of Pablo's [Import/Export methods](/api/#Import-Export).


## `pablo.support.image`

An object of different types of HTML image elements that the browser can generate from live SVG. These features are used by [`toImage()`](/api/toImage/):

### `pablo.support.image.svg`

Boolean. The browser can create HTML images with an SVG mime type.

### `pablo.support.image.png`

A function that accepts a callback, which is passed a boolean. The boolean is `true` if the browser can create HTML images with a PNG mime type.

### `pablo.support.image.jpeg`

A function that accepts a callback, which is passed a boolean. The boolean is `true` if the browser can create HTML images with a JPEG mime type.


## `pablo.support.canvas`

The browser supports creating HTML `<canvas>` elements from live SVG. This feature is used by [`toCanvas()`](/api/toCanvas/).


## `pablo.support.download`

The browser supports initiating a download of an image generated from live SVG. This feature is used by [`download()`](/api/download/).


## `pablo.support.markup`

The browser fully supports the generation of SVG markup from live SVG. This feature is used by [`markup()`](/api/markup/) and [`Pablo(markup)`](/api/Pablo/#Pablo-markup-attributes). Note that some older browsers do not correctly generate markup for namespaced attributes, like [`xlink:href`](https://developer.mozilla.org/docs/Web/SVG/Attribute/xlink:href).


## `pablo.support.css`

An object of CSS feature support:

### `pablo.support.transform`

The browser supports CSS transforms. This feature is used by [`transformCss()`](/api/transformCss).

### `pablo.support.transition`

The browser supports CSS transitions. This feature is used by [`transition()`](/api/transition).
