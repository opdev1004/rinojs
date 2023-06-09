const path = require('path');
const Tot = require('totjs');
const { buildSingleData } = require('./data-handler');
const { buildSingleProps } = require('./props');
const { replaceEvents } = require('./syntax-handler');

async function buildComponent(args)
{
    try
    {
        const tot = new Tot(path.join(args.dirname, `/${ args.name }.tot`));

        let html = await tot.getDataByName("html");
        let css = await tot.getDataByName("css");
        let js = await tot.getDataByName("js");

        if (!html) throw new Error("Need html to build a component");
        if (!js) js = "";
        if (!css) css = "";

        html = await replaceEvents(await buildSingleProps(await buildSingleData(html, args.data), args.props));
        css = await buildSingleProps(await buildSingleData(css, args.data), args.props);
        js = await buildSingleProps(await buildSingleData(js, args.data), args.props);

        html = "var " + args.htmlName + " = `" + html.replaceAll("`", "\`") + "`;\n" + args.htmlName + ";\n";
        js = html + js;

        return { js: js, css: css };
    }
    catch (error)
    {
        console.error(error);
    }
}

module.exports = { buildComponent }