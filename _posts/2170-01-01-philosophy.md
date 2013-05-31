--- 
category: api
heading: Philosophy
---

Pablo has an API that will feel familiar to jQuery users. Methods are generally chainable and combine setting and getting in a single function. As with jQuery collections, Pablo's functionality is centred around array-like collections of DOM elements. These elements may be SVG or HTML, although Pablo focusses on SVG.

Collections have have methods for filtering and manipulating the set of elements, similar to arrays and the Underscore library.

Although Pablo is a little forgiving, it is designed for the modern desktop and mobile browser. It doesn't go to the extent that [jQuery](http://jquery.com) and [Raphaël](http://raphaeljs.com) do to work in a different way for old browsers. This approach allows it to support the browser's fullest range of SVG graphics support, while remaining lightweight.

While Pablo takes the lead from these other libraries, it doesn't itself have any JavaScript library dependencies. It is extendable via plugins, but pablo.js itself is sufficient for a wide range of graphics tasks.