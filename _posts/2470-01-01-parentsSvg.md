--- 
category: parentssvg
heading: parentsSvg(\[filter\])
---

Returns a collection containing the svg parents from closest to oldest for every element in the collection.

    var container = Pablo(document.createElement('div')),
        paper     = Pablo.svg();

    container.append(paper);

    paper.circle().ellipse().rect();

    container.find('rect').parentsSvg().each(function (elem) {
      alert(elem.tagName);
    });


Caution: Creating an element with `Pablo('div', {})` will create an SVG namespaced element named 'div'. This will not be a HTML element.

If you wish to create Pablo wrapped html elements use the following format instead: `Pablo(document.createElement('div'))`. 