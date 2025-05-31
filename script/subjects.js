const createSubject = (e) => {
    e.preventDefault();
    const subject = document.getElementById('subject').value.trim();
    const fullmarks = document.getElementById('fullmarks').value.trim();
    console.log(subject, fullmarks);
}