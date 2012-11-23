--- 
category: overview
heading: Getting started
---

For production, download <a href="https://github.com/downloads/dharmafly/pablo/pablo.min.js" target="_blank">the minified script</a> and call it from your HTML:

    <script src="pablo.min.js"></script>


Check that the browser supports basic SVG:

    if (Pablo.isSupported){
        /* Pablo code here */
        alert('Yes!');
    }
    else {
        /* Alternative content */
        alert("Noo");
    }


Start drawing:

    /* Inside an HTML element, append an <svg> root */
    var paper = Pablo(demoElement).root({height:220}),
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


In this documentation, all code snippets with 'Run' buttons are editable (except on mobiles).

**See the [API Reference][reference] for full details.**

It's early days, so your feedback is welcome. For bug reports and requests, please use the GitHub ['Issues' page][issues] or contact [@premasagar][prem-twitter].

[Pull requests][pull-requests] are welcome. To update the pages on [pablojs.com][pablo-site], the [Markdown][markdown-syntax] files in the [/docs folder][docs-folder] should be changed.


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
[reference]: http://pablojs.com/reference/
[issues]: https://github.com/dharmafly/pablo/issues
[changelog]: http://pablojs.com/details/#changelog
[prem-twitter]: https://twitter.com/premasagar
[docs-folder]: https://github.com/dharmafly/pablo/tree/master/docs
[pull-requests]: https://help.github.com/articles/using-pull-requests
[markdown-syntax]: http://daringfireball.net/projects/markdown/syntax
[testcard.js]: https://github.com/dharmafly/pablo/blob/master/examples/testcard/testcard.js