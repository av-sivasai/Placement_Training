let myPromise = new Promise((resolve, reject) => {
    let success = true;
    if(success){
        resolve("Login successful");
    } else {
        reject("Login Failed");
    }
});
myPromise.then((result) =>console.log(result))
.catch(error => console.log(error));