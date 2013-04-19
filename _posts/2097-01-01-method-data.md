--- 
heading: data(key)
category: data
---

The `.data(key)` method will return the associated value to that key on the collection.

    var paper   = Pablo(demoElement).svg({height: 100});
        ellipse = Pablo.circle({id: 'special', cx: 50, cy: 50, r: 50});

    ellipse.data('ying', 'yang').appendTo(paper);

    alert(Pablo('#special').data('ying'));