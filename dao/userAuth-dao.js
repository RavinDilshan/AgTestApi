const jwt = require("jsonwebtoken");
const db = require("../startup/database");
const asyncHandler = require("express-async-handler");

exports.loginUser = (phonenumber) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE phoneNumber = ? LIMIT 1";
    db.query(sql, [phonenumber], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// DAO method to check if phone number exists in the database
exports.checkUserByPhoneNumber = (phoneNumber) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE phoneNumber = ?";
    db.query(query, [phoneNumber], (err, results) => {
      if (err) {
        reject(err); // Reject the promise if there is a database error
      } else {
        resolve(results); // Resolve with the query results
      }
    });
  });
};

// DAO method to insert a new user into the database
exports.insertUser = (firstName, lastName, phoneNumber, NICnumber) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO users(`firstName`, `lastName`, `phoneNumber`, `NICnumber`) VALUES(?, ?, ?, ?)";
    db.query(
      query,
      [firstName, lastName, phoneNumber, NICnumber],
      (err, results) => {
        if (err) {
          reject(err); // Reject if there's an error during insertion
        } else {
          resolve(results); // Resolve with the result if successful
        }
      }
    );
  });
};

// DAO function to retrieve user profile by userId
exports.getUserProfileById = (userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT firstName, lastName, phoneNumber, NICnumber FROM users WHERE id = ?";

    db.query(sql, [userId], (err, results) => {
      if (err) {
        return reject(err); // Reject if there is an error
      }
      if (results.length === 0) {
        return resolve(null); // Resolve with null if no user found
      }
      resolve(results[0]); // Resolve with the user profile details
    });
  });
};

exports.updateUserPhoneNumber = (userId, newPhoneNumber) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET phoneNumber = ? WHERE id = ?";
    db.query(sql, [newPhoneNumber, userId], (err, results) => {
      if (err) {
        return reject(err); // Reject the promise if there's a database error
      }
      resolve(results); // Resolve with the query results
    });
  });
};

exports.checkSignupDetails = (phoneNumber, NICnumber) => {
  return new Promise((resolve, reject) => {
      let conditions = [];
      let params = [];

      if (phoneNumber) {
          const formattedPhoneNumber = `+${String(phoneNumber).replace(/^\+/, "")}`;
          conditions.push("phoneNumber = ?");
          params.push(formattedPhoneNumber);
      }

      if (NICnumber) {
          conditions.push("NICnumber = ?");
          params.push(NICnumber);
      }

      const checkQuery = `SELECT * FROM users WHERE ${conditions.join(" OR ")}`;
      
      db.query(checkQuery, params, (err, results) => {
          if (err) {
              reject(err);
          } else {
              resolve(results);
          }
      });
  });
};


exports.updateFirstLastName = (userId, firstName, lastName) => {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE users SET firstName = ?, lastName = ? WHERE id = ?';
      db.query(sql, [firstName, lastName, userId], (err, results) => {
          if (err) {
              reject(err);
          } else {
              resolve(results.affectedRows); // Return affected rows
          }
      });
  });
};
