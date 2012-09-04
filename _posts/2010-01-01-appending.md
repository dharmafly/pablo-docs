--- 
category: reference
heading: Appending
---


A number of methods exist to append one collection of elements to the elements in another collection. Each of these methods accepts either one or two arguments, which correspond to the different ways of creating collections with the `Pablo()` method.

The first argument can be an element, an array of elements, a nodeList, a selector, a Pablo collection or a jQuery collection. Or, the first argument can be the name of a new element (e.g. `'circle'`) and the second argument an object that lists the element's attributes (e.g. `{r:50}`).


`.append(element)`


Appends the element to the element(s) in the collection, and returns the collection.

	// A <g> 'group' element
	paper.g()
		// Pass in a single element to be appended
		.append(document.getElementById('foo'))
		// Select an element, or multiple elements
		.append('.bar')
		// A Pablo collection
		.append(Pablo.circle()))
		// A jQuery collection
		.append(jQuery('#example'));


`.append(elementNames, attributes)`
--

The specified `elementNames` and `attributes` are used to create new elements to be appended, for each element in the collection, and the collection is returned.

	// A <g> 'group' element
	paper.g()
		.append('line', {stroke:'black'})
		// Create multiple elements
		.append(['line', 'circle', 'path'], {stroke:red});
		// Returns the <g> element as a collection

The attributes object is optional when an array of element names is passed.


`.appendTo(elements, [attributes])`
--

Same as `.append()` but, with this method, the passed `elements` are inserted into the DOM _as the first child_ of each of the elements in the collection.

	Pablo.g().prepend('circle', {r:50});
	// Returns the <g> element as a collection


`.prependTo(elements, [attributes])`
--

Same as `.append()`, but with this method, the newly appended elements are returned as a Pablo collection.

	Pablo.g().child('circle', {r:50});
	// Returns the <circle> element as a collection


`.before(elements, [attributes])`
--

Same as `.append()` but, with this method, the passed `elements` are inserted into the DOM after each of the elements in the collection.

	Pablo.circle().after('.foo');
	// Returns the <circle> element as a collection