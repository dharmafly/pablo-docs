--- 
category: api
heading: Philosophy
---

Pablo has an API that will feel familiar to [jQuery][jquery] users (although it isn't important to have prior experience with jQuery). Methods are generally chainable and allow both setting and getting within the same function. Pablo's functionality is centred around array-like collections of DOM elements, much like jQuery's collections. These DOM elements can be SVG or HTML, although Pablo focusses on SVG.

Collections have methods for filtering and manipulating the set of elements, similar to [JavaScript arrays][array] and the [Underscore][_] library.

Pablo is designed for the modern desktop and mobile browser. Although it is a little forgiving and it will tell you if the browser [is supported][issupported] or not, it doesn't go to the extent that jQuery and [Raphaël][raphael] do to work around the standards to support older browsers. This approach allows Pablo to support the browser's fullest range of SVG graphics support, while remaining lightweight.

Raphaël, for example, supports old versions of Internet Explorer by falling back to the older vector graphics language, [VML][vml], however, this restricts it to the subset of capabilities that both SVG and VML support and requires extra code. Pablo supports all of SVG and is just a thin wrapper around it.

While Pablo takes the lead from these other libraries, it doesn't itself have any JavaScript library dependencies. It is extendable via plugins, but pablo.js itself is sufficient for a wide range of graphics tasks.

[jquery]: http://jquery.com
[_]: http://underscorejs.org
[raphael]: http://raphaeljs.com
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[issupported]: /api/isSupported/
[vml]: http://msdn.microsoft.com/en-us/library/hh846327(v=vs.85).aspx