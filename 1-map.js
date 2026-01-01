const users = [
  { id: 1, name: "Вася" },
  { id: 2, name: "Петя" },
  { id: 1, name: "Вася" },
];

const uniqueIds = new Set(users.map(user => user.id));

const uniqueUsers = [...uniqueIds].map(id => {
	users.find(user => user.id === id);
});

console.log(uniqueUsers);