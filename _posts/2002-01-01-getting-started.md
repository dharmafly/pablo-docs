--- 
category: overview
heading: Getting started
---

For production, download <a href="https://github.com/downloads/dharmafly/pablo/pablo.min.js" target="_blank">the minified script</a> and call it from your HTML:

    <script src="pablo.min.js"></script>

Start drawing:

    // Check browser support
    if (Pablo.isSupported){
        // Inside an HTML element, append an <svg> root
        var paper = Pablo(demoElement).root({height:160}),
            // Append SVG elements, specifying their attributes
            circle = paper.circle({
                r:80, cx:80, cy:80,
                fill:'orange'
            }),
            // SVG / SMIL animations
            anim = circle.animateTransform({
                id: 'anim1',
                attributeName:'transform',
                type:'scale',
                from: 1,
                to:0.5,
                dur:'1s',
                begin:'indefinite',
                fill:'freeze'
            });

        // On a particular DOM event
        circle.on('click touchstart', function(){
            // Start native SVG animation
            anim[0].beginElement();
        });
    }

Pablo can do anything that SVG can do, in a simple, expressive way.  
**See the [API Reference][reference]** to discover Pablo's extensive API.

The [Changelog][changelog] lists API changes. Please add bug reports and feedback on the GitHub ['Issues' page][issues] or contact [@premasagar][prem-twitter].

[Pull requests][pull-requests] are welcome for any part of the code. To update the pages on [pablojs.com][pablo-site], the markdown files in the [/docs folder][docs-folder] should be changed.


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