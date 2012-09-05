--- 
category: reference
heading: Selection
---

`Pablo(selector)`: Select elements in the document
--------------------------------------------------

	var lines   = Pablo('line'),
		squares = Pablo('rect.square');


`find()`: Find elements that are contained in a context element
---------------------------------------------------------------

	var text = lines.find('text'),
		foo  = text.find('[data-foo=bar]'');