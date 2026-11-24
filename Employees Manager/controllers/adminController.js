const BestEmployees = require('../models/bestEmployees')
const Employees = require('../models/employees')

exports.getAdmin = (req, res, next) =>{
    Employees.fetchAll(employees=>{
        res.render('admin/admin', {
            pageName : 'Admin',
            employees
        })
    })
}

exports.getAddEmployee = (req, res, next) =>{
    res.render('admin/add-employee', {
        pageName : 'Admin'
    })
}

exports.getEmployee = (req, res, next) =>{
    res.redirect('/admin')
}

exports.postEmployee = (req, res, next) =>{
    const {name, role, email} = req.body
    const employee = new Employees(name, role, email)
    employee.save(err =>{
        if(err){
            console.log('Writing Concluded with an error:', err)
        }
        res.redirect('/admin')
    })
}

exports.getEditEmployee = (req, res, next) =>{
    res.render('admin/edit-employee',{
        pageName : 'Editing Employees'
    })
}

exports.postBestEmployee = (req, res, next) =>{
    const employeeId = Number(req.params.employeeId)
    BestEmployees.addToBest(employeeId, err => {
        if(err){
            console.log('Adding to the best concluded', err)
        }
        res.redirect('/best-employees')
    })
}