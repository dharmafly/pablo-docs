--- 
heading: removeData(key)
category: removedata
---

Remove data on a pablo collection via its key.

    var rect = Pablo.rect();

    rect.data('foo', 'bar');
    alert(rect.data('foo'));
    rect.removeData('foo');
    alert(rect.data('foo'));
