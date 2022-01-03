module.exports = async function(db, teacher, classes, schedules) {
    // Inserir dados na table teacher
    
    // insertedTeacher é um objeto
    const insertedTeacher = await db.run(`
        INSERT INTO teacher (
            name,
            phone,
            photo,
            about
        ) VALUES (
            '${teacher.name}',
            '${teacher.phone}',
            '${teacher.photo}',
            '${teacher.about}'
        );
    `);

    // Pegar o id do professor:
    const teacher_id = insertedTeacher.lastID;

    // Inserir dados na tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                teacher_id
            ) VALUES (
                '${classes.subject}',
                '${classes.cost}',
                '${teacher_id}'
            );
    `);

    // Pegar o id da aula
    const class_id = insertedClass.lastID;

    // Inserir dados na tabela schedule
    // insertedAllClassSchedule é um array de códigos SQL

    const insertedAllClassSchedule = schedules.map(async (schedule) => {
        await db.run(`
            INSERT INTO schedules (
                weekday,
                time_from,
                time_to,
                class_id
            ) VALUES (
                '${schedule.weekday}',
                '${schedule.time_from}',
                '${schedule.time_to}',
                '${class_id}'
            );
        `);
    });

    await Promise.all(insertedAllClassSchedule);
};