import axios from "axios";

const response = await axios.get("http://localhost:3000/resumes");

// console.log(response.data);
document.getElementById("name").innerHTML = response.data[0].name;

const edu = document.getElementById("education");
response.data[0].education.forEach((education) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(education));
    edu.appendChild(li);
});

const work = document.getElementById("experience");
response.data[0].experience.forEach((job) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(job));
    work.appendChild(li);
});


const skills = document.getElementById("skills");
response.data[0].skills.forEach((skill) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(skill));
    skills.appendChild(li);
});

document.getElementById("phone").innerHTML = response.data[0].contact["phone"];
document.getElementById("email").innerHTML = response.data[0].contact["email"];
document.getElementById("location").innerHTML = response.data[0].location;