--- 
heading: Build Process
category: overview
---


The build process handles code linting and minification. [Grunt](http://gruntjs.com) is Pablo's build tool so [node](http://nodejs.org) is required.

Installing grunt

    $ npm uninstall -g grunt # for old grunt users
    $ npm install -g grunt-cli

Building

    $ git clone git@github.com:dharmafly/pablo.git
    $ cd pablo/build
    $ npm install
    $ grunt

A copy of `pablo.min.js` will be saved in the `build/dist` directory.

In the future the build process may be used to create custom, module builds of Pablo.
