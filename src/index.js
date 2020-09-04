const fetch = require('node-fetch');

/**
 * Tests whether the argument is a palindrome.
 * @param {string} str the string to test
 * @returns {boolean} `true` if it's a palindrome, `false` otherwise
 */
module.exports.isPalindrome = str => [ ...str ].reverse().join('') === str;

/**
 * Invokes the callback function, passing in a greeting string using the given
 * name. The first argument of the callback will be an error if the given name
 * is not a string or is blank; otherwise, it will be `undefined`. The second
 * argument to the callback will be the greeting string if there was no error;
 * otherwise, it will be `undefined`.
 * @param {string} name the name to use in the greeting
 * @param {function} callback
 * @param {number} [delayMs] asynchronously delays the invocation of the given
 * callback function by the indicated number of milliseconds, if specified
 * @throws {TypeError} if the callback argument is not a function
 */
module.exports.greet = (name, callback, delayMs) => {
  if (typeof callback !== 'function') {
    throw new TypeError('The callback argument must be a function');
  }

  const result = buildGreeting(name);
  const fn = () => callback(result.error, result.greeting);

  if (typeof delayMs === 'number') {
    setTimeout(fn, delayMs);
  } else {
    fn();
  }
}

/**
 * Same as `greet()`, but promisified.
 * @param {string} name the name to use in the greeting
 * @param {number} [delayMs=0] delays fulfillment of the Promise by the given
 * number of milliseconds.
 * @returns {Promise} a Promise that resolves after the delay if the name is
 * acceptable, or rejects if the name is not a string or is blank
 */
module.exports.greetPromise = (name, delayMs = 0) => new Promise((resolve, reject) => {
  const result = buildGreeting(name);
  setTimeout(() => {
    if (result.error) {
      reject(result.error);
    } else {
      resolve(result.greeting);
    }
  }, delayMs);
});

/**
 * Returns the names of the holidays that fall on the given date.
 * @param {string} countryCode - the two-character country code of the country
 * @param {Date} [date] - the date to check (today if omitted)
 * @returns {array<string>} - the names of the holidays (empty if it's not a holiday)
 */
module.exports.holiday = async (countryCode, date = new Date()) => {
  const res = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${date.getFullYear()}/${countryCode}`);
  const holidays = await res.json();
  const dateString = formatDate(date);
  return holidays
    .filter(holiday => holiday.date === dateString)
    .map(holiday => holiday.localName);
};

/**
 * Validates the given name string and creates the greeting if the name is
 * valid.
 * @param {string} name the name to validate 
 * @returns {object} An object describing the results of the validation. If
 * validation was successful, the `greeting` property will contain the
 * greeting. Otherwise, the `error` property will contain an error object.
 */
const buildGreeting = name => {
  const result = {};

  if (typeof name === 'string') {
    name = name.trim();

    if (name.length === 0) {
      result.error = new Error('The name argument cannot be blank')
    } else {
      result.greeting = `Hello, ${name}!`;
    }
  } else {
    result.error = new TypeError('The name argument must be a string');
  }

  return result;
}

/**
 * Formats a date to yyyy-mm-dd.
 * @param {Date} date - the date to format 
 * @returns {string} the formatted date
 */
const formatDate = date => [
  date.getFullYear(),
  ('0' + (date.getMonth() + 1)).slice(-2),
  ('0' + date.getDate()).slice(-2)
].join('-');
