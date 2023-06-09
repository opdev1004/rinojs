# Rino.js 🦏

Shallow learning curve, preprocessing, intuitive web framework. It is "rinojs" because the name rhino, rhinojs and rino are being used by others.

## 📢 Notice

### 👍 For people who using version < version 0.7.0 and new people

There are some changes from 0.7.0. Recently I felt some front-end frameworks are removing Javascript support. So I decided to make rino.js can replace those web frameworks.

Version 0.7.0 has made some changes in syntax because I had to decide how we call preprocessing part and non-preprocessing part in the code. So if you have used older version you have to change all the syntax before you update to the new version.

## 💪 The things you can do with Rino.js:

```
1. You can compile .tot files and generate a single page like html, js and css file.
2. It is quite flexible. As it helps you replacing plain text like variables and combining html, js and css.
3. You can crete a component and pass JSON property to manipulate the component.
4. You can pass object data to the pages and componenets.
5. Live web development just like other frontend web frameworks.
6. HTML component system which store html as a variable.
7. Preprocessing events syntax. @click -> onclick
```

If you want to know about .tot file format, you can have a look at [totjs repository](https://github.com/opdev1004/totjs).

## ▶️ Installation

```
npm i rinojs
```

### 🛠 Requirements

My setting is Windows 10, so I cannot test other OS. However, it should work as almost everything is written in Javascript.

However, I recommend using LTS version of Node.js and recent version of OS.

## 😎 Tutorial

### 1. Install rino.js

```
npm i rinojs
```

### 2. Set up src/index.js

```
const Rino = require('rinojs');
const path = require('path');

async function main()
{
    let data = {
        title: 'Test Title',
    }

    let rino = new Rino();

    let args = {
        data: data,
        pageFilename: path.resolve("./page/index.tot"),
        projectDirname: path.resolve(__dirname, "./"),
        distDirname: path.resolve(__dirname, "../dist"),
        filenames: {
            css: "style.css",
            js: "main.js"
        }
    }

    await rino.dev(args);
}

main();
```

### 3. Create index.tot file src/page/index.tot

```
<d:html>
HTML stuff
</d:html>
<d:js>
Javascript stuff
</d:js>
<d:css>
CSS stuff
</d:css>
```

### 4. Preprocessed event syntax

From version 0.7.0, most of '@'event in html is preprocessed. You can still use 'on'event. But we all love shorter version. So current algorithm find tags first then replace. So it won't affect email addresses or other data. Unless somehow you add that syntax within tags...

```
@click -> onclick
@submit -> onsubmit
```

### 5. How to use data that is passed from index.js

- '@data' indicates that it should be preprocessed data.
- title is name of where you stored data in Object that is passed from index.js file.

```
{{ @data.title }}
```

### 6. How to use props that is passed from parent

In parent:

- '@component' indicates that it should be preprocessed component.
- 'somecomponent' is name of component file which is 'somecomponent.tot'.
- './pcomponents' is directory path of where component file is.
- 'someprops' is the name of props you created, which is '<d:someprops>''.

```
<d:html>
some html...
{{ @component.somecomponent, ./pcomponents, someprops }}
some html...
</d:html>
<d:someprops>
    {
        "somedata":"some data.."
    }
</d:someprops>
```

In child:

- '@props' indicates that it is property data
- 'somedata' is the name of data in JSON you created from parent

```
{{ @props.somedata }}
```

### 7. About client side component

This is different type of component. HTML content will be stored as a variable in JS. You can pass props but you cannot create props or load another component because that is too much nesting which is not good for design.

Now this does not have '@'. Because only preprocessed syntax start with '@'.

- 'component' indicates that it is a non-preprocessed component.
- './components' is directory path of where component file is.
- 'componentHTML' is name of variable. So when you want to use the variable it is 'componentHTML' in this case. Don't use same name.
- The last one is props. So you can pass props as well.

```
{{ component.somecomponent, ./components, componentHTML }}
```

### 8. Javascript import and require

In version 0.7.0, you can import and require Javascript files (packages and modules). However you should only import and require from entry .tot file.

- Only use it from starting file. For example: index.tot
- Once loaded it is available from whole scope, every tot file that is connected to entry .tot file

```
import somemodule from "somemodule"
```

### 9. Javascript scope and names

In version 0.7.0, variables and functions that is on global scope (top layer) will be accessible from web browser. Which literally means that there can be replacing same name or causing error if ther are same names. This may change in the future. But I recommend using unique names for your functions and variables.

### 9. Building full website just like Next, Nuxt and others

Since rino.js generates html, css and javascript file this is possible.

- Serve static files from server
- Multiple buildPage() to build each unique page
- For content pages you can use database or some kind of file storage to generate page automatically
- You won't have SEO problem like Vue and React

So you may need to quite a bit of setup but I am pretty sure Nuxt and Next isn't too differnt as you still need to manually setup pages and url.

## 📖 Example:

### ./src/index.js:

index.js for Live development:

- About dev() function:

```
dev()
arguments: args
args: {
    data: `json data for injecting to the html, css and javascript`,
    pageFilename: `File name for the page, strting .tot file.`,
    projectDirname: `Where your project files are. src directory path. This is for checking changes.`
    distDirname: `This is the directory where the output files will be stored.`,
    filenames: {
        html: `filename for html, default is /index.html`,
        css: `filename for css, default is /style.css`,
        js: `filename for js, default is /main.js`
    }
}
```

```
const Rino = require('rinojs');
const path = require('path');

async function test()
{
    let data = {
        title: 'Test Title',
        testid: 'test'
    }

    let rino = new Rino();

    let args = {
        data: data,
        pageFilename: path.resolve("./page/index.tot"),
        projectDirname: path.resolve(__dirname, "./"),
        distDirname: path.resolve(__dirname, "../testdist"),
        filenames: {
            css: "style.css",
            js: "main.js"
        }
    }

    await rino.dev(args);
}

test();
```

or index.js for manual build without live development:

- About buildPage() and writeFiles()

```

buildPage()
arguments: args
args: {
    filename: `File name for the page, strting .tot file path.`,
    data: `json data for injecting to the html, css and javascript`,
}

writeFiles()
arguments:
dirname: `This is the directory where the output files will be stored.`,
obj: {
    html: `html content`,
    css: `css content`,
    js: `js content`
},
filenames: {
    html: `filename for html, default is /index.html`,
    css: `filename for css, default is /style.css`,
    js: `filename for js, default is /main.js`
}
```

```
const Rino = require('rinojs');

async function test()
{
    let rino = new Rino();

    let data = {
        title: 'Test Title',
        testid: 'test'
    }

    let page = await rino.buildPage({"path/to/page/index.tot", data});
    await rino.writeFiles("path/to/dist/directory/dist", page, filenames);
}

test();
```

### ./src/page/index.tot:

```
<d:html>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="test-rollup.js"></script>
        <link rel="stylesheet" href="style.css">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ @data.title }}</title>
    </head>
    <body>
        <div class="test">
            {{ @component.test, ./pcomponents, test }}
        </div>
        <div id="{{ @data.testid }}">
        </div>
        <div>
            it is successfully built and showing the test results!!
        </div>
        <div id="test">asdasdass</div>
        {{ component.comptest, ./components, componentHTML }}
        <button @click="addComponent();">Click me to add innerHTML</button>
        <div id="comptesting"></div>
        <script src="main.js"></script>
    </body>
    </html>
</d:html>
<d:css>
    .test {
        font-size: 48px;
        color: #666;
    }
</d:css>
<d:js>
    import { reqworks } from 'reqtest'
    import { add, minus } from 'add'

    function addComponent()
    {
        document.getElementById('comptesting').innerHTML = document.getElementById('comptesting').innerHTML + componentHTML;
    }

    function test() {
        document.getElementById("{{ @data.testid }}").innerHTML = "^ _ ^";
    }

    test()
    console.log("reqworks: " + reqworks());
    console.log("loaded")
    console.log(add(5, 10));
    console.log(minus(5, 10));
</d:js>
<d:test>
    {
        "a":"a",
        "b":"b",
        "c":"c"
    }
</d:test>
```

### .src/pcomponents/test.tot:

```
<d:html>
    <div>
        TEST {{ @props.b }} !!
        {{ @component.temp, ./pcomponents/test/ }} test!!
    </div>
</d:html>
<d:js>
    console.log("test");
    console.log("{{ @props.a }}");
</d:js>
<d:css>
</d:css>
```

### .src/components/comptest.tot:

```
<d:html>
    <div>
        This is a component test!
        And if it is successful this should be attached to the one of div.
    </div>
</d:html>
<d:js>
console.log("The component is loaded successfully!");
</d:js>
<d:css>
</d:css>
```

etc.

## 💪 Sponsor

[Github sponsor page](https://github.com/sponsors/opdev1004)

## 👨‍💻 Author

[Victor Chanil Park](https://github.com/opdev1004)

## 💯 License

MIT, See [LICENSE](./LICENSE).
