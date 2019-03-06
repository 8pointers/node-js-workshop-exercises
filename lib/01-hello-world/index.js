console.log('Hello World');

/*
setInterval(() => console.log('Hello World'), 1000);
/* */

/*
const person = {
  age: 0
};
setInterval(() => {
  person.age++;
  console.log('Hello World');
  if (person.age === 3) {
    console.log(person.address.street);
  }
}, 1000);
/* */

/*
setInterval(() => console.log('Hello World'), 1000);
const p = Promise.reject('reason');
/* */

/*
console.log('Before');
setTimeout(() => console.log('timeout'), 0);
console.log('After');
/* */

/*
setInterval(() => {
  console.log('First');
  const tsDue = Date.now() + 1500;
  while (Date.now() < tsDue);
}, 1000);
setInterval(() => console.log('Second'), 1000);
/* */

/*
console.log('A');
setTimeout(() => console.log('B'), 300);
console.log('C');
const tsDue = Date.now() + 500;
while (Date.now() < tsDue);
console.log('D');
setTimeout(() => console.log('E'), 0);
console.log('F');
/* */
