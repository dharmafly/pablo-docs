--- 
category: reference
heading: Traversal
---



`.children()`
-

Returns a collection containing the direct child nodes for each element in the collection.

	paper.append('g', {})
		 .append('circle', {});

	paper.children(); // returns collection containing <g> and <circle>

	
`.parent()`
----

Returns a collection containing the previous sibling element of each element in the collection.

	
`.nextSibling()`
----

Returns a collection containing elements that are descendents of elements in the collection and that match the supplied CSS selector or comma-separated list of selectors.