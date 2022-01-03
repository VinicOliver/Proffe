const subjects = [
    'Artes',
    'Biologia',
    'Filosofia',
    'Física',
    'Geografia',
    'História',
    'Língua Espanhola',
    'Língua Inglesa',
    'Língua Portuguesa',
    'Matemática',
    'Química',
    'Sociologia',
    'Programação',
    'Música'
];

const weekdays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
];

function getSubject(index) {
    return subjects[index];
}

function convertHourToMinute(time) {
    const [hour, minutes] = time.split(':');
    return Number(hour * 60) + Number(minutes);
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHourToMinute
};