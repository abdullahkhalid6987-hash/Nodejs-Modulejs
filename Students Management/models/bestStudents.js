const path = require('path')
const fs = require('fs')
const rootDir = require('../utils/pathutils')
const bestStudentsPath = path.join(rootDir, "data", "bestStudents.json")
const Students = require('../models/students')

module.exports = class Best{

    static addToBest(studentId, callback){
        Best.getBestStudents(bestStudents =>{
            if(bestStudents.includes(studentId)){
                return callback('Student is already in best')
            }
            else{
                bestStudents.push(studentId)
            }
            fs.writeFile(bestStudentsPath, JSON.stringify(bestStudents), callback)
        })
    }

    static getBestStudents(callback) {
    fs.readFile(bestStudentsPath,(err, data) => {
        try {
            callback(JSON.parse(data));
        } catch (error) {
            callback([]);
        }
    });
}
    static removeBestStudent(studentId, callback){
        Best.getBestStudents(students =>{
            const studentsFound = students.filter(student => student !== studentId)
            fs.writeFile(bestStudentsPath, JSON.stringify(studentsFound), callback)
        })
    }

}