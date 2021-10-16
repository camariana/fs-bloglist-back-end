# Back-end Dev

Notes from FS part 3 to 4 on back-end development

## Node.js and Express

create a folder and name anything you want and create a new template for the project with `npm init`

After doing this, we will have something that look like this

```js
{
  "name": "fs-bloglist-back-end",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/camariana/fs-bloglist-back-end.git"
  },
  "author": "A Camariana",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/camariana/fs-bloglist-back-end/issues"
  },
  "homepage": "https://github.com/camariana/fs-bloglist-back-end#readme"
}
```

The file defines, for instance,

- that the entry point of the application is the *index.js* file.
- the name of the project
- the git repo the project is on (this might not be in your case)
- etc 

Let's make a small change to the *scripts* object:

```js
{
  // ...
  "scripts": {
    "start": "node index.js",    
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

Let's take express into use by defining it as a project dependency with the command:

```shell
npm install express
```

*nodemon will watch the files in the directory in which nodemon was  started, and if any files change, nodemon will automatically restart  your node application*

```shell
npm install --save-dev nodemon
```

define a dedicated *npm script* for it in the *package.json* file:

```json
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",    
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```

