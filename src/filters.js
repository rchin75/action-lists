/**
 * Formats a number as 01, 02, 03 etc.
 * @param {number} number A number.
 * @return {string} Formatted number.
 */
const pad = (number) => {return ('0' + number).slice(-2)};
// see: https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number/44794921

/**
 * Formats a date.
 * @param date A date.
 * @return {string}
 */
export function formatDate(date) {
    let theDate = date;
    if (typeof date === 'string' || date instanceof String) {
        theDate = new Date(date);
    }
    return theDate.toLocaleDateString("en-US");
}

/**
 * Formats a time.
 * @param date A date-time (UTC).
 * @return {string}
 */
export function formatTime(date) {
    let theDate = date;
    if (typeof date === 'string' || date instanceof String) {
        theDate = new Date(date);
    }
    return pad(theDate.getUTCHours()) + ":" + pad(theDate.getUTCMinutes());
}

/**
 * Formats a file size.
 * @param size File size.
 * @return {string}
 */
export function formatSize(size) {
    if (size >= 1024 * 1024) {
        return Math.round(size / (1024 * 1024)) + ' MB';
    } else if (size >= 1024) {
        return Math.round(size / 1024) + ' KB';
    } else {
        return size + ' bytes';
    }
}

/**
 * Initializes global filters that can be used throughout the app.
 * Use the filters in a template like this {{$filters.formateDate(someDate)}}
 * @param app The app. (See main.js)
 * @returns {string}
 */
export default function registerFilters(app) {
    app.config.globalProperties.$filters = {
        formatDate,
        formatTime,
        formatSize
    }
}