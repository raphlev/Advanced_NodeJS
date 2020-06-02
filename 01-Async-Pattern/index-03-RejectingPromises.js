var delay = (seconds) => new Promise((resolves, rejects) => {

    if (seconds > 3) {
        rejects(new Error(`${seconds} is too long!`))
    }

    setTimeout(() => {
        resolves(`the delay has ended: ${seconds}`)
    }, seconds);
});

delay(1)
    .then(console.log)
    .then(() => `1 second delay`)
    .then((number) => console.log(`Finished : ${number}`))
    .catch((error) => console.log(`error: ${error.message}`));
delay(4)
    .then(console.log)
    .then(() => '4 second delay')
    .then((number) => console.log(`Finished : ${number}`))
    .catch((error) => console.log(`error: ${error.message}`));

console.log('end first tick');
