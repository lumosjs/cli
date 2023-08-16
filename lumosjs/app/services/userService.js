import  user  from "#model/user";

async function index() {
  return user;
}

async function store(data) {
  user.push(data);
  return data;
}

async function show(id) {
  const item = user.find(item => item.id === id);
  return item;
}

async function update(id, data) {
  const indexToUpdate = user.findIndex(item => item.id === id);
  if (indexToUpdate !== -1) {
    user[indexToUpdate] = { ...user[indexToUpdate], ...data };
    return user[indexToUpdate];
  }
  return null;
}

async function destroy(id) {
  const indexToDelete = user.findIndex(item => item.id === id);
  if (indexToDelete !== -1) {
    const deletedItem = user.splice(indexToDelete, 1);
    return deletedItem[0];
  }
  return null;
}

export {
  index,
  store,
  show,
  update,
  destroy,
};