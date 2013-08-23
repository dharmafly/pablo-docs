# Pablo API Reference

## Pablo

#### pablo([element/selector], [attributes])

Returns a collection based on the passed argument which can be 
a CSS selector or an element.

## Pablo collection

### Node positioning

#### append(element)

Append the element to the element(s) in the collection and returns 
the collection.

#### prepend(element)

Prepend the element to the element(s) in the collection and returns 
the collection.

#### appendTo(element)

Append the element(s) in the collection to the argument collection and 
returns the collection.

#### prependTo(element)

Prepend the element(s) in the collection to the argument collection and 
returns the collection.

#### after(element)

Inserts the argument elements after each element in the collection and 
returns the collection.

#### before(element)

Inserts the argument elements before each element in the collection and 
returns the collection.

#### insertAfter(element)

Inserts each element in the collection after each argument element(s) and 
returns the collection.

#### insertBefore(element)

Inserts each element in the collection before each argument element(s) and 
returns the collection.

#### remove()

Removes the collection from a parent element as well as removing any 
events and data and returns the collection.

#### detach()

Removes the collection from its parent not removing any events or 
data and returns the collection.

#### empty()

Empties the collection of children and returns the collection.

### Node traversal

#### children([filterBy])

Returns a collection of the collection's children.

#### parent()

Returns a collection of the collection's parent.

#### parents()

Returns a collection of the collection's ancestors, from closest to furthest.

#### parentsSvg()

Returns a collection of the collection's svg ancestors from closest to furthest.

#### root()

Returns a collection of the collection element(s) <svg> 
root node(s).

#### viewport()

Returns a collection of the collection svg element's viewport parent element.

#### viewports()

Returns a collection of the collection svg element's viewport ancestors from 
closest to furthest.

#### owner()

Returns a collection of the collection element's closest <svg> ancestor 
element.

#### owners()

Returns a collection of the collection element's ancestor <svg> elements 
from closest to furthest.

#### firstChild()

Returns a collection of the collection's first child.

#### lastChild()

Returns a collection of the collection's last child.

#### first()

Returns a collection of the first element in the collection.

#### last()

Returns a collection of the last element in the collection.

#### siblings()

Returns a collection of a the collection's siblings.

#### nextSiblings()

Returns a collection of all the collection's siblings after it in 
the DOM.

#### prevSiblings()

Returns a collection of all the collection's siblings before it in
the DOM.

#### next()

Returns a collection the next adjacent element to it in the DOM.

#### prev()

Returns a collection the pervious adjacent element to it in the 
DOM.

#### eq(index)

Returns a collection of the specified element by the collection index.

#### get(index) alias elements(index)

Returns the element by the collection index.

#### find(selector)

Returns a collection based on the matching argument from within the context of the collection.

#### traverse()

TO DO.

### Node properties

#### attr([attribute])

Get or set the attributes of the element(s) within the collection and 
can return the collection.

#### removeAttr(attribute)

Remove the attribute of the element(s) within the collection and 
returns the collection.

#### css([rules])

Get or set the css rules of the element(s) within the collection and 
can return the collection.

#### cssPrefix([rules])

Get or set the css rules of the element(s) with added vendor prefixes 
and can return the collection.

#### addClass(class)

Add a class to the element(s) within the collection and returns the 
collection.

#### removeClass(class)

Remove a class from the element(s) within the collection and returns 
the collection.

#### hasClass(class)

Returns true or false wether or not one of the elements in the collection 
has the argument class.

#### toggleClass(class)

Toggles the argument class on the element(s) in the collection and 
returns the collection.

#### content(string)

Set the inner text content of the element(s) in the collection and 
returns the collection.

### Collection manipulation

#### toArray()

Returns the collection to a JavaScript native array.

#### size()

Returns the length of the collection.

#### push(element) alias add(element)

Add an element to the end of the collection.

#### concat(element)

Returns a new collection with the passed element(s) added to the 
end of it.

#### unshift(element)

Add an element to the start of the collection and returns the collection.

#### pop()

Remove and returns a collection with the last element in the collection.

#### shift()

Remove and returns a collection with the first element in the collection.

#### slice(start, [end])

Returns a new sliced collection based on passed collection indices.

#### reverse()

Reverse the collection and returns the collection.

### Collection iteration

#### each(fn, [context]) alias forEach(fn, [context])

Iterate over the collection and returns the collection.

#### map(fn, [context])

Iterate over the collection creating a new collection composed 
of elements which are returned in the map callback.

#### sort(fn)

Iterates over the collection re-ordering it based on the sort 
callback.

#### pluck(propertyType, [attr])

Returns an array containing property values for the passed type of 
property (eg css, data) property name.

#### select(fn)

Returns a new collection containing the elements for their respected 
callback function returned true.

#### every(fn)

Iterates over the collection and returns true if all test callback 
functions returned true.

### Collection misc

#### clone([cloneDeep])

Returns a copy or deep copy of the collection.

#### duplicate([amount])

Duplicate the first item in the collection increasing the length 
of the collection.

#### some(element/fn, [context]) alias is(element/fn, [context])

Returns true if any of collection elements matched the passed 
argument.

#### indexOf(element)

Returns the collection index of the passed element in the collection.

### Collection data

#### data([data])

#### removeData(data)

### Collection event

#### on(eventName, fn, [useCapture])

#### off(eventName, fn, [useCapture])

#### one(eventName, fn, [useCapture])

#### oneEach(eventName, fn, [useCapture])

#### trigger(eventNames)

### Pablo misc

#### isArrayLike(arg)

Returns true if the passed argument is like a Pablo or jQuery 
collection.

#### isElement(arg)

Returns true if the passed argument is an element.

#### isSVGElement(arg)

Returns true if the passed argument is an svg element.

#### isNodeList(arg)

Returns true if the passed argument is a node list.

#### isHTMLDocument(arg)

Returns true if the passed argument is a html document.

#### isPablo(arg)

Returns true if hte passed argument is a Pablo collection.

#### template(name, fn)

Set a new svg shape template on the Pablo object by the passed 
name argument and defined by the function argument.

#### canBeWrapped(element)

Returns true if the passed argument can be wrapped as a Pablo 
collection.

#### extend(target, source, [source,], [deep])

Returns an extended object from the passed arguments.

#### processList(list)

Returns a new array based on the passed space delimited string which is composed 
of the returned values of the iterator callback.

#### create(name, [attr])

Returns a new collection containing the element based on the arguments.

#### make(name)

Returns a native SVG or HTML element based on the passed element name.

#### hyphensToCamelCase(string)

Returns a string in camel-case form based on the passed hyphen-delimited string.

## SVG shortcuts

Example: `Pablo.circle()`

#### a

Returns a collection containing the a SVG element.

#### altGlyph([attributes])

Returns a collection containing the altGlyph SVG element.

#### altGlyphDef([attributes])

Returns a collection containing the altGlyphDef SVG element.

#### altGlyphItem([attributes])

Returns a collection containing the altGlyphItem SVG element.

#### animate([attributes])

Returns a collection containing the animate SVG element.

#### animateColor([attributes])

Returns a collection containing the animateColor SVG element.

#### animateMotion([attributes])

Returns a collection containing the animateMotion SVG element.

#### animateTransform([attributes])

Returns a collection containing the animateTransform SVG element.

#### circle([attributes])

Returns a collection containing the circle SVG element.

#### clipPath([attributes])

Returns a collection containing the clipPath SVG element.

#### color-profile([attributes])

Returns a collection containing the color-profile SVG element.

#### cursor([attributes])

Returns a collection containing the cursor SVG element.

#### defs([attributes])

Returns a collection containing the defs SVG element.

#### desc([attributes])

Returns a collection containing the desc SVG element.

#### ellipse([attributes])

Returns a collection containing the ellipse SVG element.

#### feBlend([attributes])

Returns a collection containing the feBlend SVG element.

#### feColorMatrix([attributes])

Returns a collection containing the feColorMatrix SVG element.

#### feComponentTransfer([attributes])

Returns a collection containing the feComponentTransfer SVG element.

#### feComposite([attributes])

Returns a collection containing the feComposite SVG element.

#### feConvolveMatrix([attributes])

Returns a collection containing the feConvolveMatrix SVG element.

#### feDiffuseLighting([attributes])

Returns a collection containing the feDiffuseLighting SVG element.

#### feDisplacementMap([attributes])

Returns a collection containing the feDisplacementMap SVG element.

#### feDistantLight([attributes])

Returns a collection containing the feDistantLight SVG element.

#### feFlood([attributes])

Returns a collection containing the feFlood SVG element.

#### feFuncA([attributes])

Returns a collection containing the feFuncA SVG element.

#### feFuncB([attributes])

Returns a collection containing the feFuncB SVG element.

#### feFuncG([attributes])

Returns a collection containing the feFuncG SVG element.

#### feFuncR([attributes])

Returns a collection containing the feFuncR SVG element.

#### feGaussianBlur([attributes])

Returns a collection containing the feGaussianBlur SVG element.

#### feImage([attributes])

Returns a collection containing the feImage SVG element.

#### feMerge([attributes])

Returns a collection containing the feMerge SVG element.

#### feMergeNode([attributes])

Returns a collection containing the feMergeNode SVG element.

#### feMorphology([attributes])

Returns a collection containing the feMorphology SVG element.

#### feOffset([attributes])

Returns a collection containing the feOffset SVG element.

#### fePointLight([attributes])

Returns a collection containing the fePointLight SVG element.

#### feSpecularLighting([attributes])

Returns a collection containing the feSpecularLighting SVG element.

#### feSpotLight([attributes])

Returns a collection containing the feSpotLight SVG element.

#### feTile([attributes])

Returns a collection containing the feTile SVG element.

#### feTurbulence([attributes])

Returns a collection containing the feTurbulence SVG element.

#### filter([attributes])

Returns a collection containing the filter SVG element.

#### font([attributes])

Returns a collection containing the font SVG element.

#### font-face([attributes])

Returns a collection containing the font-face SVG element.

#### font-face-format([attributes])

Returns a collection containing the font-face-format SVG element.

#### font-face-name([attributes])

Returns a collection containing the font-face-name SVG element.

#### font-face-src([attributes])

Returns a collection containing the font-face-src SVG element.

#### font-face-uri([attributes])

Returns a collection containing the font-face-uri SVG element.

#### foreignObject([attributes])

Returns a collection containing the foreignObject SVG element.

#### g([attributes])

Returns a collection containing the g SVG element.

#### glyph([attributes])

Returns a collection containing the glyph SVG element.

#### glyphRef([attributes])

Returns a collection containing the glyphRef SVG element.

#### hkern([attributes])

Returns a collection containing the hkern SVG element.

#### image([attributes])

Returns a collection containing the image SVG element.

#### line([attributes])

Returns a collection containing the line SVG element.

#### linearGradient([attributes])

Returns a collection containing the linearGradient SVG element.

#### marker([attributes])

Returns a collection containing the marker SVG element.

#### mask([attributes])

Returns a collection containing the mask SVG element.

#### metadata([attributes])

Returns a collection containing the metadata SVG element.

#### missing-glyph([attributes])

Returns a collection containing the missing-glyph SVG element.

#### mpath([attributes])

Returns a collection containing the mpath SVG element.

#### path([attributes])

Returns a collection containing the path SVG element.

#### pattern([attributes])

Returns a collection containing the pattern SVG element.

#### polygon([attributes])

Returns a collection containing the polygon SVG element.

#### polyline([attributes])

Returns a collection containing the polyline SVG element.

#### radialGradient([attributes])

Returns a collection containing the radialGradient SVG element.

#### rect([attributes])

Returns a collection containing the rect SVG element.

#### script([attributes])

Returns a collection containing the script SVG element.

#### set([attributes])

Returns a collection containing the set SVG element.

#### stop([attributes])

Returns a collection containing the stop SVG element.

#### style([attributes])

Returns a collection containing the style SVG element.

#### svg([attributes])

Returns a collection containing the svg SVG element.

#### switch([attributes])

Returns a collection containing the switch SVG element.

#### symbol([attributes])

Returns a collection containing the symbol SVG element.

#### text([attributes])

Returns a collection containing the text SVG element.

#### textPath([attributes])

Returns a collection containing the textPath SVG element.

#### title([attributes])

Returns a collection containing the title SVG element.

#### tref([attributes])

Returns a collection containing the tref SVG element.

#### tspan([attributes])

Returns a collection containing the tspan SVG element.

#### use([attributes])

Returns a collection containing the use SVG element.

#### view([attributes])

Returns a collection containing the view SVG element.

#### vkern([attributes])

Returns a collection containing the vkern SVG element.