--- 
category: overview
heading: Getting started
---

Download either the <a href="http://pablojs.com/downloads/pablo.js" target="_blank">full script</a> for development or the <a href="http://pablojs.com/downloads/pablo.min.js" target="_blank">minified script</a> for production and reference it in your web page's HTML:

    <script src="pablo.min.js"></script>

Check the browser supports SVG <a id="has-browser-support" href="http://caniuse.com/#search=svg" target="_blank"> </a> and start drawing:

<script>
    if ('addEventListener' in document){
        document.addEventListener('DOMContentLoaded', function(){
            isSupportedText = Pablo.isSupported ? ' (yours does)' : " (yours doesn't)";
            document.getElementById('has-browser-support').textContent = isSupportedText;
        }, false);
    }
</script>

    /* Check browser support */
    if (Pablo.isSupported){
        /* Inside an HTML element, append <svg> root */
        Pablo(demoElement).svg({height:180})
            /* Append <circle> element with attributes */
            .circle({cx:90, cy:90, r:90})
            /* Add event listener to the circle */
            .on('click', function(event){
                /* On click, set the `fill` attribute */
                Pablo(this).attr('fill', 'red');
            });
    }
    else {
        /* Add non-SVG fallback content */
    }

_Note: in this documentation, all code snippets with 'Run' buttons are editable, except on mobiles_.
