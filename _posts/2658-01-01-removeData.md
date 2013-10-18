---
category: removedata
heading: removeData()
path: api/removedata
---

Removes all data associated with each element in the collection, and returns the collection.

    var shape = Pablo.rect();

    shape.data({
        foo:  'bar',
        fizz: 'bang'
    });

    shape.removeData();

    alert(shape.data('foo'));
    alert(shape.data('fizz'));

