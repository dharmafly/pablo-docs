--- 
category: misc
heading: Changelog
---

## v0.3.4
- Add collection.dataUrl()
- Improve bbox(), toImage() and related methods


## v0.3.3
- Add collection.bbox()
- Add collection.crop()
- Add collection.toImage()
- Add collection.toCanvas()
- Add collection.download()
- Add `Pablo.support` for fine-grained environment capabilities detection
- Expose methods useful for advanced use or plugin writers
- Use native `DOMParser` / `XMLSerializer` under the hood for creation from markup and outputting to markup


## v0.3.2
- Add `Pablo.get()`
- Add `Pablo.load()`
- Add `collection.load()`
- Add `collection.markup()`


## v0.3.1
- Add `Pablo(markup)`
- Add `Pablo.hasSvgNamespace()`


## v0.3
- Rename `.root()` to `.svg()`
- Add traversal methods
- Add CSS selectors and selector functions as optional arguments to traversal methods
- Streamline code


## v0.2
- Move functional API to /extensions/functional.js
- Make DOM elements top-level in a collection, e.g. circle\[0\]
- Add numerous new methods


## v0.1
- Create Pablo
