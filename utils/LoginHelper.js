import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const insertUser = (firstname, lastname, username, password) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?);',
      [firstname, lastname, username, password],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log('User registered successfully');
        } else {
          console.log('Failed to register user');
        }
      }
    );
  });
};

const getUsers = (callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM users;', [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};

const deleteAllUsers = () => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM users;', [], (_, { rowsAffected }) => {
      console.log(`Deleted ${rowsAffected} user(s)`);
    });
  });
};

const getUserByUsernameAndPassword = (username, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?;',
      [username, password],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
};

export { 
  insertUser, 
  getUsers, 
  deleteAllUsers, 
  getUserByUsernameAndPassword
};
