'use strict';

//Pablo('.buttons .github.badge').css('opacity', 0);

window._site = {
    browsersupport: function(container){
        if (Pablo.isSupported){
            container = document.getElementById(container.slice(1));
            container.textContent = '✔ Your browser supports Pablo.';
        }
    },
    mindmap: function(container){
        if (Pablo.isSupported){
            container = Pablo(container);
            container.css({margin:'40px 0', height:'270px'});

            var script = document.createElement('script');
            document.body.appendChild(script);
            script.src = '/assets/pablomap.js';
        }
    },

    circles: function(container){
        if (Pablo.isSupported){
            container = Pablo(container);
            //container.css({margin:'20px 0 0'});

            /* Inside an HTML element, append an <svg> root */
            var paper = Pablo(container).svg({height:220, width:'100%'}),
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
            /* Add a listener for mouseover and touchstart events */
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
        }
    },

    testcard: function(container){
        if (Pablo.isSupported){
            container = Pablo(container);
            container.css({margin:'40px 0 0'});
            var script = document.createElement('script');
            document.body.appendChild(script);
            script.src = '/assets/testcard.js';
        }
    },

    launch: function(container){
        if (Pablo.isSupported){
            container = Pablo(container);

            if (!Pablo.support.css.transform || !Pablo.support.css.transition){
                container.parents('section').first().remove();
            }

            else {
                container.css({margin:'20px 0 30px'});

                Pablo(document.createElement('script'), {
                    src: '/assets/launch/index.js'
                }).appendTo(container);
            }
        }
    }
};
