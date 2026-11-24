const path = require('path')
const fs = require('fs')
const rootDir = require('../utils/pathutils')
const Best = require('./bestStudents')

const studentsPath = path.join(rootDir, 'data', 'students.json')

module.exports = class Students{
    constructor(name, major, age, grade, id = Math.random()){
        this.id = id
        this.name = name
        this.major = major
        this.age = age
        this.grade = grade
    }

    save(callback){
        Students.fetch(students=>{
            const index = students.findIndex(student => student.id === this.id)
            if( index === -1){
                students.push(this)
            }
            else{
                students = students.map(student => (student.id === this.id) ? this : student)
            }
            fs.writeFile(studentsPath, JSON.stringify(students), callback)
        })
    }

    static fetch(callback){
        fs.readFile(studentsPath, (err, data) =>
            callback(!err ? JSON.parse(data) : [])
        )
    }

    static fetchById(studentId, callback) {
    Students.fetch(students => {
        const ids = Array.isArray(studentId) ? studentId : [studentId];

        const found = students.filter(student => ids.includes(student.id));

        callback(
            Array.isArray(studentId)
                ? found
                : found[0] || null
        );
    });
}


    static deleteStudent(studentId, callback){
        Students.fetch(students =>{
            const studentFound = students.filter(student => student.id !== studentId)
            Best.removeBestStudent(studentId, error=>{
                if(error){
                    console.log('Student Not In favourites')
                }
            })
            fs.writeFile(studentsPath, JSON.stringify(studentFound), callback)
        })
    }
}