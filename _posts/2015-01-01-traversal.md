--- 
heading: Traversal
category: reference
---


`.children()`
-------------

Returns a collection containing the direct child nodes for each element in the collection.

	paper.append('g', {})
		 .append('circle', {});

	paper.children(); // returns collection containing <g> and <circle>

	
`.parent()`
-----------

Returns a collection containing the parent node for each element in the collection.

	Pablo.g().circle().parent(); // returns collection containing <g>

	
`.siblings()`
-------------

Returns a collection containing elements that have the same parent as elements in the collection.

	
`.prevSibling()`
----------------

Returns a collection containing the previous sibling element of each element in the collection.

	
`.nextSibling()`
----------------

Returns a collection containing the next sibling element of each element in the collection.

	
`.find(selectors)`
------------------

Returns a collection containing elements that are descendents of elements in the collection and that match the supplied CSS selector or comma-separated list of selectors.