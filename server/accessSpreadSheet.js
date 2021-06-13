const Excel = require('exceljs');
const fs = require('fs');

/**
 * Reads a spreadsheet file and responds with a JSON of the contents.
 * @param req Request.
 * @param res Response.
 * @return {Promise<void>}
 */
module.exports.readFile = async function(req, res) {
    // For now we hardcode this, but later on it should be dynamic.
    const filename = './test/data/books.xlsx';
    const sheetName = 'Sheet1';
    const configFile = './test/data/books.json';

    // Read the config file.
    let config = null;
    if (fs.existsSync(configFile)) {
        const contents = fs.readFileSync(configFile);
        config = JSON.parse(contents);
    }

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
        // For now we do it the simplest way: sort on one field ascending.
        data.sort((a,b) => (a[config.sort] > b[config.sort]) ? 1 : ((b[config.sort] > a[config.sort]) ? -1 : 0))
    }
    json.data = data;
    res.json(json);
}