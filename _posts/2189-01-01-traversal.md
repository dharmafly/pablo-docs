--- 
heading: Traversal
category: api
---

These collection methods return elements that have DOM-related associations with the elements in the collection.


## [find(selectors)](/api/find/)

Return a collection containing elements that are descendents of the elements in the original collection and match the given CSS selector or comma-separated list of selectors.


## [children(\[filter\])](/api/children/)

Return a collection containing elements that are children of all the elements in the collection.


## [firstChild(\[filter\])](/api/firstChild/)

Return a collection of the first child element for each element in the collection.


## [lastChild(\[filter\])](/api/lastChild/)

Return a collection of the last child element for each element in the collection.


## [parent(\[filter\])](/api/parent/)

Return a collection containing the parent element of each element in the collection.


## [parents(\[filter\])](/api/parents/)

Return a collection containing all the ancestor elements of each element in the collection.


## [parentsSvg(\[filter\])](/api/parentsSvg/)

Return a collection containing all the ancestor SVG elements of each element in the collection.


## [siblings(\[filter\])](/api/siblings/)

Return a collection containing elements that are siblings in the DOM for each element in the collection.


## [nextSiblings(\[filter\])](/api/nextSiblings/)

Return a collection containing elements that appear _later in the DOM_ for each element in the collection.


## [prevSiblings(\[filter\])](/api/prevSiblings/)

Return a collection containing elements that appear _earlier in the DOM_ for each element in the collection.


## [next(\[filter\])](/api/next/)

Return a collection containing the next sibling element in the DOM for each element in the collection.


## [prev(\[filter\])](/api/prev/)

Return a collection containing the previous sibling element in the DOM for each element in the collection.


## [root(\[filter\])](/api/root/)

Return a collection containing the topmost &lt;svg&gt; ancestor for each element in the collection.


## [owner(\[filter\])](/api/owner/)

Return a collection containing the closest &lt;svg&gt; ancestor for each element in the collection.


## [owners(\[filter\])](/api/owners/)

Return a collection of all the ancestor &lt;svg&gt; elements for each element in the collection.


## [viewport(\[filter\])](/api/viewport/)

Return a collection of all the elements that establish the viewport elements for each element in the collection. This is usually the nearest &lt;svg&gt; ancestor.


## [viewports(\[filter\])](/api/viewports/)

Return a collection of all the viewport ancestors for each element in the collection.
