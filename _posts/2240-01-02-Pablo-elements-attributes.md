---
path: api/Pablo
heading: "Pablo(elements, [attributes])"
category: api_pablo
---


Returns a new collection containing the element(s).

`elements` could be a DOM element, another collection, an array of elements, a [DOM node list][nodelist], [jQuery collection][jquery-collection] or other array-like object.

If `attributes` are specified, they are set on each element.

    var element = document.getElementById('foo'),
        collection = Pablo(element, {fill:'red'});


[nodelist]: https://developer.mozilla.org/docs/Web/API/NodeList
[jquery-collection]: http://api.jquery.com/jQuery/