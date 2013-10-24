---
category: css
heading: "Autodetection of browser vendor-prefixes"
path: api/css
---


The `css()` method will automatically convert CSS properties into their browser vendor-prefixed version - e.g. from `transition` to `-webkit-transition`.

    var svg = Pablo(demoElement).svg({height:100}),
        square = svg.rect({
            width: 100,
            height: 100,
            fill: 'purple'
        }),
        opacity = 1;

    // Automatically apply vendor-prefixes to `transition`
    square.css('transition', 'opacity 0.5s');

    // Toggle opacity, set attribute & repeat
    function changeOpacity(){
        opacity = opacity ? 0 : 1;
        square.attr('opacity', opacity);
        window.setTimeout(changeOpacity, 500);
    }
    changeOpacity();
