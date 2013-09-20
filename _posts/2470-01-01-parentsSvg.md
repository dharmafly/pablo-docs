--- 
category: parentssvg
heading: parentsSvg([filter])
---

Returns a collection containing the SVG parent elements, from closest to oldest, for every element in the collection.

    var container = Pablo(document.createElement('div')),
        paper     = Pablo.svg();

    container.append(paper);

    paper.circle().ellipse().rect();

    container.find('rect').parentsSvg().each(function (elem) {
      alert(elem.tagName);
    });