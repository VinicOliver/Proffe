const database = require('sqlite-async');

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS teacher (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            photo TEXT,
            about TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost INTEGER,
            teacher_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER,
            class_id TEXT
        );
    `);
}

module.exports = database.open(__dirname + '/database.sqlite').then(execute);