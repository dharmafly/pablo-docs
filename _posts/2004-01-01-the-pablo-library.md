--- 
heading: The Pablo Library
category: reference
---

At its core, Pablo simply allows the creation of SVG elements, and the setting of attributes on those elements. For example, to create a `<circle>` element with its three main attributes:

    Pablo.circle({cx:50, cy:50, r:50});

Actually, Pablo does not _know_ what a circle is, nor does it understand what a circle's attributes are for. It simply creates an element called 'circle' and sets the requested attributes. Pablo stays low-level and because of this, the library can create _anything_ that SVG can create, while staying simple and nimble.

In addition to the creation of elements and setting of attributes, Pablo provides a number of really helpful methods to manipulate, reuse and interact with SVG structures. These methods are described below.

The API reference includes very little general information about SVG, or about specific SVG elements and attributes. To learn about SVG, check out the [Pablo Resources][resources] section.


[resources]: http://pablojs.com/resources/#resources