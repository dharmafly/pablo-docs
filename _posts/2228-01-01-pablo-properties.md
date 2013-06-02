--- 
heading: Pablo properties
category: api
---

#### [Pablo.v](/api/v/)

The current version of the Pablo library. E.g. `"1.2.23"`.

#### [Pablo.isSupported](/api/isSupported/)

Returns `true` if Pablo is supported in the current browser.


<!-- TODO: add sub-pages -->

#### Pablo.vendorPrefixes

An array of vendor-prefixes used by `.cssPrefix()` and `Pablo.cssPrefix()`.



Pablo.Collection`
------------------

The constructor function used internally for creating a new Pablo collection.


`Pablo.svgVersion`
------------------

The version of SVG used internally on SVG root elements. Currently `1.1`.


`Pablo.svgns`
-------------

The SVG namespace URI used internally when creating SVG elements. Currently `"http://www.w3.org/2000/svg"`.


`Pablo.xlinkns`
-------------

The Xlink namespace URI used internally when creating links. Currently `"http://www.w3.org/1999/xlink"`.


`Pablo.v`
---------

The current version of the Pablo library. E.g. `"1.2.23"`.

    alert(Pablo.v);


`.pablo

This property, on a Pablo collection is identical to `Pablo.v`.