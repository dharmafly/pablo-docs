--- 
category: api
heading: Traversal
---

#### [eq(index)](/api/eq/)

Return the DOM element specified by array index (e.g. `0`, `3`, `-2`), wrapped in a new collection.

#### [get(index)](/api/get/)
_alias: collection[index]_

Return the raw DOM element specified by array index.

#### [find([selector/fn/element])](/api/find/)

Return a collection based on the matching argument from within the context of the collection.

#### [children([selector/fn/element])](/api/children/)

Return a collection of the child elements for each element in the collection.

#### [parent([selector/fn/element])](/api/parent/)

Return a collection of the parent element for each element in the collection.

#### [parents([selector/fn/element])](/api/parents/)

Return a collection of all the ancestor elements for each element in the collection.

#### [parentsSvg([selector/fn/element])](/api/parentsSvg/)

Return a collection of all the ancestor SVG elements for each element in the collection.

#### [firstChild([selector/fn/element])](/api/firstChild/)

Return a collection of the first child element for each element in the collection.

#### [lastChild([selector/fn/element])](/api/lastChild/)

Return a collection of the last child element for each element in the collection.

#### [first()](/api/first/)
_alias: eq(0)_

Return the first element in the collection, wrapped in a new collection.

#### [last()](/api/last/)
_alias: eq(-1)_

Return the last element in the collection, wrapped in a new collection.

#### [siblings([selector/fn/element])](/api/siblings/)

Return elements that are siblings in the DOM for each element in the collection, wrapped in a new collection.

#### [nextSiblings([selector/fn/element])](/api/nextSiblings/)

Return sibling elements that appear _later in the DOM_ for each element in the collection, wrapped in a new collection.

#### [prevSiblings([selector/fn/element])](/api/prevSiblings/)

Return sibling elements that appear _earlier in the DOM_ for each element in the collection, wrapped in a new collection.

#### [next([selector/fn/element])](/api/next/)

Return the next sibling element in the DOM for each element in the collection, wrapped in a new collection.

#### [prev([selector/fn/element])](/api/prev/)

Return the previous sibling element in the DOM for each element in the collection, wrapped in a new collection.

#### [root([selector/fn/element])](/api/root/)

Return a collection of the topmost &lt;svg&gt; ancestor for each element in the collection.

#### [owner([selector/fn/element])](/api/owner/)

Return a collection of the nearest &lt;svg&gt; ancestor for each element in the collection.

#### [owners([selector/fn/element])](/api/owners/)

Return a collection of all the ancestor &lt;svg&gt; elements for each element in the collection.

#### [viewport([selector/fn/element])](/api/viewport/)

Return a collection of the element that establishes the viewport for each element in the collection (usually the nearest &lt;svg&gt; ancestor).

#### [viewports([selector/fn/element])](/api/viewports/)

Return a collection of all the viewport ancestors for each element in the collection.
