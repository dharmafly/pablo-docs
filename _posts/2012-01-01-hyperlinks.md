--- 
heading: Hyperlinks
category: reference
---


`.link(url)`


Creates a link to a resource (via an [xlink:href][xlink-href] attribute).

    paper.a().link('http://example.com');

As with HTML, an SVG element may be linked to a resource by appending the element to an `<a>` (anchor) element.

    var paper  = Pablo(demoElement).root({height: 130}),
        circle = paper.circle({cx:60, cy:60, r:50, fill:'red'}),
        text   = paper.text({x:220, y:30}).content('we ♥ pablo'),
        a1  = paper.a({target: '_blank'}).link('https://github.com/dharmafly),
        a2  = paper.a({target: '_blank'}).link('https://github.com/dharmafly/pablo);

    circle.appendTo(a1);
    text.appendTo(a2);

The method is also use for linking a property on an element to another element in the document, e.g. for an animation path or a background gradient.

For advanced use, see `Pablo.xlinkns`.

[iri]: https://developer.mozilla.org/en-US/docs/SVG/Content_type#IRI
[xlink]: https://developer.mozilla.org/en-US/docs/SVG/Attribute#XLink_attributes
[xlink-href]: https://developer.mozilla.org/en-US/docs/SVG/Attribute/xlink:href