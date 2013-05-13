--- 
category: api
heading: Node Traversal
---

#### [children([selector/fn/element])](/api/children/)

Returns a collection of the collection's children.

#### [parent([selector/fn/element])](/api/parent/)

Returns a collection of the collection's parent.

#### [parents([selector/fn/element])](/api/parents/)

Returns a collection of the collection's ancestors, from closest to furthest.

#### [parentsSvg([selector/fn/element])](/api/parentsSvg/)

Returns a collection of the collection's svg ancestors from closest to furthest.

#### [root([selector/fn/element])](/api/root/)

Returns a collection of the collection element(s) top most &lt;svg&gt; root node.

#### [viewport([selector/fn/element])](/api/viewport/)

Returns a collection of the collection svg element's viewport parent element.

#### [viewports([selector/fn/element])](/api/viewports/)

Returns a collection of the collection svg element's viewport ancestors from 
closest to furthest.

#### [owner([selector/fn/element])](/api/owner/)

Returns a collection of the collection element's closest &lt;svg&gt; ancestor 
element.

#### [owners([selector/fn/element])](/api/owners/)

Returns a collection of the collection element's ancestor &lt;svg&gt; elements 
from closest to furthest.

#### [firstChild([selector/fn/element])](/api/firstChild/)

Returns a collection of the collection's first child.

#### [lastChild([selector/fn/element])](/api/lastChild/)

Returns a collection of the collection's last child.

#### [first()](/api/first/)

Returns a collection of the first element in the collection.

#### [last()](/api/last/)

Returns a collection of the last element in the collection.

#### [siblings([selector/fn/element])](/api/siblings/)

Returns a collection of a the collection's siblings.

#### [nextSiblings([selector/fn/element])](/api/nextSiblings/)

Returns a collection of all the collection's siblings after it in 
the DOM.

#### [prevSiblings([selector/fn/element])](/api/prevSiblings/)

Returns a collection of all the collection's siblings before it in
the DOM.

#### [next([selector/fn/element])](/api/next/)

Returns a collection the next adjacent element to it in the DOM.

#### [prev([selector/fn/element])](/api/prev/)

Returns a collection the pervious adjacent element to it in the 
DOM.

#### [eq(index)](/api/eq/)

Returns a collection of the specified element by the collection index.

#### [get(index) alias elements(index)](/api/get/)

Returns the element by the collection index.

#### [find([selector/fn/element])](/api/find/)

Returns a collection based on the matching argument from within the context of the collection.
