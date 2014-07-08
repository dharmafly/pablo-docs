---
category: overview
heading: Getting started
path: overview
---

Download the <a href="http://pablojs.com/downloads/pablo.js" target="_blank">full script</a> for development or the <a href="http://pablojs.com/downloads/pablo.min.js" target="_blank">minified script</a> for production. Add the script to the page's HTML:

    <script src="pablo.min.js"></script>


## Or, install with Bower

If you use the [Bower](http://bower.io) package manager, you can install the latest version of Pablo by typing in the terminal:

    bower install pablo


## Start drawing

_Tip: In the docs, you can click and edit any code snippets that have 'Run' buttons._

    /* Inside an HTML element, append an <svg> root */
    Pablo(demoElement).svg({height:180})
        /* Append a <circle> element with attributes */
        .circle({cx:90, cy:90, r:90, fill:'red'})
        /* Add an event listener to the circle */
        .on('click', function(event){
            /* On click, set the `fill` attribute */
            Pablo(this).attr('fill', 'green');
        });

External SVG files can be imported and interacted with.

    /* Load an SVG file */
    Pablo(demoElement).load('/rocket.svg', function(rocket){
        /* Find some elements */
        rocket.find('path, rect')
            /* Change their attributes */
            .attr('opacity', 0.2)
            /* Set a stagger function */
            .stagger(function(current, previous){
                Pablo(previous).attr('opacity', 0.2);
                Pablo(current).attr('opacity', 1);
            }, {t:100});

        /* Some time later... */
        window.setTimeout(function(){
            /* Create a transition */
            rocket.transition({
                name: 'transform',
                dur: 1000,
                to: {translateX:'700px'}
            });
        }, 5000);
    });
