//Currying function
//https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript
//https://www.youtube.com/watch?v=s5YoXms0ECs
//https://www.youtube.com/watch?v=mGPj-pCGS2c

module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next))
           .catch(next)