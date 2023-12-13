import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const createUserTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, username TEXT, password TEXT);'
    );
  });
};

const createStudentsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, birthdate TEXT, gender TEXT, address TEXT, school_name TEXT, grade TEXT, adviser_name TEXT, isExceled TEXT, location_id INTEGER, FOREIGN KEY (location_id) REFERENCES locations(id));'
    );
  });
};

const createAnswersTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER, question_1 TEXT, question_2 TEXT, question_3 TEXT, question_4 TEXT, question_5 TEXT, question_6 TEXT, question_7 TEXT, question_8 TEXT, question_9 TEXT, question_10 TEXT, date_answered TEXT, FOREIGN KEY (student_id) REFERENCES students(id));'
    );
  });
};

const createLocationsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
  });
};



export { 
  createUserTable,
  createLocationsTable,
  createStudentsTable,
  createAnswersTable,
};
