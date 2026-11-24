const path = require('path')
const fs = require('fs')
const rootDir = require('../utils/pathutil')

const bestEmployeesPath = path.join(rootDir, 'data', 'bestEmployees.json')

module.exports = class BestEmployees{
    static addToBest(id, callback){
        BestEmployees.getBestEmployees(employeesId => {
            if(!employeesId.includes(id)){
                employeesId.push(id)
            }
            else{
                console.log('This id is already in favourites')
            }
            fs.writeFile(bestEmployeesPath, JSON.stringify(employeesId), callback)
        })

    }

    static getBestEmployees(callback){
        fs.readFile(bestEmployeesPath, (err,data)=>{
            try{
                console.log('try', JSON.parse(data))
                callback(JSON.parse(data))
            }
            catch{
                console.log('error', err)
                callback([])
            }
        })
    }
}