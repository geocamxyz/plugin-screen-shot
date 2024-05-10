# Screen Shot
A web component plugin for the [geocamxyz/geocam-viewer](https://github.com/geocamxyz/geocam-viewer) which adds a button the viewer which will copy the current view to the clipboad (only works when the viewer is served over and https connection)
### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-screen-shot/src?v2.0.3'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-screen-shotsrc?29be18f'
```
### Import Map (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-screen-shot@v2.0.3/dist/screen-shot.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-screen-shot@29be18f/dist/screen-shote.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
 <script type="module" src="https://cdn.jsdelivr.net/gh/geocamxyz/plugin-screen-shot@v2.0.3/dist/compass-needle.js"></script>
 ```

 Or with an importmap
 ```
<script type="importmap">
  {
    "imports": {
      "screen-shot": "https://cdn.jsdelivr.net/gh/geocamxyz/plugin-screen-shot@v2.0.3/dist/compass-needle.js"
    }
  }
</script>
```
The plugin can then be imported via a module script or using the npm package and using the below import statement.
```
import "screen-shot"
```
### Setup:
The plugin can then be added to the viewer by making the custom element a child of the viewer parent element.  

```
<geocam-viewer>
  <geocam-viewerscreen-shot></geocam-viewerscreen-shot>
</geocam-viewer>
```

There are no attribute settings.