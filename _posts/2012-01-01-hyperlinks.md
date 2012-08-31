--- 
category: reference
heading: Hyperlinks
---


Hyperlinks
----

SVG elements can be hyperlinked to other resources by embedded them within an `<a>` element, as with HTML.

In the example below `<a>` elements are created and SVG elements are appended 
as children.

    var paper  = Pablo(demoElement).root({height: 130}),
        circle = paper.circle({cx:60, cy:60, r:50, fill:'red'}),
        text   = paper.text({x:220, y:30}).content('we ♥ pablo'),
        link1  = paper.a({
            _link: 'https://github.com/dharmafly',
            target: '_blank'
        }),
        link2  = paper.a({
            _link: 'https://github.com/dharmafly/pablo',
            target: '_blank'
        });

    circle.appendTo(link1);
    text.appendTo(link2);