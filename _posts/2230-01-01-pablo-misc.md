--- 
heading: Pablo Misc
category: api
---

## `Pablo` methods

The global `Pablo` object has a number of methods and properties. In the documentation, these are written as `Pablo.methodName()`, e.g. `Pablo.extend()`.

#### [v](/api/v/)

The current version of the Pablo library. E.g. `"1.2.23"`.

#### [isSupported](/api/isSupported/)

Returns `true` if Pablo is supported in the current browser.

#### [isArrayLike(obj)](/api/isArrayLike/)

Returns true if the passed argument is like a Pablo or jQuery 
collection.

#### [isElement(obj)](/api/isElement/)

Returns true if the passed argument is an element.

#### [isSVGElement(obj)](/api/isSVGElement/)

Returns true if the passed argument is an svg element.

#### [isNodeList(obj)](/api/isNodeList/)

Returns true if the passed argument is a node list.

#### [isHTMLDocument(obj)](/api/isHTMLDocument/)

Returns true if the passed argument is a html document.

#### [isPablo(obj)](/api/isPablo/)

Returns true if the passed argument is a Pablo collection.

#### [template(name, fn)](/api/template/)

Set a new svg shape template on the Pablo object by the passed 
name argument and defined by the function argument.

#### [canBeWrapped(element)](/api/canBeWrapped/)

Returns true if the passed argument can be wrapped as a Pablo 
collection.

#### [extend(target, source, [source2...], [deep])](/api/extend/)

Returns an extended object from the passed arguments.

#### [make(name)](/api/make/)

Returns a native SVG or HTML element based on the passed element name.

#### [hyphensToCamelCase(string)](/api/hyphensToCamelCase/)

Returns a string in camel-case form based on the passed hyphen-delimited string.