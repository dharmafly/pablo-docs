--- 
category: overview
heading: Getting started
---

For production, download <a href="https://github.com/downloads/dharmafly/pablo/pablo.min.js" target="_blank">the minified script</a> and call it from your HTML:

    <script src="pablo.min.js"></script>

Start drawing:

    /* Check browser support */
    if (Pablo.isSupported){
        /* Inside an HTML element, append an <svg> root */
        var paper = Pablo(demoElement).root({height:160}),
            /* Create <g> group element */
            group = paper.g(),

            /* Append <circle> & <text> elements with attributes */
            circle = group.circle({
                r:74, cx:'50%', cy:'50%',
                stroke:'orange', 'stroke-width':12,
                fill:'green'
            }),
            label = group.text({
                x:'50%', y:'55%', fill:'white',
                'font-size':28, 'text-anchor':'middle'
            }).content('Click');
        
        /* Apply CSS */
        group.css('cursor', 'pointer');
        /* Vendor-prefixed CSS (-webkit-, -moz-, etc) */
        group.cssPrefix('transition-duration', '0.5s');
        circle.cssPrefix('transition-duration', '1s');

        /* Toggle values on click */
        var toggle = true;
        group.on('click', function(){
            var fill, stroke, transform;

            if (toggle){
                fill = 'purple';
                stroke = 'darkred';
                transform = 'scale(0.5)';
            }
            circle.css({fill:fill||null, stroke:stroke||null});
            group.cssPrefix('transform', transform||null);
            toggle = !toggle;
        });
    }

<!-- SVG native animation:
    // Check browser support
    if (Pablo.isSupported){
        // Inside an HTML element, append an <svg> root
        var paper = Pablo(demoElement).root({height:160}),
            // Create <g> element; change mouse cursor on hover
            group = paper.g().css({cursor:'pointer'}),

            // Append <circle> element with attributes
            circle = group.circle({
                r:74, cx:'50%', cy:'50%',
                fill:'green',
                stroke:'orange', 'stroke-width':12
            }),

            // Append <text> element and add content to it
            label = group.text({
                x:'50%', y:'55%', 'text-anchor':'middle',
                'font-size':28, fill:'white'
            }).content('CLICK'),
            scale = 1,

            // Append SVG / SMIL animation element
            anim = group.animateTransform({
                attributeName:'transform',
                type:'scale',
                from:1, to:0.5, dur:'0.68s',
                begin:'indefinite',
                fill:'freeze'
            });

        // Listen for click events
        group.on('click', function(){
            // Start <animateTransform> element's animation
            anim[0].beginElement();
        });
    }
-->


**See the [API Reference][reference].**

The [Changelog][changelog] lists API changes. Please add bug reports and feedback on the GitHub ['Issues' page][issues] or contact [@premasagar][prem-twitter].

[Pull requests][pull-requests] are welcome. To update the pages on [pablojs.com][pablo-site], the markdown files in the [/docs folder][docs-folder] should be changed.


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
[testcard.js]: https://github.com/dharmafly/pablo/blob/master/examples/testcard/testcard.js