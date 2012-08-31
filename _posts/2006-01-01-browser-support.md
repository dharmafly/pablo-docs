--- 
category: reference
heading: Browser support
---

   
`Pablo.isSupported`: Check browser support


To check if Pablo is able to run in the current browser:

	if (Pablo.isSupported){
        alert('Pablo works!');
    }
    else {
        alert('Not supported!');
    }

When using Pablo, be sure to only execute Pablo-specific code if `Pablo.isSupported` is `true`.

Pablo allows some discrepancies between browsers, but the code is kept lean by targeting only modern desktop and mobile browsers. It requires [basic SVG support][#svg-support], as well as a few [ECMAScript5 features][#ecma5-support]. The browsers that support SVG also tend to support ECMAScript5. Pablo exits gracefully in non-supported browsers.

[#svg-support]: http://caniuse.com/#search=svg
[#ecma5-support]: http://kangax.github.com/es5-compat-table/