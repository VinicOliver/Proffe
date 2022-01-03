const Database = require('./database/db.js');
const { subjects, weekdays, getSubject, convertHourToMinute } = require('./utils/format.js');

function pageLanding(req, res) {
    res.render('index.html');
}

function pageRegister(req, res) {
    res.render('register.html', { subjects, weekdays });
}

async function searchTeachers(req, res) {
    
    const filters = req.body;
    let teachers = [];

    if (filters.subject === '' || filters.weekday === '' || filters.time === '') {
        return res.render('search.html', { teachers, subjects, weekdays });
    }

    const timeToMinutes = convertHourToMinute(filters.time);
    
    let query = `
        SELECT classes.*, teacher.*
        FROM teacher
        JOIN classes ON (classes.teacher_id = teacher.id)
        WHERE EXISTS (
            SELECT schedules.*
            FROM schedules
            WHERE schedules.class_id = classes.id
            AND schedules.weekday = ${filters.weekday}
            AND schedules.time_from <= ${timeToMinutes}
            AND schedules.time_to > ${timeToMinutes}
        )
        AND classes.subject = ${filters.subject}
    `;

    try {
        const db = await Database;
        teachers = await db.all(query);

        teachers.forEach(teacher => {
            teacher.subject = getSubject(teacher.subject);
        });

        return res.render('search.html', { teachers, subjects, weekdays });
    } catch (error) {
        console.log(error);
    }
}

async function pageSearch(req, res) {

    const db = await Database;
    const teachers = await db.all(`
        SELECT classes.*, teacher.*
        FROM teacher
        JOIN classes ON (classes.teacher_id = teacher.id)
    `);

    teachers.forEach(teacher => {
        teacher.subject = getSubject(teacher.subject);
    });
    return res.render('search.html', { teachers, subjects, weekdays });
}

async function saveRegister(req, res) {
    const insertTeacher = require('./database/insertTeacher');
    
    let teacher = {
        name: req.body.completName,
        phone: req.body.phone,
        photo: req.body.photo,
        about: req.body.about
    };

    let classes = {
        subject: req.body.subject,
        cost: req.body.cost
    };

    let schedules = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHourToMinute((req.body.time_from)[index]),
            time_to: convertHourToMinute((req.body.time_to)[index])
        };
    });

    try {
        const db = await Database;
        await insertTeacher(db, teacher, classes, schedules);

        return res.render('index.html');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    pageLanding,
    pageRegister,
    pageSearch,
    saveRegister,
    searchTeachers
};