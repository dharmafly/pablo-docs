---
category: reference
---

Pablo supports chainability for some of its methods.

    var paper = Pablo($output[0]).root({width:300, height:320});

    paper
        ._('circle', {cx:200, cy:150, r:50, fill:'#f33', stroke:'#050'})
        ._('ellipse', {
            cx:200,
            cy:270,
            rx:80,
            ry:40,
            stroke:'#222',
            fill:'#777',
            opacity:0.5,
            // Override `<style>` element above with a `style` attribute
            style:'stroke-width:10'
        })
        ._('polyline', {
            points:'120,100 200,25 280,100',
            stroke:'#444',
            fill:'none',
            // Hyphenated attribute names must be passed as strings
            // since CamelCased attribute names are not (yet) supported
            'stroke-linejoin':'round',
            'stroke-linecap':'round'
        })