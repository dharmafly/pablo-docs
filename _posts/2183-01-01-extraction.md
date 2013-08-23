--- 
category: api
heading: Extraction
---

These collection methods are used to extract specific elements from the collection. See also [Iteration](/api/#iteration).

## [get(index)](/api/get/)
_alias: collection\[index\]_

Return the raw DOM element specified by array index, e.g. `collection.get(0)`, `collection[3]`.

## [eq(index)](/api/eq/)

Return a collection containing the element specified by its index in the collection, e.g. `collection.eq(3)`, or a distance from the end of the collection, e.g. `collection.eq(-2)`.

## [size()](/api/size/)
_alias: length_

Return the number of elements in the collection.

## [toArray()](/api/toArray/)

Return the collection as a native JavaScript array.

## [first()](/api/first/)
_alias: eq(0)_

Return a collection containing the first element in the collection.

## [last()](/api/last/)
_alias: eq(-1)_

Return a collection containing the last element in the collection.

## [slice(start, \[end\])](/api/slice/)

Slice the elements from the collection, according to the passed indices, and return them wrapped in a new collection.
