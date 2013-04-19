--- 
heading: reverse()
category: reverse
---

Reverses the order of the collection and returns the collection.

    var paper  = Pablo(demoElement).svg({height: 100}),
        sizes  = [50, 30, 10];

    Pablo([
         Pablo.circle({cx:50, cy:50, fill: 'cyan'}),
         Pablo.circle({cx:50, cy:50, fill: 'black'}),
         Pablo.circle({cx:50, cy:50, fill: 'red'})
       ])
      .reverse() // Remove reverse to see the new order
      .each(function (item, i) {
        Pablo(item).attr('r', sizes[i]);
        paper.append(item);
      });