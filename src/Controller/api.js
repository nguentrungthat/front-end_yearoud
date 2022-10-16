const axios = require('axios').default;
const url = 'http://localhost:8081';

async function Get(data) {
    var body = null;
    await axios
        .get(`${url}/${data}`)
        .then(function (response) {
            body = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    return body;
}

async function Post(link, data) {
    var body = null;
    await axios
        .post(`${url}/${link}`, data)
        .then(function (response) {
            body = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    return body;
}

module.exports = { Get, Post };
