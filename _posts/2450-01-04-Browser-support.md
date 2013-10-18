---
category: toimage
heading: Browser support
path: api/toimage
---


## SVG images

All modern browsers support SVG data URLs. To confirm, check that `Pablo.support.svgImage === true`.

    if (Pablo.support.svgImage){
        // create image
    }
    else {
        // fallback
    }


## PNG and JPEG images

Not all browsers support conversion to PNG and JPEG images. To confirm, check `Pablo.support.png()` and `Pablo.support.jpeg()`, both of which are _functions_ that accept a `callback` argument. The callback is passed either `true` or `false`. Chrome 32 and Firefox 24 are known to support all three image types.

    Pablo.support.png(function(support){
        if (support){
            // create image
        }
        else {
            // create image
        }
    });
