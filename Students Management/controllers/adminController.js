const Students = require('../models/students')

exports.getAdminPage = (req, res, next) =>{
    Students.fetch(students =>{
        res.render('admin/student-list', {
            pageName: 'Admin',
            students: students
        })
    })
}

exports.getAddStudent = (req, res, next) =>{
        res.render('admin/add-student', {
            pageName: 'Admin',
            edit: false
        })
}

exports.postAddStudent = (req, res, next) =>{
    const {name, major, age, grade} = req.body
    const student = new Students(name, major, age, grade)
    student.save(error =>{
        if(error){
            console.log('There was a problem in adding student', error)
        }
        res.redirect('/admin/students')
    })
}

exports.deleteStudent = (req, res, next) =>{
    const studentId = req.params.studentId
    Students.deleteStudent(studentId, error =>{
        if(error){
            console.log('Error in deleting a file', error)
        }
        res.redirect('/admin/students')
    })
}

exports.getEditStudent = (req, res, next) =>{
    const studentId = req.params.studentId
    const edit = req.query.edit === 'true'
    Students.fetchById(studentId, student =>{
        if(!student){
            console.log('Cannot find any student with the id', error)
            return res.redirect('/admin/students')
        }
        res.render('admin/add-student',{
            pageName : 'Admin', 
            student: student,
            edit : edit
        })
    })
}

exports.postEditStudent = (req, res, next) =>{
    const {id, name, major, age, grade} = req.body
    const studentEdit = new Students(name, major, age, grade, id)
    console.log(studentEdit)
    studentEdit.save(error =>{
        if(error){
            console.log("Error writing in the file", error)
        }
        res.redirect('/admin/students')
    })
}