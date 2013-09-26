--- 
heading: Extraction
category: api
---

These collection methods are used to extract specific elements from the collection. See also [Iteration](/api/#iteration).


## [length](/api/length/)

Returns the number of elements in the collection.


## [\[index\]](/api/index/)

Square-bracket array notation to get a DOM element from a collection, e.g. `collection[3]`.


## [eq(index)](/api/eq/)

Returns a collection containing the element specified by the array index, e.g. `collection.eq(3)`. Negative numbers are counted from the end of the collection, e.g. `collection.eq(-2)`.


## [first()](/api/first/)
_alias: `eq(0)`_

Returns a collection containing the first element of the collection.


## [last()](/api/last/)
_alias: `eq(-1)`_

Returns a collection containing the last element of the collection.


## [slice(start, \[end\])](/api/slice/)

Slice the elements from the collection, according to the passed indices, and return them wrapped in a new collection.


## [toArray()](/api/toArray/)

Returns the collection as a native JavaScript array.

