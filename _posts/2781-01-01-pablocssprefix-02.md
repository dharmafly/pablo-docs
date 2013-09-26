--- 
heading: Pablo.cssPrefix(property, value)
category: pablo.cssprefix
---

Converts a CSS `property` and `value` to a semi-separated string of vendor-prefixed property-value pairs, as used in CSS style rules.

    var prefixed = Pablo.cssPrefix('border-radius', '10px'),
        cssRule = '.foo {' + prefixed + '}';

    // Create a <style> element and add CSS rules
    Pablo.style()
         .content(cssRule);

    alert(cssRule);
