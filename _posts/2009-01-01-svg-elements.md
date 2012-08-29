--- 
heading: Creating SVG elements
category: reference
---


SVG elements


Pablo allows _any_ SVG element to be created and manipulated (even though it has very little knowledge about specific elements and their attributes). [MDN's SVG element reference][#mdn-svg-el] is an invaluable resource for researching each element.

[#mdn-svg-el]: https://developer.mozilla.org/en/SVG/Element


Creating elements
--

Create an SVG element with one of the supported 'element methods':

    Pablo.circle();


Create an element, with attributes:

    var circle = Pablo.circle({cx:100, cy:100, r:50});


These SVG elements are supported and have a corresponding element method:

    a, altGlyph, altGlyphDef, altGlyphItem, animate, animateColor, animateMotion, animateTransform, circle, clipPath, color-profile, cursor, defs, desc, ellipse, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, filter, font, font-face, font-face-format, font-face-name, font-face-src, font-face-uri, foreignObject, g, glyph, glyphRef, hkern, image, line, linearGradient, marker, mask, metadata, missing-glyph, mpath, path, pattern, polygon, polyline, radialGradient, rect, script, set, stop, style, svg, switch, symbol, text, textPath, title, tref, tspan, use, view, vkern


Create an element as a child of an existing element:

    paper.circle();
    paper.circle({cx:100, cy:100, r:50});


Attach an element to the SVG root or another element
----

    paper.append(circle);
    paper.append('rect', {width:50});
    // returns paper

    circle.appendTo(paper);
    // returns circle

    paper.child('rect', {width:50});
    // returns rect
    

Hyphen-ated element names get camelCased
----

For any element whose names contains a hyphen '-', their corresponding method name will be a camel-cased version of the element name. E.g. to create a `<font-face-src>` element, use the `fontFaceSrc()` method.


camelCase method names
----

The method names for element names that contain a hyphen '-' are camel-case versions of the element name. E.g. to create a `<font-face-src>` element, use the `fontFaceSrc()` method.


Example
-

    var paper = Pablo(demoElement).root({width:40, height:40});

    paper
        .append('line', {x1:10, y1:5, x2:40, y2:40, stroke:'purple'})

Here is an example creating a nested SVG structure.

    var paper = Pablo(demoElement).root({width:200, height:40}),
        group = Pablo('g', {fill: 'red'}),
        rect1 = Pablo('rect', {x: 10, y:10, height:50, width:50}),
        rect2 = Pablo('rect', {x: 80, y:10, height:50, width:50});

    group.append(rect1)
         .append(rect2);

    paper.append(group);