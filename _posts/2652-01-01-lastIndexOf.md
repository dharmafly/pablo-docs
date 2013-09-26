--- 
category: lastindexof
heading: lastIndexOf(filter, [context])
---

Returns the last index of the element within the collection, or -1 if not found.

Note: A collection will not contain any duplicate items. All items within a collection are unique.

    var shapeA = Pablo.circle(),
        shapeB = Pablo.rect(),
        shapeC = Pablo.ellipse(),
        shapes = Pablo([shapeA, shapeB, shapeC]);

    alert(shapes.lastIndexOf(shapeB)); // 1
