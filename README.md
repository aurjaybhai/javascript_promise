# JavaScript Promises — A Beginner's Guide

A hands-on walkthrough of **Promises** in JavaScript, covering the core constructor, `.then()` / `.catch()` / `.finally()` chaining, and the modern `async` / `await` syntax — all demonstrated with a real-world API call.

---

## Table of Contents

1. [Promise Constructor Basics](#1-promise-constructor-basics)
2. [Fetching Data with Promise Chaining](#2-fetching-data-with-promise-chaining)
3. [Async / Await](#3-async--await)
4. [Key Takeaways](#4-key-takeaways)
5. [How to Run](#5-how-to-run)

---

## 1. Promise Constructor Basics

A `Promise` is created using the `new Promise()` constructor, which takes a single argument — an **executor** function. This executor receives two parameters:

| Parameter | Purpose |
|-----------|---------|
| `resolve` | Called when the operation **succeeds** |
| `reject`  | Called when the operation **fails** |

```js
const testPromise = new Promise((resolve, reject) => {
  const result = 5 + 5;
  if (result === 10) {
    resolve("Fulfilled");
  } else {
    reject("Rejected");
  }
});
```

### Consuming the Promise

Use `.then()` to handle the resolved value and `.catch()` to handle rejections:

```js
testPromise
  .then((message) => {
    console.log(message); // "Fulfilled"
  })
  .catch((message) => {
    console.log(message); // "Rejected" (if the condition fails)
  });
```

---

## 2. Fetching Data with Promise Chaining

The `fetch()` API returns a Promise. This example calls the [Open-Meteo](https://open-meteo.com/) weather API and chains `.then()`, `.catch()`, and `.finally()`:

```js
const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=28.6214&longitude=77.2148&hourly=temperature_2m";

isLoading = true;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("error: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Timezone: " + data.timezone);
  })
  .catch((error) => {
    console.error("error in catch ", error);
  })
  .finally(() => {
    // Runs once the promise is settled (fulfilled OR rejected) — always executes
    isLoading = false;
  });
```

### Chain Breakdown

| Method | When It Runs |
|--------|-------------|
| `.then()` (1st) | Checks `response.ok` and parses the JSON body |
| `.then()` (2nd) | Works with the parsed data |
| `.catch()` | Handles any error thrown in the chain |
| `.finally()` | **Always** runs, regardless of success or failure — great for cleanup like hiding a loading spinner |

---

## 3. Async / Await

Adding `async` in front of a function makes it **always return a Promise**. Inside an `async` function, `await` pauses execution until the awaited Promise settles.

```js
async function myFunction() {
  try {
    const response = await fetch(apiUrl); // pauses execution until resolved
    if (!response.ok) {
      throw new Error("error: " + response.status);
    }
    const data = await response.json(); // parse the response into real data
    console.log("Timezone: " + data.timezone);
  } catch (error) {
    console.error(error);
  } finally {
    // Runs once the promise is settled
    isLoading = false;
  }
}

myFunction();
console.log("C");
// Expected output => C prints first, then the API result
// Because myFunction is async — it doesn't block the main thread
```

### Why does `"C"` print first?

`myFunction()` is `async`, so when it hits the first `await`, it **yields control back** to the main thread. The synchronous `console.log("C")` runs immediately, and the awaited result logs later once the fetch resolves.

---

## 4. Key Takeaways

- **`Promise` constructor** — wraps any asynchronous (or synchronous) operation and exposes `.then()` / `.catch()` for handling results.
- **`fetch()`** — a built-in API that returns a Promise; perfect for HTTP requests.
- **`.finally()`** — runs no matter what — ideal for cleanup tasks (e.g., `isLoading = false`).
- **`async` / `await`** — syntactic sugar over Promises that makes asynchronous code look and read like synchronous code.
- **Non-blocking** — `await` pauses only the *async function*, not the entire program. Other synchronous code continues to execute.

---

## 5. How to Run

Make sure you have [Node.js](https://nodejs.org/) installed, then:

```bash
node index.js
```

You should see the timezone information logged from the Open-Meteo API response.

---

> **Tip:** Try changing the `latitude` and `longitude` in the API URL to get weather data for a different location!
