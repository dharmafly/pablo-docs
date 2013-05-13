--- 
category: overview
heading: Getting started
---

Download either the <a href="http://pablojs.com/downloads/pablo.js" target="_blank">full script</a> for development or the <a href="http://pablojs.com/downloads/pablo.min.js" target="_blank">minified script</a> for production and reference it in your web page's HTML:

    <script src="pablo.min.js"></script>

Check the browser supports basic SVG:

    if (Pablo.isSupported){
        alert('Yes!');
        /* Pablo code here */
    }
    else {
        alert("Noo");
        /* Fallback content */
    }


Start drawing:
_(Click the 'Run' button)_

    Pablo(demoElement)
        .svg({height:200})
            .circle({cx:100, cy:100, r:100})
            .on('click', function(){
                alert('Hello Pablo');
            });

Or something a bit more adventurous:

    /* Inside an HTML element, append an <svg> root */
    var paper = Pablo(demoElement).svg({height:220}),
        /* Create <circle> element, with attributes */
        circle = paper.circle({
            cy: '50%',
            fill: 'rgba(127, 159, 95, 0.2)',
            stroke: '#777'
        });

    /* Duplicate the element */
    circle.duplicate(20)
        /* Modify attributes */
        .attr({
            /* Attribute functions, called for each element */
            cx: function(el, i) {return i * 4 + 1 + '%'},
            r:  function(el, i) {return i + 1 + '%'}
        })
        /* Add a listener for mouseover & touchstart events */
        .on('mouseover touchstart', function(){
            /* Wrap this element in a Pablo collection */
            var circle = Pablo(this),
                /* Create a random position and colour */
                r = parseInt(circle.attr('r'), 10),
                xMax = 100 - r * 2,
                cx = xMax * Math.random() + r + '%',
                hue = Math.random() * 360,
                color = 'hsla(' + hue + ', 90%, 50%, 0.2)';

            / * Apply new attributes to the <circle> element */
            circle.attr({cx:cx, fill:color});
        });

_(Note: in this documentation, all code snippets with 'Run' buttons are editable, except on mobiles)_.

**See the [API Reference][api] for full details.**


<!-- Testcard demo -->
<div id="testcard" style="margin-top:40px">
    <script>
        // Load testcard script on DOM ready
        if (document.addEventListener){
            document.addEventListener('DOMContentLoaded', function(){
                var script = document.createElement('script');
                document.body.appendChild(script);
                script.src = 'https://raw.github.com/dharmafly/pablo/master/examples/testcard/testcard.js';
            }, false);
        }
    </script>
</div>

[testcard.js][testcard.js]


[pablo-site]: http://pablojs.com
[api]: http://pablojs.com/api/
[issues]: https://github.com/dharmafly/pablo/issues
[changelog]: http://pablojs.com/resources/#changelog
[prem-twitter]: https://twitter.com/premasagar
[docs-folder]: https://github.com/dharmafly/pablo/tree/master/docs
[pull-requests]: https://help.github.com/articles/using-pull-requests
[markdown-syntax]: http://daringfireball.net/projects/markdown/syntax
[testcard.js]: https://github.com/dharmafly/pablo/blob/master/examples/testcard/testcard.js