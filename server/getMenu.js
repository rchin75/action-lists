const fs = require('fs');

/**
 * Gets the menu items.
 * @param req Request.
 * @param res Response.
 * @return {((options?: bodyParser.OptionsJson) => createServer.NextHandleFunction)|Send<ResBody, this>|((url: string, data?: any, success?: (data: any, status: (number | string), xhr: RequestXHR) => void, error?: (xhr: RequestXHR, status: (number | string), message: string) => void) => Promise<RequestResponse>)|[string, string]|(() => any)|(() => Promise<any>)|*}
 */
module.exports.getMenu = function (req,res) {
    const menuFile = process.env.MENU_FILE;
    if (!menuFile || (menuFile === '')) {
        // If no menu file was specified at all we send back an empty menu.
        return res.json({menu:[]});
    }
    if (!fs.existsSync(menuFile)) {
        return res.status(400).json({error: 'Menu file not found.'})
    }

    const contents = fs.readFileSync(menuFile).toString();
    const json = JSON.parse(contents);

    return res.json(json);
}