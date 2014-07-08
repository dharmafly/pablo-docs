---
category: overview
heading: Browser support
path: overview
---


<span id="has-browser-support"></span>

Pablo and SVG is <a href="http://caniuse.com/#search=svg" target="_blank">supported in all modern browsers</a>, including Internet Explorer 9 and mobile web browsers. IE9 does not support some SVG features, like animation.

To test if a particular browser or device is supported by Pablo, <a href="/tests/" target="_blank">run the test suite</a> on the device. [Read more](/misc/#tests) about the test suite and detecting support at runtime.

<script>
    document.addEventListener('DOMContentLoaded', function(){
        _site.browsersupport('#has-browser-support');
    }, false);
</script>

