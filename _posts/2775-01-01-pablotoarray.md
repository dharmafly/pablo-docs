--- 
heading: Pablo.toArray(obj)
category: pablo.toarray
---

Converts the array-like object into a true array.


E.g. a DOM nodeList:

    var nodeList = document.getElementsByTagName('a'),
        array = Pablo.toArray(nodeList);

    alert(array.length);


E.g. function arguments:

    function something(a, b, c, d){
        var args = Pablo.toArray(arguments);

        alert(args.indexOf('tree'));
    }
    something('cat', 'dog', 'tree', 'flower');
