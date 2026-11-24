const Students = require('../models/students')
const Home = require('../models/students')
const Best = require('../models/bestStudents')

exports.getHome = (req, res, next) =>{
    res.render('user/home.ejs',  {
    pageName : 'Home'
})
}

exports.getStudents = (req, res, next) =>{
    Home.fetch(students=>{
        pageName : 'Students'
        res.render('user/students-list.ejs',  {
            pageName: 'Students',
            students: students
    })
})
}

exports.getBestStudents = (req, res, next) => {
  Best.getBestStudents((studentId) => {
    Students.fetchById(studentId, (students) => {
      console.log(studentId)
      res.render("user/best-students-list.ejs", {
        pageName: "Best Students",
        students: students,
      });
    });
  });
};


exports.postBestStudents = (req, res, next) =>{
    const studentId = req.params.studentId
    Best.addToBest(studentId ,error =>{
        if(error){
            console.log('Writing concluded', error)
        }
        res.redirect('/best-students')
    })
}

exports.removeBestStudent = (req, res, next)=>{
  const studentId = req.params.studentId
  Best.removeBestStudent(studentId, error =>{
    if(error){
      console.log('Error deleting the student', error)
    }
    res.redirect('/best-students')
  })
}

exports.getStudentDetails = (req, res, next) =>{
  const studentId = req.params.studentId
  Students.fetchById(studentId, student =>{
    res.render('user/student-details', {
      pageName: "Student Details",
      student: student
    })
  })
}
