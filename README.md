# Love What Survives

Find Github pages for mini-site [here](https://github.com/ntslive/love-what-survives) and here.

Created by [NTS Radio](http://www.nts.live).

## Setup

You will need [Node.js](https://nodejs.org/en/) and [Sass](http://sass-lang.com/install) installed.

Install the package dependencies: `npm install`.

Copy the pre-commit Git hook, to ensure the assets are compiled before you commit.

```bash
cp pre-commit .git/hooks/.
```

## Build

Using Sass and React, which Grunt will compile via tasks 'production' or 'development', that latter of which will continuously run and watch files.

```bash
grunt production
```
