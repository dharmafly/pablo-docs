--- 
category: overview
heading: Getting started
---

Download either the <a href="http://pablojs.com/downloads/pablo.js" target="_blank">full script</a> for development or the <a href="http://pablojs.com/downloads/pablo.min.js" target="_blank">minified script</a> for production and reference it in your web page's HTML:

    <script src="pablo.min.js"></script>

Check that the browser supports basic SVG <a id="has-browser-support" href="http://caniuse.com/#search=svg" target="_blank"> </a>:  
_Click the 'Run' button_

    if (Pablo.isSupported){
        alert('Yes!');
        /* Put Pablo-dependent code here */
    }
    else {
        alert("Noo");
        /* Fallback content */
    }

<script>
    if ('addEventListener' in document){
        document.addEventListener('DOMContentLoaded', function(){
            isSupportedText = Pablo.isSupported ? ' (yours does)' : "yours doesn't";
            document.getElementById('has-browser-support').textContent = isSupportedText;
        }, false);
    }
</script>

_Note: in this documentation, all code snippets with 'Run' buttons are editable (except on mobiles)_.

Start drawing:

    /* Inside an HTML element, append an <svg> root */
    Pablo(demoElement).svg({height:200})
        /* Create <circle> element, with attributes */
        .circle({cx:90, cy:90, r:90, fill:'blue'})
        /* Add a click listener */
        .on('click', function(el){
            Pablo(this).attr('fill', 'red');
        });

<div class="showhide">
Something a bit more ambitious... (<span class="showhide-control">show</span>)

<div class="showhide-content">
    
    /* Inside an HTML element, */

</div>
</div>

**See the [API Reference][api] for full details.**

<script>
    (function(){
        jQuery('.showhide').each(function(i, el){
            var container = jQuery(el),
                control = ('.showhide-control', container),
                content = ('.showhide-content', container),
                hidden  = control.text() === 'show';

            if (hidden){
                content.hide();
            }

            control.toggle(function(){
                hidden = !hidden;
                if (hidden){
                    content.hide();
                    control.text('show');
                }
                else {
                    content.show();
                    control.text('hide');
                }
            });
        });
    }());
</script>


[pablo-site]: http://pablojs.com
[api]: http://pablojs.com/api/