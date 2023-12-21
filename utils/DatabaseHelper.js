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

const storeStudentInfo = async (studentInfo) => {

  const formattedBirthdate = studentInfo.DOA.toISOString();

  const query = `
    INSERT INTO students (firstname, lastname, DOA, gender, school_name, grade, location_id, isExceled)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [
    studentInfo.firstname,
    studentInfo.lastname,
    formattedBirthdate,
    studentInfo.gender,
    studentInfo.school_name,
    studentInfo.grade,
    studentInfo.location_id,
    'false'
  ];

  await executeQuery('BEGIN TRANSACTION;');
  
  try {
    // Execute the query and return the studentId
    const result = await executeQuery(query, params);

    // Commit the transaction if the query was successful
    await executeQuery('COMMIT;');

    // Check if the result contains an insertId (studentId)
    if (result && result.insertId) {
      return result.insertId;
    } else {
      // Handle the case where insertId is not available
      throw new Error('Failed to get studentId after inserting studentInfo');
    }
  } catch (error) {
    // Rollback the transaction in case of an error
    await executeQuery('ROLLBACK;');
    throw error;
  }
};

const storeAnswers1to3 = async (studentId, answers1to3) => {

  // Convert each property to a string
  const allergiesString = JSON.stringify(answers1to3.allergies);
  const medicalConditionsString = JSON.stringify(answers1to3.medicalConditions);
  const surgeryString = JSON.stringify(answers1to3.surgery);

  const query = `
    INSERT OR REPLACE INTO answers (student_id, question_1, question_2, question_3)
    VALUES (?, ?, ?, ?);
  `;
  const params = [studentId, allergiesString, medicalConditionsString, surgeryString];

 
  await executeQuery(query, params);
};

const storeAnswers4to9 = async (studentId, answers4to9) => {

  // Convert each object property to a string
  const skinConditionsString = JSON.stringify(answers4to9.skinConditions);
  const eyeEarConditionsString = JSON.stringify(answers4to9.eyeEarConditions);
  const noseMouthConditionsString = JSON.stringify(answers4to9.noseMouthConditions);
  const throatNeckConditionsString = JSON.stringify(answers4to9.throatNeckConditions);
  const heartLungConditionsString = JSON.stringify(answers4to9.heartLungConditions);
  const otherDiseasesString = JSON.stringify(answers4to9.otherDiseases);
  
  const query = `
    UPDATE answers
    SET question_4 = ?, question_5 = ?, question_6 = ?, question_7 = ?, question_8 = ?, question_9 = ?
    WHERE student_id = ?;
  `;

  const params = [
    skinConditionsString,
    eyeEarConditionsString,
    noseMouthConditionsString,
    throatNeckConditionsString,
    heartLungConditionsString,
    otherDiseasesString,
    studentId,
  ];

  
  await executeQuery(query, params);
};

const storeAnswersTo10 = async (studentId, answersTo10) => {
  
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Format the date as needed

    // Convert answersTo10.mentalHealthConditions to JSON
    const convertedanswersTo10 = JSON.stringify(answersTo10.mentalHealthConditions);

    // Update the query to include date_answered
    const query = `
      UPDATE answers
      SET question_10 = ?,
          date_answered = ?
      WHERE student_id = ?;
    `;

    const params = [
      convertedanswersTo10,
      formattedDate,
      studentId,
    ];

    await executeQuery(query, params);

    console.log('Answers for Question 10 stored successfully with date_answered:', formattedDate);
  } catch (error) {
    console.error('Error storing answers for Question 10:', error);
  }
  
};


const updateLocation = async (studentId, locationId) => {
  
  const query = `
    UPDATE students SET isExceled = ?, location_id = ? WHERE id = ?;
  `;
  const params = ['false', locationId, studentId];

  await executeQuery(query, params);
};


const storeLocation = async (name) => {
  const query = 'INSERT INTO locations (name) VALUES (?);';
  const params = [name];

  await executeQuery(query, params); 
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

const getAllAnswers = async (callback) => {
  try {
    const query = 'SELECT * FROM answers;';
    const result = await executeQuery(query);

    if (result && result.rows && result.rows._array) {
      const answers = result.rows._array;
      callback(answers);
    } else {
      console.error('Failed to retrieve answers from the database.');
    }
  } catch (error) {
    console.error('Error fetching answers:', error);
  }
};

const getAnswersForStudent = (studentId, callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM answers WHERE student_id = ?;', [studentId], (_, result) => {
      callback(result.rows.raw());
    });
  });
};

const deleteAllStudents = async (callback) => {
  try {
    const query = 'DELETE * FROM students;';
    await executeQuery(query);

    // You can optionally provide a callback if you want to perform any actions after deletion
    if (typeof callback === 'function') {
      callback();
    }

    console.log('All records deleted from the students table.');
  } catch (error) {
    console.error('Error deleting students:', error);
  }
};

const deleteAllAnswers = async (callback) => {
  try {
    const query = 'DELETE * FROM answers;';
    await executeQuery(query);

    // You can optionally provide a callback if you want to perform any actions after deletion
    if (typeof callback === 'function') {
      callback();
    }

    console.log('All records deleted from the answers table.');
  } catch (error) {
    console.error('Error deleting answers:', error);
  }
};

const addDateAnsweredColumn = async () => {
  try {
    const query = 'ALTER TABLE answers ADD COLUMN date_answered TEXT;';
    await executeQuery(query);

    console.log('Column date_answered added to the answers table.');
  } catch (error) {
    console.error('Error adding date_answered column:', error);
  }
};

const addIsExceled = async () => {
  try {
    const query = 'ALTER TABLE students ADD COLUMN isExceled TEXT;';
    await executeQuery(query);

    console.log('Column isExceled added to the students table.');
  } catch (error) {
    console.error('Error adding isExceled column:', error);
  }
};

const getStudents = (locationId, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT students.id, students.firstname, students.lastname, students.gender, 
      students.school_name, students.grade, students.DOA, answers.question_1,
      answers.question_2, answers.question_3, answers.question_4, answers.question_5, answers.question_6,
      answers.question_7, answers.question_8, answers.question_9, answers.question_10
      FROM students
      LEFT JOIN answers ON students.id = answers.student_id
      WHERE students.location_id = ? AND students.isExceled = ?`,
      [locationId, 'false'],
      (_, { rows }) => {
        const studentsData = rows._array;
        successCallback(studentsData);
      },
      (_, error) => {
        errorCallback(error);
      }
    );
  });
};

const isExceledUpdate = async (studentIds) => {
  try {
    // Convert the array of student IDs to a comma-separated string
    const studentIdsString = studentIds.join(',');

    const query = `
      UPDATE students
      SET isExceled = ?
      WHERE id IN (${studentIdsString});
    `;
    const params = ['true'];

    await executeQuery(query, params);

    console.log(`Updated isExceled for students with IDs: ${studentIds.join(', ')}`);
  } catch (error) {
    console.error('Error updating isExceled for students:', error);
  }
};

const getStudentsWithAnswers = (locationId, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      SELECT students.id, students.firstname, students.lastname, students.gender, 
      students.school_name, students.DOA, students.grade, answers.*
      FROM students
      LEFT JOIN answers ON students.id = answers.student_id
      WHERE students.location_id = ?;
      `,
      [locationId],
      (_, { rows }) => {
        const studentsData = rows._array;
        successCallback(studentsData);
      },
      (_, error) => {
        errorCallback(error);
      }
    );
  });
};

const getAllStudentsWithAnswers = (successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      SELECT students.id, students.firstname, students.lastname, students.gender, 
      students.school_name, students.grade, students.DOA, answers.*
      FROM students
      LEFT JOIN answers ON students.id = answers.student_id;
      `,
      [],
      (_, { rows }) => {
        const studentsData = rows._array;
        // console.log('All Students:', studentsData); // Add this logging statement
        successCallback(studentsData);
      },
      (_, error) => {
        console.error('Error executing SQL query:', error);
        errorCallback(error);
      }
    );
  });
};

const changeColumnName = async () => {
  try {
    const query = 'ALTER TABLE students RENAME COLUMN birthdate TO DOA;';
    await executeQuery(query);

    console.log('Column change to the students table.');
  } catch (error) {
    console.error('Error chaning birthdate column:', error);
  }
};

export { 
  storeStudentInfo, 
  storeAnswers1to3, 
  storeAnswers4to9, 
  storeAnswersTo10, 
  updateLocation, 
  storeLocation,
  getLocations,
  listTables,
  getAllStudents,
  getAnswersForStudent,
  getAllAnswers,
  deleteAllStudents,
  deleteAllAnswers,
  addDateAnsweredColumn,
  getStudents,
  addIsExceled,
  isExceledUpdate,
  getStudentsWithAnswers,
  getAllStudentsWithAnswers,
  changeColumnName
};
