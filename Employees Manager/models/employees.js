const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathutil')

const employeesPath = path.join(rootDir, 'data', 'employees.json')

module.exports = class Employees{
    constructor(name, role, email, id = Math.random()){
        this.id = id
        this.name = name
        this.role = role
        this.email = email
    }

    save(callback){
        Employees.fetchAll(employees =>{
            const index = employees.findIndex(employee => employee.id === this.id)
            if(index === -1){
                employees.push(this)
            }
            else{
                employees = employees.map(employee => employee.id !== this.id ? employee : this )
            }
            fs.writeFile(employeesPath, JSON.stringify(employees), callback)
        })
    }

    static fetchAll(callback){
        fs.readFile(employeesPath, (err, data)=>{
      try {
            callback(JSON.parse(data));
        } catch {
            callback([]);
        }
    } )
    }

    static fetchById(employeeId, callback){
        Employees.fetchAll(employees =>{
            employees = employees.filter(employee => employeeId.includes(employee.id))
            callback(employees ? employees : [])
        })
    }
}