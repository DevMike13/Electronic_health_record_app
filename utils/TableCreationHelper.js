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
      'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, DOA TEXT, gender TEXT, address TEXT, school_name TEXT, grade TEXT, LRN TEXT, isExceled TEXT, location_id INTEGER, FOREIGN KEY (location_id) REFERENCES locations(id));'
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
    // Create the "locations" table if not exists
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );

    // Insert default records if the table was just created
    tx.executeSql(
      'INSERT INTO locations (name) SELECT "Agdangan" WHERE NOT EXISTS (SELECT 1 FROM locations WHERE name = "Agdangan");'
    );
    tx.executeSql(
      'INSERT INTO locations (name) SELECT "Plaridel" WHERE NOT EXISTS (SELECT 1 FROM locations WHERE name = "Plaridel");'
    );
    tx.executeSql(
      'INSERT INTO locations (name) SELECT "Sampaloc" WHERE NOT EXISTS (SELECT 1 FROM locations WHERE name = "Sampaloc");'
    );
    tx.executeSql(
      'INSERT INTO locations (name) SELECT "Perez" WHERE NOT EXISTS (SELECT 1 FROM locations WHERE name = "Perez");'
    );
    tx.executeSql(
      'INSERT INTO locations (name) SELECT "Candelaria" WHERE NOT EXISTS (SELECT 1 FROM locations WHERE name = "Candelaria");'
    );
  });
};




export { 
  createUserTable,
  createLocationsTable,
  createStudentsTable,
  createAnswersTable,
};
