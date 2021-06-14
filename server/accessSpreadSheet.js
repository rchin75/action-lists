const Excel = require('exceljs');
const fs = require('fs');
const path = require('path');

/**
 * Reads a spreadsheet file and responds with a JSON of the contents.
 * @param req Request.
 * @param res Response.
 * @return {Promise<void>}
 */
module.exports.readFile = async function(req, res) {
    const f = req.query.filename;

    // The JSON file with the configuration.
    // If no menu file was specified then we use the CONFIG_FILE. Otherwise we use MENU_FILE.
    let configFile = process.env.CONFIG_FILE;
    const menuFile = process.env.MENU_FILE;
    if (menuFile && f && f.length > 0 && (f.indexOf('/') === -1) && (f.split('.').pop() === 'json')) {
        configFile = path.join( path.dirname(menuFile) ,  f);
    }

    // Read the config file.
    let config = null;
    if (configFile && fs.existsSync(configFile)) {
        const contents = fs.readFileSync(configFile).toString();
        config = JSON.parse(contents);
    } else {
        console.log('Config file not found.', configFile);
        return res.status(400).json({error: 'Config file not found.'});
    }

    // The XLSX file path is the folder of the config file plus the name of the XLSX file.
    const filename = path.join( path.dirname(configFile) ,  config.file);
    if (!filename || !fs.existsSync(filename)) {
        console.log('XLSX file not found.', filename);
        return res.status(400).json({error: 'XLSX file not found.'});
    }

    // If not specified we fall back to the default sheet.
    const sheetName = config.sheet ? config.sheet : 'Sheet1';

    // Read the file.
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet(sheetName);

    // Parse the sheet.
    const json = {
        data : [],
        config: config
    };
    const header = {}
    let index = 0;
    const data = [];
    worksheet.eachRow(function(row, rowNumber) {
        if (rowNumber === 1) {
            for (let i = 1; i<row.values.length; i++) {
                header[i] = row.values[i];
            }
        } else {
            index++;
            const record = {_id: index}
            for (let i = 1; i<row.values.length; i++) {
                record[header[i]] = row.values[i];
            }
            data.push(record);
        }
        //console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
    });

    if (config.sort) {
        // For more advanced sorting options such as sorting on multiple attributes, ASC/DESC
        // see: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        // For now we do it the simplest way: sort on one field ascending or descending.
        if (config.sort.startsWith('-')) {
            // Sort descending.
            let sort = config.sort.substring(1);
            data.sort((a,b) => (a[sort] < b[sort]) ? 1 : ((b[sort] < a[sort]) ? -1 : 0))
        } else {
            // Sort ascending.
            data.sort((a,b) => (a[config.sort] > b[config.sort]) ? 1 : ((b[config.sort] > a[config.sort]) ? -1 : 0))
        }

    }
    json.data = data;
    res.json(json);
}