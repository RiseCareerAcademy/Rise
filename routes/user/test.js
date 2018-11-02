const express = require("express");
const controller = require("./user.controller.js");
const db = require('../../db');
var user_sql_constants = require("../../config/user_sql_constants.js");


test('create tables correctly', () => {
    sql = user_sql_constants.create_mentor_table_sql();
  
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
    
    });

    sql = user_sql_constants.get_all_mentors();
  
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        expect(rows).toBe(1)
    });

});
