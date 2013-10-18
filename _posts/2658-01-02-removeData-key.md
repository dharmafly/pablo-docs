---
category: removedata
heading: removeData(key)
path: api/removedata
---


Removes an named key from the data associated with each element in the collection, and returns the collection.

    var shape = Pablo.rect();

    shape.data({
        foo:  'bar',
        fizz: 'bang'
    });

    shape.removeData('foo');

    alert(shape.data('foo'));
    alert(shape.data('fizz'));
