import axios from "axios";

const response = await axios.get("http://localhost:3000/resumes");

// output: 
document.getElementById("name").innerHTML = response.data[0].name;

const edu = document.getElementById("education");
response.data[0].education.forEach((education) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(education));
    edu.appendChild(li);
});

const image = document.getElementById("image") as HTMLImageElement;
image.src = response.data[0].image;

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

// // input:
const nameInput = document.getElementById("nameIn") as HTMLInputElement;
let name = "";
nameInput.onchange = (e) => {
    name = (e.target as HTMLInputElement).value;
    console.log(name);
};

let education = [];
const eduIn = document.getElementById("eduIn");
let liList = [];

document.getElementById("edu+").onclick = () => {
    let li = document.createElement("li");
    li.appendChild(document.createElement("input"));
    eduIn.appendChild(li);
    liList.push(li);
};

document.getElementById("edu-").onclick = () => {
    eduIn.removeChild(liList.pop());
};