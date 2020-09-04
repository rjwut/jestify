# 🃏 Jest Training

## Overview
This is a "sandbox" project to accompany my training session on learning to use the [Jest automated testing framework](https://jestjs.io/). It consists of a simple JavaScript module which contains no automated tests. You are going to write automated tests for the functions exported by this module. You can do the training by following the instructions in this file, even if you aren't able to attend the training.

This training session does not require any previous experience with Jest, or even automated testing. However, it does assume that you are familiar with the [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and (for one small part) [destructuring assignments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). The section about testing asynchronous functions assumes that you are familiar with asynchronous JavaScript programming concepts, including [`Promise`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) and [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await).

## 🛠 Why and How to Do Test-Driven Development

### Advantages
Why write automated testing when you could be spending that time writing the next feature?

- **🥱 Manual testing is boring and error-prone.** Humans aren't great at consistency, especially when being asked to do something tedious. Automated testing means that humans are relieved of that boring work, and can instead focus their efforts on more interesting tasks, ones that don't lend themselves to automation. Basically, make the robots do the boring parts.

- **👍 Automated testing lets you change complicated code with confidence.** Have you ever had to work with code that you were afraid to touch? Did you worry that your change might break something without your realizing it? Good automated test coverage gives you the confidence to change code freely. When you change a bunch of code and then run the tests and see that they all pass, you will feel much more secure about the changes you made.

- **⏳ Saved effort accumulates over time.** Manual test cases require an investment of effort every time you run them. Automated test cases only require you to invest the effort to write it once. After that, you can run the test as many times as you want for free.

- **🐇 Releases can happen more quickly and with better quality.** Without automated testing, every release has to wait for the slow humans to get done with their error-prone manual tests. Automated tests reduce the manual testing burden, allowing code to be released more quickly and confidently.

### Traditional vs. Test-Driven Development
The traditional approach to software development tends to look like this:

- Write code
- ~~Write tests~~ (😈 No time for that! We need to ship!)
- Do manual tests
- Ship

The test-driven development approach, on the other hand, looks like this:

- Write tests
- Write code until your tests pass
- Do (fewer) manual tests
- Ship

By writing automated tests first, you avoid the temptation to skip writing them. This practice also forces you to think through how your code should behave up front, which can often save you from going down the wrong path while coding.

### Types of Automated Tests
There are lots of different types of automated testing, but they mostly break down into three main categories:

#### Unit tests
- Testing the smallest units of code (functions) in isolation
- Typically the easiest to write and the fastest to run (the most "bang for your buck")
- Should make up about 70% of your tests

#### Integration tests
- Testing communication between units
- Tend to be more complicated than unit tests and take longer to run
- Should make up about 20% of your tests

#### UI tests
- Testing the interface that humans use to interact with the software
- More complicated to write and take longer to run
- Tend to be the most brittle
- Limit them to maybe 10% of your tests, focused on the most important interactions

### ☝ Remember: Don't Just Test the Golden Path
It's easy to just write tests covering the expected use cases, but where the bugs tend to rear their ugly heads in when you wander off the golden path. And sometimes users will use the software in ways that were completely unanticipated but that, in retrospect, make total sense. [This tweet](https://twitter.com/brenankeller/status/1068615953989087232) sums it up well:

> Brenan Keller (@brenankeller)
> 
> A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 99999999999 beers. Orders a lizard. Orders -1 beers. Orders a ueicbksjdhd.
>
> First real customer walks in and asks where the bathroom is. The bar bursts into flames, killing everyone.

## Installing Jest
In this training session, we're going to get familiar with Jest, an automated testing framework for JavaScript. To get started, clone this project to your machine and install dependencies:

```
git clone https://github.com/rjwut/jestify.git
npm install
```

The project currently has no automated testing at all. Let's start by installing Jest:

```
npm install --save-dev jest
```

Now open `package.json` and add a new script to run the tests:

```
"scripts": {
  "test": "jest ./src"
}
```

Let's check this by doing a test run now:

```
npm test
```

You'll get an error that includes this message:

```
No tests found, exiting with code 1
```

The test run failed because we don't have any tests yet. Let's fix that now.

## Your First Jest Test
We will first unit test the `isPalindrome()` function. The word "racecar" is a palindrome. Let's write a simple test that calls `isPalindrome()`, passes in `'racecar'`, and confirms that it returns `true`.

1. Create a file in the `/src` directory called `index.test.js`. (Files ending with `.test.js` are automatically recognized as containing tests.)

2. `require()` the module being tested:

   ```js
   const { isPalindrome } = require('.');
   ```

3. Invoke Jest's `test()` function:

   ```js
   test('"racecar" is a palindrome', () => {
     // test code goes here
   });
   ```

   The first argument a human-friendly description of the test. The second is an executor function which runs the test. Note that you don't have to `require()` any modules from Jest itself in order to do this. Jest functions are automatically exposed globally within `.test.js` files.

4. Write the implementation of the test inside the executor function:

   ```js
   expect(isPalindrome('racecar')).toBe(true);
   ```

   The argument for the `expect()` function should be an expression that exercises the code being tested. The `toBe()` function is a _matcher_: a Jest function which determines whether the test passes or fails. This matcher passes the expected value and the actual value into [the `Object.is()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) and passes if it returns `true`. Jest has quite a few matchers to test a variety of conditions.

The `index.test.js` file should now look like this:

```js
const util = require('.');

test('"racecar" is a palindrome', () => {
  expect(isPalindrome('racecar')).toBe(true);
});
```

Now try running it with `npm test`:

```
 PASS  src/index.test.js
  √ "racecar" is a palindrome (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.657 s
Ran all test suites matching /.\\src/i.
```

Great, our test passed! Let's do another test, this time passing in a word that is not a palindrome and ensuring that `isPalindrome()` returns `false`. Add the following code right after the first test:

```js
test('"foo" is not a palindrome', () => {
  expect(isPalindrome('foo')).toBe(false);
});
```

Run the test again. Here are the results (leaving out the summary at the bottom this time):

```
PASS  src/index.test.js
 √ "racecar" is a palindrome (1 ms)
 √ "foo" is not a palindrome (1 ms)
```

Both our tests pass, as expected.

## Parameterized Tests
We could add more strings to test, but we don't want to write the same code over and over. This is where `test.each()` comes in: It allows you to specify an array of input values and run the same test for all of them. Let's change our first test to use `test.each()`:

```js
test.each([
  'racecar',
  'radar',
  'level',
  'refer',
  'deified',
  'civic',
  '',
])('%p is a palindrome', str => {
  expect(isPalindrome(str)).toBe(true);
});
```

The argument to `test.each()` is an array of values to use in our test. It returns a function that behaves like the regular `test()` function, except that it will now run the test once for each value we provided, and we can use `printf`-style formatting in the test name. There are a variety of placeholders that can be used, but the most useful one is probably `%p`, the "pretty" formatter, which provides a nice string representation of the parameter, whatever it is.

Our executor function now accepts an argument: an element from our array of test values. We can then use it in place of the literal value we were passing to `isPalindrome()`.

Let's do the same for our non-palindrome tests, too:

```js
test.each([
  'not a palindrome',
  'foo',
  'bar',
  'baz'
])('%p is not a palindrome', str => {
  expect(isPalindrome(str)).toBe(false);
});
```

Now run the tests:

```
PASS  src/index.test.js
 √ "racecar" is a palindrome (2 ms)
 √ "radar" is a palindrome
 √ "level" is a palindrome
 √ "refer" is a palindrome (1 ms)
 √ "deified" is a palindrome
 √ "civic" is a palindrome
 √ "" is a palindrome
 √ "not a palindrome" is not a palindrome
 √ "foo" is not a palindrome (1 ms)
 √ "bar" is not a palindrome
 √ "baz" is not a palindrome
```

Awesome! 🤘 All our tests pass!

## Grouping Tests
It is often helpful to group similar tests together; for example, when you perform multiple tests on the same function. This is a job for Jest's `describe()` function. It works like this:

```js
describe('isPalindrome()', () => {
  // tests on isPalindrome() go here
});
```

Much like `test()`, `describe()` accepts a human-friendly label and an executor function. Let's move our two calls to `test.each()` inside the executor function and run the tests again:

```
PASS  src/index.test.js
 isPalindrome()
   √ "racecar" is a palindrome (1 ms)
   √ "radar" is a palindrome
   √ "level" is a palindrome (1 ms)
   √ "refer" is a palindrome
   √ "deified" is a palindrome
   √ "civic" is a palindrome
   √ "" is a palindrome (1 ms)
   √ "not a palindrome" is not a palindrome
   √ "foo" is not a palindrome
   √ "bar" is not a palindrome
   √ "baz" is not a palindrome (1 ms)
```

You can see that the tests have now been put under an `isPalindrome()` group in the report, making it easy to see that they go together. Right now it doesn't matter that much, because we only have one group. As we add more tests, grouping them this way makes the report more readable.

## Dealing With Errors

### Passing When an Error is Thrown
As we mentioned earlier, we don't just want to test the golden path. We should also make sure that `isPalindrome()` throws an error when given invalid input. We can do this using the `toThrow()` matcher:

```js
test('null throws', () => {
  expect(isPalindrome(null)).toThrow();
});
```

But when we run this, we get a problem:

```
● isPalindrome() › null throws

  TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))
```

What happened here? We expected `isPalindrome()` to throw an error, and it did, but the test still failed! The problem is that because `isPalindrome()` threw an error, `expect()` never got called, so Jest couldn't trap the error in order to test it.

We can address this by passing an anonymous function into `expect()` that, when executed, will run our test code. This defers execution of `isPalindrome()` until `expect()` is ready to trap the error, and this is what `toThrow()` expects you to do. So let's fix that:

```js
test('null throws', () => {
  expect(() => isPalindrome(null)).toThrow();
});
```

This time when you run the tests again, the test passes as expected:

```
√ null throws (2 ms)
```

We should make sure that `isPalindrome()` throws if you pass in _anything_ that isn't a string. This could include `undefined`, numbers, objects, arrays, functions, symbols, or bigints. Let's change our throw test to use `test.each()` to simplify this:

```js
test.each([
  null,
  undefined,
  1,
  {},
  [],
  () => {},
  Symbol('foo'),
  1n,
])('%p throws', val => {
  expect(val => util.isPalindrome(val)).toThrow();
});
```

Now we see a bunch of new results when we run the tests:

```
√ null throws (1 ms)
√ undefined throws (1 ms)
√ 1 throws
√ {} throws (1 ms)
√ [] throws
√ [Function anonymous] throws (1 ms)
√ Symbol(foo) throws
√ 1n throws
```

### Testing for a Specific Error
Let's suppose that you receive the following bug report:

> When you pass a non-string into `isPalindrome()`, the error that comes back is not very intuitive. For example, if you pass in `null`, you get back `TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))`. It should throw a more useful error, such as `TypeError: Argument must be a string`.

The reporter is right, the error it throws now is not very useful. Before we fix the error, let's follow good test-driven development practice and write the test first. We want to change our test so that the thrown error is expected to be as described in the bug report.

The `toThrow()` matcher accepts an optional argument. It can be any of the following:

- A string (passes if the thrown error's message contains the string)
- A regular expression or error instance (passes if the thrown error's message matches)
- An error constructor (passes if the thrown error's is of that type)

Let's change the test to expect a `TypeError` with the desired message:

```js
const expected = expect(() => isPalindrome(val));
expected.toThrow(TypeError);
expected.toThrow('Argument must be a string');
```

Note that this time, we stored the object returned by `expect()` so that we could execute multiple matchers against it. When we run the test, we now see that each of our throw tests fail with an error that looks like this:

```
● isPalindrome() › null throws TypeError with message "Argument must be a string"

  expect(received).toThrow(expected)

  Expected substring: "Argument must be a string"
  Received message:   "object null is not iterable (cannot read property Symbol(Symbol.iterator))"
```

This is exactly what we wanted: The test now fails because the error we're throwing doesn't conform to the test requirements. Let's fix that by changing `isPalindrome()`:

```js
/**
 * Tests whether the argument is a palindrome.
 * @param {string} str the string to test
 * @returns {boolean} `true` if it's a palindrome, `false` otherwise
 * @throws {TypeError} if `str` is not a string
 */
module.exports.isPalindrome = str => {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  return [ ...str ].reverse().join('') === str;
};
```

Running the tests again shows that they all pass now. We've fixed the bug!

## Mocking Functions
The module we're testing has another function called `greet()`. It invokes a callback function with a greeting for the named person. This callback mechanism was very common before `Promise`s became a thing, and are still common in event listening. In order to test that your callback function got invoked as expected, you could write one that would record whether it got invoked and what arguments were passed to it. There's no need to do so, however, because Jest has that functionality built in!

To create a mock function, use the `jest.fn()` function. Passing no arguments to `jest.fn()` returns a do-nothing mock function. If you want your mock function to have some behavior, you can pass a function which describes this behavior into `jest.fn()`. This could be useful to, for example, mock the behavior of another module or service.

Let's write a test for `greet()` using a mock callback function. First, we need to add `greet` to the list of functions we're `require()`ing at the top of the file:

```js
const { isPalindrome, greet } = require('.');
```

Now let's write a test:

```js
describe('greet()', () => {
  test('Passing in "world" invokes the callback with "Hello, world!"', () => {
    const callback = jest.fn();
    greet('world', callback);
  });
});
```

The `greet()` function would throw an error if `callback` were not a function, so we know that `jest.fn()` did return a mock function for us. However, we have no idea yet whether the function actually got called and what it may have been passed. Fortunately, the mock function tracks information about each time it is invoked, and this information can be retrieved afterward via the `mock` property of the mock function.

The object stored in the function's `mock` property contains several properties of its own, but the one we're interested in here is `calls`, which is an array which contains one element for each time the mock function was invoked. Each element is an array containing the arguments that were passed to the function. We can use this information to assert that our mock function is called with the appropriate arguments, like this:

```js
expect(callback.mock.calls).toEqual([
  [ undefined, 'Hello, world!'],
]);
```

Notice that we're using `toEqual()` instead of `toBe()`. Remember that `toBe()` performs a strict equality check, but we don't want it to be the same array. We want it to be an array that _looks_ the same as the one we specify. That's what `toEqual()` does, and it makes it much easier to test complex values.

The test code above expects that the mock function will have been invoked exactly once, with `undefined` as the first argument (the error) and `'Hello, world!'` as the second argument (the greeting). When we run our tests, we find that this test passes, proving that the callback was invoked with the expected arguments.

## Testing Asynchronous Code

### Callbacks
The `greet()` function has an optional third argument which causes it to asynchronously delay the invocation of the callback. Let's write a separate test case for that:

```js
test('Test delayed callback', () => {
  const callback = jest.fn();
  greet('world', callback, 100);
  expect(callback.mock.calls).toEqual([
    [ undefined, 'Hello, world!']
  ]);
});
```

Uh, oh! 😱 Our test fails:

```
● greet() › Test delayed callback

  expect(received).toEqual(expected) // deep equality

  - Expected  - 6
  + Received  + 1

  - Array [
  -   Array [
  -     undefined,
  -     "Hello, world!",
  -   ],
  - ]
  + Array []
```

The test failure shows a diff between the expected and actual values. We expected our mock callback function to have been invoked, but `mock.calls` comes back empty. The problem is that because `greet()` is asynchronous, the function returns immediately, before the callback gets invoked.

Fortunately, Jest provides a nice workaround for this problem. The executor function can accept an function argument, usually called `done`. If you declare this argument, Jest will wait until you invoke that function before considering the test executor to be complete. Instead of using a mock callback, let's create a callback that will invoke `done()` for us:

```js
test('Test delayed callback', done => {
  greet('world', (error, greeting) => {
    expect(error).toBe(undefined);
    expect(greeting).toBe('Hello, world!');
    done();
  }, 100);
});
```

Note that if `done()` never gets called, the test will wait until it times out (five seconds by default), then fail with a timeout error. If an error occurs, you can trap it and pass it into `done()` to end the test and display the error. You can also adjust the timeout by passing a third argument into `test()`, giving the timeout duration in milliseconds.

### `Promise`s
Our module has a `Promise`-based implementation of `greet()` called `greetPromise()`. Testing `Promise`-based code is easier than working with callbacks. If your executor function returns a `Promise`, Jest will realize that you're testing asynchronous code and wait until the `Promise` settles before ending the test. Let's use this mechanism to write a test for `greetPromise()`.

First we need to expose the `greetPromise()` function in the first line of our test file:

```js
const { isPalindrome, greet, greetPromise } = require('.');
```

Now let's create a new `describe()` and write our test in it:

```js
describe('greetPromise()', () => {
  test('Passing in "world" resolves to "Hello, world!"', () => {
    return greetPromise('world', 100).then(greeting => {
      expect(greeting).toBe('Hello, world!');
    });
  });
});
```

That wasn't so bad! Now let's write a test to make sure that `greetPromise()` rejects if you pass it an empty name. Normally, Jest will pass the test if the `Promise` resolves. However, we want the test to _fail_ if it resolves. To handle this, we will tell Jest how many assertions we plan to make by using the `expect.assertions()` function. If the `Promise` settles and the number of assertions made doesn't match, the test will fail:

```js
test('Passing in a blank name rejects', () => {
  expect.assertions(1);
  return greetPromise('', 100).catch(error => {
    expect(error.message).toBe('The name argument cannot be blank');
  });
});
```

In this test, if the `Promise` resolves, the `catch()` function is never invoked, and so the assertion contained in it is never executed. Jest will notice that no assertions were made, and so will fail the test.

Another way to handle this situation is to use the `resolves` and `rejects` matchers. This avoids the need to use `expect.assertions()`. Let's rewrite our tests to use these matchers:

```js
test('Passing in "world" resolves to "Hello, world!"', () => {
  return expect(greetPromise('world', 100)).resolves.toBe('Hello, world!');
});
test('Passing in a blank name rejects', () => {
  return expect(greetPromise('', 100)).rejects.toThrow('The name argument cannot be blank');
});
```

Super easy! Don't forget to return the result from the executor function so that Jest will know to wait for the `Promise` to settle.

If you prefer to use `async`/`await` syntax, you can do that, too. Let's rewrite our tests to use that:

```js
test('Passing in "world" resolves to "Hello, world!"', async () => {
  await expect(greetPromise('world', 100)).resolves.toBe('Hello, world!');
});
test('Passing in a blank name rejects', async () => {
  await expect(greetPromise('', 100)).rejects.toThrow('The name argument cannot be blank');
});
```

All you have to do is change the executor functions to be `async`, and then `await` the test instead of returning it. (Since an `async` function always returns a `Promise`, there's no need to explicitly `return` anything.)

You can mix and match these three methods of working with `Promise`s and use whichever one is most convenient in your circumstance.

## Mocking Modules
The last function in our module is `holiday()`. This function accepts a country code and an optional date, and returns an array containing the names of any federal holidays that fall on that date. Given what we know now about testing asynchronous functions, it's easy enough to write a test for that:

```js
describe('holiday()', () => {
  test('New Year\'s Day', async () => {
    await expect(holiday('US', new Date(2020, 0, 1)))
      .resolves.toEqual([ 'New Year\'s Day' ]);
  });
});
```

There's a problem, however: `holiday()` depends on a remote web service. We don't want to be spamming their API when we're running our tests, and our test could fail if the service is down or is being really slow.

The code uses a module called `node-fetch` to make the web service request. What we're going to do is mock that module, so that when we make a request we aren't actually hitting the real web service. In the root of our project, create a new directory called `__mocks__` (that's two underscores on each side). Inside this directory, create a new file named `node-fetch.js`.

First, let's create a structure to hold our mock data. For now, we'll create an empty object called `DATA`:

```js
const DATA = {};
```

The `node-fetch` module is an asynchronous function that gets passed a URL and returns an object representing the response. We then call the `json()` asynchronous method on that reponse to retrieve the data. We don't need to mock the entire API, just these parts that we're using.

```js
module.exports = jest.fn(async url => ({
  json: async () => (/* data */)
}));
```

The URL of the request looks like this:

    https://date.nager.at/api/v2/PublicHolidays/2020/US

The response is an array giving all the holidays for that year in that country. Let's use those last seven characters of the URL (the part with the year and country code) as a key to retrieve the mock data:

```js
module.exports = jest.fn(async url => ({
  json: async () => DATA[url.slice(-7).toUpperCase()]
}));
```

If we save and run our tests, we'll find that the `holiday()` test fails. We can tell that it's using our mock rather than the actual `node-fetch` module!

Now let's create some mock data so that our test will pass. Note that we're not mocking the entire response; just the parts we're interested in, which are the `date` and `localName` properties. Let's put in the holiday we're looking for (New Year's Day) and one we aren't (Independence Day) to make sure it gets filtered out. Create a `'2020/US'` property on `DATA` so that it looks like this:

```js
const DATA = {
  '2020/US': [
    {
      date: '2020-01-01',
      localName: 'New Year\'s Day',
    },
    {
      date: '2020-07-04',
      localName: 'Independence Day',
    },
  ],
}
```

That's it! If we save and run our test, it passes, even if we're disconnected from the network. 🎉

You can also mock modules that are internal to your application. In the directory where the module is located, create a `__mocks__` directory, then create the mock module in that directory with the same name.

## Coverage
Jest comes with built-in coverage reporting. Let's turn that on in our `test` script by adding `--coverage` to the end of the command in `package.json`:

```
"scripts": {
  "test": "jest ./src --coverage"
}
```

Run the tests again and you'll see a coverage report after the test results, which should look something like this:

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   94.87 |    71.43 |     100 |   94.44 |
 index.js |   94.87 |    71.43 |     100 |   94.44 | 48,68
----------|---------|----------|---------|---------|-------------------
```

This command will also export the coverage report into the `/coverage` directory in a variety of formats, including a super-nice HTML report in `/coverage/lcov-report`. (The HTML report will even show things that the report in the terminal misses, like default argument values not being covered.)

## I Want More!
There is far more to Jest than can be covered in one training session. The [official Jest documentation](https://jestjs.io/docs/en/getting-started) contains everything you'd ever want to know about Jest. Some topics that might be of particular interest include:

- Setup and teardown functions
- Mocking ECMAScript 6 classes
- Mocking the browser DOM
- Testing Express routes
- Testing React, Vue, and Angular apps
