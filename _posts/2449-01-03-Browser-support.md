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

Not all browsers support PNG and JPEG data URLs. To confirm, check `Pablo.support.png()` and `Pablo.support.jpeg()`, both of which are _functions_ that accept a `callback` argument. The callback is passed either `true` or `false`. Chrome 32 and Firefox 24 are known to support all the data URL types.

    Pablo.support.png(function(support){
        if (support){
            // get data URL
        }
        else {
            // fallback
        }
    });

