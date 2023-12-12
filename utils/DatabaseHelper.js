import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const executeQuery = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          params,
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};

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
      'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, birthdate TEXT, gender TEXT, address TEXT, school_name TEXT, grade TEXT, adviser_name TEXT, location_id INTEGER, FOREIGN KEY (location_id) REFERENCES locations(id));'
    );
  });
};

const createAnswersTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER, question_1 TEXT, question_2 TEXT, question_3 TEXT, question_4 TEXT, question_5 TEXT, question_6 TEXT, question_7 TEXT, question_8 TEXT, question_9 TEXT, question_10 TEXT, FOREIGN KEY (student_id) REFERENCES students(id));'
    );
  });
};

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


// STORING ANSWERS

// ... (previous imports and code)

const storeStudentInfo = async (studentInfo) => {

  const formattedBirthdate = studentInfo.birthdate.toISOString();

  const query = `
    INSERT INTO students (firstname, lastname, birthdate, gender, address, school_name, grade, adviser_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [
    studentInfo.firstname,
    studentInfo.lastname,
    formattedBirthdate,
    studentInfo.gender,
    studentInfo.address,
    studentInfo.school_name,
    studentInfo.grade,
    studentInfo.adviser_name,
  ];

  // Execute the query and return the studentId
  const result = await executeQuery(query, params);

  // Check if the result contains an insertId (studentId)
  if (result && result.insertId) {
    return result.insertId;
  } else {
    // Handle the case where insertId is not available
    throw new Error('Failed to get studentId after inserting studentInfo');
  }
};

const storeAnswers1to3 = async (studentId, answers1to3) => {

  const query = `
    INSERT OR REPLACE INTO answers (student_id, question_1, question_2, question_3)
    VALUES (?, ?, ?, ?);
  `;
  const params = [studentId, answers1to3.question_1, answers1to3.question_2, answers1to3.question_3];

 
  await executeQuery(query, params);
};

const storeAnswers4to9 = async (studentId, answers4to9) => {
  
  const query = `
    INSERT OR REPLACE INTO answers (student_id, question_4, question_5, question_6, question_7, question_8, question_9)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [
    studentId,
    answers4to9.question_4,
    answers4to9.question_5,
    answers4to9.question_6,
    answers4to9.question_7,
    answers4to9.question_8,
    answers4to9.question_9,
  ];

  
  await executeQuery(query, params);
};

const storeAnswersTo10 = async (studentId, answersTo10) => {
  
  const query = `
    INSERT OR REPLACE INTO answers (student_id, question_10)
    VALUES (?, ?);
  `;
  const params = [
    studentId,
    answersTo10.question_10,
  ];

  
  await executeQuery(query, params);
};


const updateLocation = async (studentId, locationId) => {
  
  const query = `
    UPDATE students SET location_id = ? WHERE id = ?;
  `;
  const params = [locationId, studentId];

  await executeQuery(query, params);
};


const storeLocation = async (name) => {
  const query = 'INSERT INTO locations (name) VALUES (?);';
  const params = [name];

  await executeQuery(query, params); 
};

const createLocationsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
  });
};

const getLocations = (callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM locations;', [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};

const listTables = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%";',
          [],
          (_, result) => {
            const tableNames = [];
            for (let i = 0; i < result.rows.length; i++) {
              tableNames.push(result.rows.item(i).name);
            }
            resolve(tableNames);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getAllStudents = async (callback) => {
  try {
    const query = 'SELECT * FROM students;';
    const result = await executeQuery(query);

    if (result && result.rows && result.rows._array) {
      const students = result.rows._array;
      callback(students);
    } else {
      console.error('Failed to retrieve students from the database.');
    }
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

const getAnswersForStudent = (studentId, callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM answers WHERE student_id = ?;', [studentId], (_, result) => {
      callback(result.rows.raw());
    });
  });
};

export { 
  createUserTable, 
  insertUser, 
  getUsers, 
  deleteAllUsers, 
  getUserByUsernameAndPassword, 
  storeStudentInfo, 
  storeAnswers1to3, 
  storeAnswers4to9, 
  storeAnswersTo10, 
  updateLocation, 
  storeLocation, 
  createLocationsTable,
  getLocations,
  createStudentsTable,
  createAnswersTable,
  listTables,
  getAllStudents,
  getAnswersForStudent
};
