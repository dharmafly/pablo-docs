--- 
heading: Removing elements
category: reference
---

`.empty()`
----------

Removes all child nodes of each element in the collection, and returns the collection.

In this example, click to empty the SVG root:

    var paper = Pablo(demoElement).root({height:100});

    paper.on('click', function(){
        paper.empty();
    });

    paper.rect({width:100, height:100, fill:'red'});
    paper.circle({cx:200, cy:50, r:50, fill:'purple'});
         

`.remove()`
-----------

Removes all elements in the collection from their parent nodes, and returns the collection.

In this example, click a shape to remove it:

    var paper = Pablo(demoElement).root({height:100});

    paper.rect({width:100, height:100, fill:'blue'});
    paper.circle({cx:200, cy:50, r:50, fill:'orange'});

    paper.children().on('click', function(){
        Pablo(this).remove();
    });