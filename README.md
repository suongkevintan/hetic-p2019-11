# Fidget Cube Website Project
## hetic-p2019-11

##### Main repository for the front-end developpement project of the third-year HETIC
- Kévin Tan  -- [@FrostOne](https://github.com/FrostOne)
- Corentin Marzin  -- [@CMarzin](https://github.com/CMarzin)
- Michael Zaccardi -- [@Michaelzaccardi](https://github.com/Michaelzaccardi)
- Adrien Zaganelli -- [@adrienZ](https://github.com/adrienZ)
- Emmanuel Naïm -- [@NaiemHapar](https://github.com/NaiemHapar)

>__The [Fidget cube](https://www.kickstarter.com/projects/antsylabs/fidget-cube-a-vinyl-desk-toy) is an unusually addicting, high-quality desk toy designed to help you focus. Fidget at work, in class, and at home in style.__

### Installation

This Projetct requires [Node.js](https://nodejs.org/) v6+ and [Webpack](http://webpack.github.io/docs/) to run .

__1. Get the repository and install the dependencies and devDependencies__

```sh
$ git clone https://github.com/FrostOne/hetic-p2019-11
$ cd hetic-p2019-11
$ git checkout dev
$ npm install -d
```

__2. Get the cube Model and import into the projet__

- Get the cube model [here](https://mega.nz/#!nJUHwCob!GOyKQfDZ_tRwSAk37onWiJnVr3E6OUs6u6OE_Qc-sbU)
- copy it at `./app/src/models3D/model.obj``
```sh
$ gulp importModels
```

__3. Finally, start the server.__

```sh
$ gulp build && gulp dev
```

### Features and Tech stacks:

  - webGL & Three.js
  - Svg & circular slider
  - Sass & ES6
  - Gulp & Webpack
  - Handlebars & Flexbox

### Todos

 - Anchor point on .obj cube
 - Styling cube menu & responsive
 - End Integration
 - Mobile interactions

License
----

MIT
