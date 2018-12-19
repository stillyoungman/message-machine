const moment = require('moment-timezone');
const fs = require('fs');

let users;
try {
    fs.readFile('./storage.json', (err, data) => {
        console.log(err);
        users = JSON.parse(data.toString('utf-8'));
    })
} catch {
    users = [];
}

console.log(users);

exports.validateUsername = (username) => {
    return !users.find((u) => u.username === username);
}

exports.createUser = (credentail) => {
    let user = {
        ...credentail,
        created: moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
    }
    console.log()
    users.push(user);
    // try {
    //     var previous = fs.readFileSync('./storage.json');
    //     previous = JSON.parse(previous);
    //     previous.push(user);
    // } catch {
    //     fs.writeFile('./storage.json', user)
    // }

    fs.writeFile('./storage.json', JSON.stringify(users), (err) => { console.log(err) });
}

exports.getUserByKey = (key) => {
    return users.find((user) => user.key === key);
}