--- 
heading: Getting started
category: overview
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

    /* Inside an HTML element, append an <svg> root */
    Pablo(demoElement).svg({height:200})
        /* Create <circle> element, with attributes */
        .circle({cx:90, cy:90, r:90})
        /* Add a click listener */
        .on('click', function(){
            alert('Hello Pablo');
        });

and drawing...

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


[pablo-site]: http://pablojs.com
[api]: http://pablojs.com/api/