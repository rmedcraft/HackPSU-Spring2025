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

const eduIn = document.getElementById("eduIn");
let liList = [];
let eduList = [""];

setOnChange();

document.getElementById("edu+").onclick = () => {
    let li = document.createElement("li");
    const child = document.createElement("input");
    li.appendChild(child);
    eduIn.appendChild(li);
    liList.push(li);

    setOnChange();

    eduList.push("");
    console.log(eduIn.querySelectorAll("input").length);
};

document.getElementById("edu-").onclick = () => {
    eduIn.removeChild(liList.pop());
    console.log(eduIn.querySelectorAll("input").length);
    setOnChange();
};


function setOnChange() {
    eduIn.querySelectorAll("input").forEach((element) => {
        const child = element as HTMLInputElement;
        child.onchange = (e) => {
            eduList[getIndex(child)] = (e.target as HTMLInputElement).value;
            console.log(getIndex(child), eduList);
        };
    });
}

function getIndex(node) {
    var childs = eduIn.querySelectorAll("input");
    var count = 0;
    for (var i = 0; i < childs.length; i++) {
        if (node === childs[i]) break;
        if (childs[i].toString() !== '[object Text]') count++;
    }
    return count;
}
