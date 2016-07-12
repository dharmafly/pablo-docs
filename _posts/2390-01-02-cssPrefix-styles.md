---
category: cssprefix
heading: cssPrefix(styles)
path: api/cssprefix
---


Sets multiple styles (specified as an object), vendor-prefixes them, and applies them on all elements in the collection, and returns the collection.

    square.cssPrefix({
        transform:  'rotate(180deg)',
        'transform-origin': '50%',
        'transition-duration': '1s'
    });