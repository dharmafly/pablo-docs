--- 
heading: Traversal
category: reference
---


`.children()`
-------------

Returns a collection containing the direct child nodes for each element in the collection.

	var symbol = Pablo.symbol(),
		children;

	symbol.append('path', {})
		  .append('polyline', {})
		  .append('animate', {});

	children = symbol.children();
	alert(children.length); // 3

	
`.parent()`
-----------

Returns a collection containing the parent node for each element in the collection.

	var symbol = Pablo.symbol(),
  		polyline = symbol.polyline(),
		el = polyline.parent().get(0);

	alert(el.nodeName); // 'symbol'

	
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