--- 
heading: Pablo Misc
category: api
---

## `Pablo` methods

The global `Pablo` object has a number of methods and properties. In the documentation, these are written as `Pablo.methodName()`, e.g. `Pablo.extend()`.

#### [v](v)

The current version of the Pablo library. E.g. `"1.2.23"`.

#### [isSupported](isSupported)

Returns `true` if Pablo is supported in the current browser.

#### [isArrayLike(obj)](isArrayLike)

Returns true if the passed argument is like a Pablo or jQuery 
collection.

#### [isElement(obj)](isElement)

Returns true if the passed argument is an element.

#### [isSVGElement(obj)](isSVGElement)

Returns true if the passed argument is an svg element.

#### [isNodeList(obj)](isNodeList)

Returns true if the passed argument is a node list.

#### [isHTMLDocument(obj)](isHTMLDocument)

Returns true if the passed argument is a html document.

#### [isPablo(obj)](isPablo)

Returns true if the passed argument is a Pablo collection.

#### [template(name, fn)](template)

Set a new svg shape template on the Pablo object by the passed 
name argument and defined by the function argument.

#### [canBeWrapped(element)](canBeWrapped)

Returns true if the passed argument can be wrapped as a Pablo 
collection.

#### [extend(target, source, [source2...], [deep])](extend)

Returns an extended object from the passed arguments.

#### [make(name)](make)

Returns a native SVG or HTML element based on the passed element name.

#### [hyphensToCamelCase(string)](hyphensToCamelCase)

Returns a string in camel-case form based on the passed hyphen-delimited string.
