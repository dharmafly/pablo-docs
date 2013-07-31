--- 
heading: Keep drawing
category: overview
---

To draw something a bit more ambitious... 

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

<script>
// Toggle show/hide for the previous code example
(function(){
    if ('addEventListener' in document){
        var pElems = document.getElementsByTagName('p'),
            p = pElems[pElems.length - 1];

        document.addEventListener('DOMContentLoaded', function(){
            var jQuery = satya.jQuery,
                control = jQuery('<a>(show)</a>').appendTo(p),
                content = jQuery(p).next().hide(),
                hidden = true;

            control.on('click', function(){
                hidden = !hidden;
                if (hidden){
                    control.text('(show)');
                    content.slideUp();
                }
                else {
                    control.text('(hide)');
                    content.slideDown();
                }
            });
        }, false);
    }
}());
</script>
