---
category: pablo
heading: "Pablo(dataUrl, [attributes])"
path: api/Pablo
---


Converts a data URL for an SVG file into a collection of elements.

    var dataUrl = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3L…wvcmVjdD48Y2lyY2xlIGN4PSIxNTAiIGN5PSI0MCIgcj0iMzAiPjwvY2lyY2xlPjwvc3ZnPg==';

    Pablo(dataUrl).appendTo(demoElement);

If `attributes` are specified, they are applied to the collection.

See also the collection method, [`dataUrl()`](/api/dataUrl/).


[push]: /api/push/
[collection-manipulation]: /api/#collection-manipulation
[nodelist]: https://developer.mozilla.org/docs/Web/API/NodeList
[jquery-collection]: http://api.jquery.com/jQuery/
[qsa]: https://developer.mozilla.org/docs/DOM/Element.querySelectorAll
[find]: /api/find/
