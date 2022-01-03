const database = require('./db.js');
const insertTeacher = require('./insertTeacher');

database.then(async (db) => {
    // Inserir dados
    /*
    let teacher = {
        name: 'Vinicius Cesar de Oliveira',
        phone: '42991127519',
        photo: 'https://avatars.githubusercontent.com/u/63988062?v=4',
        about: 'Gosta de programar'
    };

    let classes  = {
        subject: 9,
        cost: 150
    };

    let schedules = [
        {
            weekday: 1,
            timeFrom: 520,
            timeTo: 780
        },
        {
            weekday: 5,
            timeFrom: 520,
            timeTo: 780
        }
    ];

    await insertTeacher(db, teacher, classes, schedules);*/
    // Ler dados
    const teachers = await db.all('SELECT * FROM teacher');
    console.log(teachers);
});