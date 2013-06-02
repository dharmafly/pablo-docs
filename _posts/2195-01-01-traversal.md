--- 
heading: Traversal
category: api
---

#### [get(index)](/api/get/)
_alias: collection\[index\]_

Return the raw DOM element specified by array index (e.g. `0`, `3`).

#### [eq(index)](/api/eq/)

Return the DOM element specified by array index (e.g. `0`, `3`, `-2`), wrapped in a new collection.

#### [first()](/api/first/)
_alias: eq(0)_

Return the first element in the collection, wrapped in a new collection.

#### [last()](/api/last/)
_alias: eq(-1)_

Return the last element in the collection, wrapped in a new collection.

#### [find(elements)](/api/find/)

Return a collection based on the matching argument from within the context of the collection.

#### [children(\[filter\])](/api/children/)

Return a collection of the child elements for each element in the collection.

#### [parent(\[filter\])](/api/parent/)

Return a collection of the parent element for each element in the collection.

#### [parents(\[filter\])](/api/parents/)

Return a collection of all the ancestor elements for each element in the collection.

#### [parentsSvg(\[filter\])](/api/parentsSvg/)

Return a collection of all the ancestor SVG elements for each element in the collection.

#### [firstChild(\[filter\])](/api/firstChild/)

Return a collection of the first child element for each element in the collection.

#### [lastChild(\[filter\])](/api/lastChild/)

Return a collection of the last child element for each element in the collection.

#### [siblings(\[filter\])](/api/siblings/)

Return elements that are siblings in the DOM for each element in the collection, wrapped in a new collection.

#### [nextSiblings(\[filter\])](/api/nextSiblings/)

Return sibling elements that appear _later in the DOM_ for each element in the collection, wrapped in a new collection.

#### [prevSiblings(\[filter\])](/api/prevSiblings/)

Return sibling elements that appear _earlier in the DOM_ for each element in the collection, wrapped in a new collection.

#### [next(\[filter\])](/api/next/)

Return the next sibling element in the DOM for each element in the collection, wrapped in a new collection.

#### [prev(\[filter\])](/api/prev/)

Return the previous sibling element in the DOM for each element in the collection, wrapped in a new collection.

#### [root(\[filter\])](/api/root/)

Return a collection of the topmost &lt;svg&gt; ancestor for each element in the collection.

#### [owner(\[filter\])](/api/owner/)

Return a collection of the nearest &lt;svg&gt; ancestor for each element in the collection.

#### [owners(\[filter\])](/api/owners/)

Return a collection of all the ancestor &lt;svg&gt; elements for each element in the collection.

#### [viewport(\[filter\])](/api/viewport/)

Return a collection of the element that establishes the viewport for each element in the collection (usually the nearest &lt;svg&gt; ancestor).

#### [viewports(\[filter\])](/api/viewports/)

Return a collection of all the viewport ancestors for each element in the collection.
