const Employees = require('../models/employees')
const BestEmployees = require('../models/bestEmployees')

exports.getHomePage = (req, res, next) =>{
    res.render('user/index', {
        pageName: 'Home'
    })
}

exports.getDashBoard = (req, res, next) =>{
    res.render('user/index',{
        pageName: 'Home'
    })
}

exports.getEmployees = (req, res, next) =>{
    Employees.fetchAll(employees=>{
        res.render('user/employees', {
            pageName: 'Employees',
            employees
        })
    })
}

exports.getBestEmployees = (req, res, next) =>{
    BestEmployees.getBestEmployees(bestEmployees=>{
        Employees.fetchById(bestEmployees, employees =>
            res.render('user/best-employees', {
                pageName: 'Best Employees',
                employees
            })
        
        )
    })
}

exports.getEmployeeDetail = (req, res, next) =>{
    const employeeId = Number(req.params.employeeId)
    Employees.fetchById(employeeId, employee =>{
        res.render('user/employee-details', {
            pageName : 'Employee Details',
            employee
    })
    })
}
