---
category: pablo_isdocument
heading: Pablo.isDocument(obj)
path: api/pablo.isdocument
---

Returns `true` if the passed argument is the html document object; otherwise `false`.

    var doc    = document,
        notDoc = document.body;

    alert(Pablo.isDocument(doc));
    alert(Pablo.isDocument(notDoc));
