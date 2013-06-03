--- 
category: api
heading: Element reference
---

SVG elements can be created with the shortcut methods listed below. See the [Creation](/api/creation/) section for information on how to use them.

Each method is linked to the element's page on [MDN's element reference][mdn-svg-el]. For further informatio, see [MDN's attribute reference][mdn-svg-attr] and the [Pablo Resources][resources] section.

<ul class="long-list">
	<li>[a()][a]</li>
	<li>[altGlyph()][altGlyph]</li>
	<li>[altGlyphDef()][altGlyphDef]</li>
	<li>[altGlyphItem()][altGlyphItem]</li>
	<li>[animate()][animate]</li>
	<li>[animateColor()][animateColor]</li>
	<li>[animateMotion()][animateMotion]</li>
	<li>[animateTransform()][animateTransform]</li>
	<li>[circle()][circle]</li>
	<li>[clipPath()][clipPath]</li>
	<li>[colorProfile()][color-profile]</li>
	<li>[cursor()][cursor]</li>
	<li>[defs()][defs]</li>
	<li>[desc()][desc]</li>
	<li>[ellipse()][ellipse]</li>
	<li>[feBlend()][feBlend]</li>
	<li>[feColorMatrix()][feColorMatrix]</li>
	<li>[feComponentTransfer()][feComponentTransfer]</li>
	<li>[feComposite()][feComposite]</li>
	<li>[feConvolveMatrix()][feConvolveMatrix]</li>
	<li>[feDiffuseLighting()][feDiffuseLighting]</li>
	<li>[feDisplacementMap()][feDisplacementMap]</li>
	<li>[feDistantLight()][feDistantLight]</li>
	<li>[feFlood()][feFlood]</li>
	<li>[feFuncA()][feFuncA]</li>
	<li>[feFuncB()][feFuncB]</li>
	<li>[feFuncG()][feFuncG]</li>
	<li>[feFuncR()][feFuncR]</li>
	<li>[feGaussianBlur()][feGaussianBlur]</li>
	<li>[feImage()][feImage]</li>
	<li>[feMerge()][feMerge]</li>
	<li>[feMergeNode()][feMergeNode]</li>
	<li>[feMorphology()][feMorphology]</li>
	<li>[feOffset()][feOffset]</li>
	<li>[fePointLight()][fePointLight]</li>
	<li>[feSpecularLighting()][feSpecularLighting]</li>
	<li>[feSpotLight()][feSpotLight]</li>
	<li>[feTile()][feTile]</li>
	<li>[feTurbulence()][feTurbulence]</li>
	<li>[filter()][filter]</li>
	<li>[font()][font]</li>
	<li>[fontFace()][font-face]</li>
	<li>[fontFaceFormat()][font-face-format]</li>
	<li>[fontFaceName()][font-face-name]</li>
	<li>[fontFaceSrc()][font-face-src]</li>
	<li>[fontFaceUri()][font-face-uri]</li>
	<li>[foreignObject()][foreignObject]</li>
	<li>[g()][g]</li>
	<li>[glyph()][glyph]</li>
	<li>[glyphRef()][glyphRef]</li>
	<li>[hkern()][hkern]</li>
	<li>[image()][image]</li>
	<li>[line()][line]</li>
	<li>[linearGradient()][linearGradient]</li>
	<li>[marker()][marker]</li>
	<li>[mask()][mask]</li>
	<li>[metadata()][metadata]</li>
	<li>[missingGlyph()][missing-glyph]</li>
	<li>[mpath()][mpath]</li>
	<li>[path()][path]</li>
	<li>[pattern()][pattern]</li>
	<li>[polygon()][polygon]</li>
	<li>[polyline()][polyline]</li>
	<li>[radialGradient()][radialGradient]</li>
	<li>[rect()][rect]</li>
	<li>[script()][script]</li>
	<li>[set()][set]</li>
	<li>[stop()][stop]</li>
	<li>[style()][style]</li>
	<li>[svg()][svg]</li>
	<li>[switch()][switch]</li>
	<li>[symbol()][symbol]</li>
	<li>[text()][text]</li>
	<li>[textPath()][textPath]</li>
	<li>[title()][title]</li>
	<li>[tref()][tref]</li>
	<li>[tspan()][tspan]</li>
	<li>[use()][use]</li>
	<li>[view()][view]</li>
	<li>[vkern()][vkern]</li>
</ul>


## Note: Creating SVG with markup

Pablo does not (currently) support the creation of SVG elements by passing in a string of SVG markup. It may support this in future.

The reason for its omission is that SVG elements do not have an equivalent property to HTML elements' `innerHTML`. The [innerSVG](http://code.google.com/p/innersvg/) library should work as a polyfill replacement.


[resources]: http://pablojs.com/resources/#resources
[mdn-svg-el]: https://developer.mozilla.org/en/SVG/Element
[mdn-svg-attr]: https://developer.mozilla.org/en/SVG/Attribute

[a]: https://developer.mozilla.org/en-US/docs/SVG/Element/a
[altGlyph]: https://developer.mozilla.org/en-US/docs/SVG/Element/altGlyph
[altGlyphDef]: https://developer.mozilla.org/en-US/docs/SVG/Element/altGlyphDef
[altGlyphItem]: https://developer.mozilla.org/en-US/docs/SVG/Element/altGlyphItem
[animate]: https://developer.mozilla.org/en-US/docs/SVG/Element/animate
[animateColor]: https://developer.mozilla.org/en-US/docs/SVG/Element/animateColor
[animateMotion]: https://developer.mozilla.org/en-US/docs/SVG/Element/animateMotion
[animateTransform]: https://developer.mozilla.org/en-US/docs/SVG/Element/animateTransform
[circle]: https://developer.mozilla.org/en-US/docs/SVG/Element/circle
[clipPath]: https://developer.mozilla.org/en-US/docs/SVG/Element/clipPath
[color-profile]: https://developer.mozilla.org/en-US/docs/SVG/Element/color-profile
[cursor]: https://developer.mozilla.org/en-US/docs/SVG/Element/cursor
[defs]: https://developer.mozilla.org/en-US/docs/SVG/Element/defs
[desc]: https://developer.mozilla.org/en-US/docs/SVG/Element/desc
[ellipse]: https://developer.mozilla.org/en-US/docs/SVG/Element/ellipse
[feBlend]: https://developer.mozilla.org/en-US/docs/SVG/Element/feBlend
[feColorMatrix]: https://developer.mozilla.org/en-US/docs/SVG/Element/feColorMatrix
[feComponentTransfer]: https://developer.mozilla.org/en-US/docs/SVG/Element/feComponentTransfer
[feComposite]: https://developer.mozilla.org/en-US/docs/SVG/Element/feComposite
[feConvolveMatrix]: https://developer.mozilla.org/en-US/docs/SVG/Element/feConvolveMatrix
[feDiffuseLighting]: https://developer.mozilla.org/en-US/docs/SVG/Element/feDiffuseLighting
[feDisplacementMap]: https://developer.mozilla.org/en-US/docs/SVG/Element/feDisplacementMap
[feDistantLight]: https://developer.mozilla.org/en-US/docs/SVG/Element/feDistantLight
[feFlood]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFlood
[feFuncA]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncA
[feFuncB]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncB
[feFuncG]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncG
[feFuncR]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncR
[feGaussianBlur]: https://developer.mozilla.org/en-US/docs/SVG/Element/feGaussianBlur
[feImage]: https://developer.mozilla.org/en-US/docs/SVG/Element/feImage
[feMerge]: https://developer.mozilla.org/en-US/docs/SVG/Element/feMerge
[feMergeNode]: https://developer.mozilla.org/en-US/docs/SVG/Element/feMergeNode
[feMorphology]: https://developer.mozilla.org/en-US/docs/SVG/Element/feMorphology
[feOffset]: https://developer.mozilla.org/en-US/docs/SVG/Element/feOffset
[fePointLight]: https://developer.mozilla.org/en-US/docs/SVG/Element/fePointLight
[feSpecularLighting]: https://developer.mozilla.org/en-US/docs/SVG/Element/feSpecularLighting
[feSpotLight]: https://developer.mozilla.org/en-US/docs/SVG/Element/feSpotLight
[feTile]: https://developer.mozilla.org/en-US/docs/SVG/Element/feTile
[feTurbulence]: https://developer.mozilla.org/en-US/docs/SVG/Element/feTurbulence
[filter]: https://developer.mozilla.org/en-US/docs/SVG/Element/filter
[font]: https://developer.mozilla.org/en-US/docs/SVG/Element/font
[font-face]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face
[font-face-format]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-format
[font-face-name]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-name
[font-face-src]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-src
[font-face-uri]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-uri
[foreignObject]: https://developer.mozilla.org/en-US/docs/SVG/Element/foreignObject
[g]: https://developer.mozilla.org/en-US/docs/SVG/Element/g
[glyph]: https://developer.mozilla.org/en-US/docs/SVG/Element/glyph
[glyphRef]: https://developer.mozilla.org/en-US/docs/SVG/Element/glyphRef
[hkern]: https://developer.mozilla.org/en-US/docs/SVG/Element/hkern
[image]: https://developer.mozilla.org/en-US/docs/SVG/Element/image
[line]: https://developer.mozilla.org/en-US/docs/SVG/Element/line
[linearGradient]: https://developer.mozilla.org/en-US/docs/SVG/Element/linearGradient
[marker]: https://developer.mozilla.org/en-US/docs/SVG/Element/marker
[mask]: https://developer.mozilla.org/en-US/docs/SVG/Element/mask
[metadata]: https://developer.mozilla.org/en-US/docs/SVG/Element/metadata
[missing-glyph]: https://developer.mozilla.org/en-US/docs/SVG/Element/missing-glyph
[mpath]: https://developer.mozilla.org/en-US/docs/SVG/Element/mpath
[path]: https://developer.mozilla.org/en-US/docs/SVG/Element/path
[pattern]: https://developer.mozilla.org/en-US/docs/SVG/Element/pattern
[polygon]: https://developer.mozilla.org/en-US/docs/SVG/Element/polygon
[polyline]: https://developer.mozilla.org/en-US/docs/SVG/Element/polyline
[radialGradient]: https://developer.mozilla.org/en-US/docs/SVG/Element/radialGradient
[rect]: https://developer.mozilla.org/en-US/docs/SVG/Element/rect
[script]: https://developer.mozilla.org/en-US/docs/SVG/Element/script
[set]: https://developer.mozilla.org/en-US/docs/SVG/Element/set
[stop]: https://developer.mozilla.org/en-US/docs/SVG/Element/stop
[style]: https://developer.mozilla.org/en-US/docs/SVG/Element/style
[svg]: https://developer.mozilla.org/en-US/docs/SVG/Element/svg
[switch]: https://developer.mozilla.org/en-US/docs/SVG/Element/switch
[symbol]: https://developer.mozilla.org/en-US/docs/SVG/Element/symbol
[text]: https://developer.mozilla.org/en-US/docs/SVG/Element/text
[textPath]: https://developer.mozilla.org/en-US/docs/SVG/Element/textPath
[title]: https://developer.mozilla.org/en-US/docs/SVG/Element/title
[tref]: https://developer.mozilla.org/en-US/docs/SVG/Element/tref
[tspan]: https://developer.mozilla.org/en-US/docs/SVG/Element/tspan
[use]: https://developer.mozilla.org/en-US/docs/SVG/Element/use
[view]: https://developer.mozilla.org/en-US/docs/SVG/Element/view
[vkern]: https://developer.mozilla.org/en-US/docs/SVG/Element/vkern
