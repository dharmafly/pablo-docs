--- 
category: reference
heading: Appending
---


A number of methods can be used to append one element to another. Each of the methods accepts either one or two arguments, just as when `Pablo()` is used to create a collection.

The first argument can be an element, an array of elements, a nodeList, a selector, a Pablo collection or a jQuery collection. Alternatively, a new element will be created if the first argument is the element's name and the second argument is an object representing the element's attributes.


`.append(element, [attributes])`
--

Appends the element (or list of elements) to each element in the collection, and returns the collection.

	paper.g()
		.append('.foo')
		.append('line', {stroke:'black'})
		.append(document.getElementById('bar'));


`.appendTo(element, [attributes])`
--

Same as `.append()` but this method inserts the passed element(s) into the DOM _as the first child_ of each of the elements in the collection.

	paper.prepend('circle', {});


`.prependTo(element, [attributes])`
--

Same as `.append()` but this method returns the _child_ element(s) as a Pablo collection.

	Pablo.g().child('circle', {r:50});


`.before(element, [attributes])`
--

Same as `.append()` but this method inserts the passed element(s) into the DOM _after_ each of the elements in the collection.

	Pablo.circle().after('.foo');