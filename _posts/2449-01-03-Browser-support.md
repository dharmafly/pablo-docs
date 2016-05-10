---
category: dataurl
heading: Browser support
path: api/dataurl
---


## SVG data URLs

All modern browsers support SVG data URLs. To confirm, check that `Pablo.support.dataUrl === true`.

    if (Pablo.support.dataUrl){
        // get data URL
    }
    else {
        // fallback
    }


## PNG and JPEG data URLs

Not all browsers support PNG and JPEG data URLs. To confirm, check `Pablo.support.image.png()` and `Pablo.support.image.jpeg()` - see [`Pablo.support`](/api/Pablo.support/). These are both functions that accept a callback, which is passed `true` or `false`. Chrome 32 and Firefox 24 are known to support all the data URL types.

    Pablo.support.image.png(function(support){
        if (support){
            // get data URL
        }
        else {
            // fallback
        }
    });

    Pablo.support.image.jpeg(function(support){
        if (support){
            // get data URL
        }
        else {
            // fallback
        }
    });

