var delay = (seconds) => new Promise((resolves, rejects) => {
  setTimeout(() => {
    resolves('the long delay has ended');
  }, seconds);
});

delay(1)
  .then(console.log)
  .then(() => 42)
  .then((number) => console.log(`Hello world: ${number}`)); // Use back-tick to render the litteral value

console.log('end first tick');
