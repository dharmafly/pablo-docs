--- 
heading: Pablo.isHTMLDocument(obj)
category: pablo.ishtmldocument
---

Returns `true` if the passed argument is the html document object; otherwise `false`.

    var doc    = document,
        notDoc = document.body;

    alert(Pablo.isHTMLDocument(doc));
    alert(Pablo.isHTMLDocument(notDoc));
