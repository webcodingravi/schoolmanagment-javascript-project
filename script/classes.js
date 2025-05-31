const createClass = (e) => {
   e.preventDefault();
   const classes = document.getElementById('class').value.trim();
   const fee = document.getElementById('fee').value.trim();
   const classTeacher = document.getElementById('classTeacher').value.trim();
   const sections = document.getElementById('sections').value.trim();
   console.log(classes,classTeacher,sections);
}