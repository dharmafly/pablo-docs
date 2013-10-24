---
category: overview
heading: Getting started
path: overview
---

Download the <a href="http://pablojs.com/downloads/pablo.js" target="_blank">full script</a> for development or the <a href="http://pablojs.com/downloads/pablo.min.js" target="_blank">minified script</a> for production. Add the script to the page's HTML:

    <script src="pablo.min.js"></script>


## Optional: install with Bower

If you use the [Bower](http://bower.io) package manager, you can install the latest version of Pablo by typing in the terminal:

    bower install pablo


## Start drawing

_Tip: The code snippets with 'Run' buttons are editable._

    /* Check browser support */
    if (Pablo.isSupported){
        /* Inside an HTML element, append an <svg> root */
        Pablo(demoElement).svg({height:180})
            /* Append a <circle> element with attributes */
            .circle({cx:90, cy:90, r:90})
            /* Add an event listener to the circle */
            .on('click', function(event){
                /* On click, set the `fill` attribute */
                Pablo(this).attr('fill', 'red');
            });
    }
    else {
        /* Fallback content */
    }
