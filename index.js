/*  The Promise constructor takes one argument, a function
this function is called executor receives two parameters
resolve and reject, we call resolve when the operation
succeeds */
// const testPromise = new Promise((resolve, reject) => {
//   const result = 5 + 5;
//   if (result === 10) {
//     resolve("Fulfilled");
//   } else {
//     reject("Rejected");
//   }
// });

// testPromise
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((message) => {
//     console.log(message);
//   });
///
// .///
// ///
//
// fetch the data from api

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
    // Runs once the promise is settled or rejected // this runs always
    // no matter what happens
    isLoading = false;
  });

// ======================== Next concept async and await concept =======================
// whenever you write an async in front of function then it always returns a promise
async function myFunction() {
  // console.log("A");
  try {
    const response = await fetch(apiUrl); // it pauses the execution of that function
    if (!response.ok) {
      throw new Error("error: " + response.status);
    }
    // if everything is fine then we can turn the response into real data
    const data = await response.json();
    console.log("Timezone: " + data.timezone);
  } catch (error) {
    console.error(error);
  } finally {
    // Runs once the promise is settled
    isLoading = false;
  }
  // until the promise is settled
  // console.log(response, "B");
}

myFunction();
console.log("C");
// Expected output ==> A,C , then COMES "B"
