/* eslint-disable no-console */

// FOR TESTING CRUD OPERATIONS ON SERVER

const axios = require('axios');

const BASE_URL = 'http://localhost:5700';

async function createUser(name) {
  try {
    const res = await axios.post(`${BASE_URL}/users`, { name });

    console.log('User created:', res.data);

    return res.data.id;
  } catch (err) {
    console.error('Error creating user:', err.response?.data || err.message);
  }
}

async function getUsers() {
  try {
    const res = await axios.get(`${BASE_URL}/users`);

    console.log('All users:', res.data);
  } catch (err) {
    console.error('Error getting users:', err.response?.data || err.message);
  }
}

async function deleteUser(id) {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`);
    console.log(`User ${id} deleted`);
  } catch (err) {
    console.error('Error deleting user:', err.response?.data || err.message);
  }
}

async function createExpense(userId) {
  try {
    const res = await axios.post(`${BASE_URL}/expenses`, {
      userId,
      spentAt: new Date().toISOString(),
      title: 'Lunch',
      amount: 15,
      category: 'Food',
      note: 'Sushi bar',
    });

    console.log('Expense created:', res.data);

    return res.data.id;
  } catch (err) {
    console.error('Error creating expense:', err.response?.data || err.message);
  }
}

async function getExpenses() {
  try {
    const res = await axios.get(`${BASE_URL}/expenses`);

    console.log('All expenses:', res.data);
  } catch (err) {
    console.error('Error getting expenses:', err.response?.data || err.message);
  }
}

async function deleteExpense(id) {
  try {
    await axios.delete(`${BASE_URL}/expenses/${id}`);
    console.log(`Expense ${id} deleted`);
  } catch (err) {
    console.error('Error deleting expense:', err.response?.data || err.message);
  }
}

// 🧪 Test everything
(async () => {
  const userId = await createUser('Alice');
  const expenseId = await createExpense(userId);

  await getUsers();
  await getExpenses();

  await deleteExpense(expenseId);
  await deleteUser(userId);

  await getUsers();
  await getExpenses();
})();
