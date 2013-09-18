--- 
category: transform
heading: transform(type, value, [value1], [value2])
---

Set a type of transform in the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform" target="_blank">transform attribute</a> of each element in the collection and return the collection. Any number of values can be used, according to needs of the transformation.

    var paper = Pablo(demoElement).svg({height:160}),
        rect  = paper.rect({width:100, height:100, fill:'red'});

    rect.transform('translate', 180, 30)
        .transform('rotate', 45, 50, 50);


The method can also accept the `value` as an array or function, as with [`.attr()`](/api/attr/#attr-03) and other methods:

    var paper = Pablo(demoElement).svg({height:210})
        squares = paper.rect({
            x:90, y:110,
            width:80, height:80,
            fill:'rgba(120,30,0,0.3)',
            stroke:'rgba(30,60,90,0.7)'
        });
        
    squares.duplicate(11)
           .transform('rotate', function(el, i){
               return i * 30 + ' 110 105';
           });