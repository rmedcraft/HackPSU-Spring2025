import axios from "axios";

const DEFAULT_PFP = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fblank-default-pfp-wue0zko1dfxs9z2c.jpg&f=1&nofb=1&ipt=6ad5068598eae061197c0bafbcc8482cf97b7524ce2255898cbf1e1ed4e074e7&ipo=images";

const nameInput = document.getElementById("nameIn") as HTMLInputElement;
let name = "";
nameInput.onchange = (e) => {
    name = (e.target as HTMLInputElement).value;
};

const eduIn = document.getElementById("eduIn");
let eduLiList = [];
let eduList = [""];

setEduOnChange();

document.getElementById("edu+").onclick = () => {
    let li = document.createElement("li");
    const child = document.createElement("input");
    li.appendChild(child);
    eduIn.appendChild(li);
    eduLiList.push(li);

    setEduOnChange();

    eduList.push("");
};

document.getElementById("edu-").onclick = () => {
    eduIn.removeChild(eduLiList.pop());
    setEduOnChange();
};


function setEduOnChange() {
    eduIn.querySelectorAll("input").forEach((element) => {
        const child = element as HTMLInputElement;
        child.onchange = (e) => {
            eduList[getIndex(child, eduIn)] = (e.target as HTMLInputElement).value;
        };
    });
}

function getIndex(node, parent) {
    var childs = parent.querySelectorAll("input");
    var count = 0;
    for (var i = 0; i < childs.length; i++) {
        if (node === childs[i]) break;
        if (childs[i].toString() !== '[object Text]') count++;
    }
    return count;
}

const expIn = document.getElementById("expIn");
let expLiList = [];
let expList = [""];

setExpOnChange();

document.getElementById("exp+").onclick = () => {
    let li = document.createElement("li");
    const child = document.createElement("input");
    li.appendChild(child);
    expIn.appendChild(li);
    expLiList.push(li);

    setExpOnChange();

    expList.push("");
};

document.getElementById("exp-").onclick = () => {
    expIn.removeChild(expLiList.pop());
    setExpOnChange();
};

function setExpOnChange() {
    expIn.querySelectorAll("input").forEach((element) => {
        const child = element as HTMLInputElement;
        child.onchange = (e) => {
            expList[getIndex(child, expIn)] = (e.target as HTMLInputElement).value;
            console.log(expList);
        };
    });
}


const skillIn = document.getElementById("skillIn");
let skillLiList = [];
let skillList = [""];

setSkillOnChange();

document.getElementById("skill+").onclick = () => {
    let li = document.createElement("li");
    const child = document.createElement("input");
    li.appendChild(child);
    skillIn.appendChild(li);
    skillLiList.push(li);

    setSkillOnChange();

    skillList.push("");
};

document.getElementById("skill-").onclick = () => {
    skillIn.removeChild(skillLiList.pop());
    setSkillOnChange();
};

function setSkillOnChange() {
    skillIn.querySelectorAll("input").forEach((element) => {
        const child = element as HTMLInputElement;
        child.onchange = (e) => {
            skillList[getIndex(child, skillIn)] = (e.target as HTMLInputElement).value;
            console.log(skillList);
        };
    });
}

const phoneInput = document.getElementById("phoneIn") as HTMLInputElement;
let phone = "";
phoneInput.onchange = (e) => {
    phone = (e.target as HTMLInputElement).value;
};

const emailInput = document.getElementById("emailIn") as HTMLInputElement;
let email = "";
emailInput.onchange = (e) => {
    email = (e.target as HTMLInputElement).value;
};

const locInput = document.getElementById("locationIn") as HTMLInputElement;
let loc = "";
locInput.onchange = (e) => {
    loc = (e.target as HTMLInputElement).value;
};

const imgInput = document.getElementById("imgIn") as HTMLInputElement;
let img = "";
imgInput.onchange = (e) => {
    img = (e.target as HTMLInputElement).value;
};

function removeEmptyStrings(arr) {
    const newArr = [];
    arr.forEach(element => {
        if (element.length != 0) {
            newArr.push(element);
        }
    });
    return newArr;
}

const submitButton = document.getElementById("submit");
submitButton.onclick = async () => {
    if (img === null || img.length === 0) {
        img = DEFAULT_PFP;
    }

    const resume = {
        "name": name,
        "education": removeEmptyStrings(eduList),
        "experience": removeEmptyStrings(expList),
        "skills": removeEmptyStrings(skillList),
        "contact": {
            "email": email,
            "phone": phone
        },
        "location": loc,
        "image": img
    };


    await axios.post("http://localhost:3000/resume", resume);

    // reset all text fields
    locInput.value = "";
    imgInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    eduIn.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
    expIn.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
    skillIn.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
    while (expLiList.length > 0) {
        expIn.removeChild(expLiList.pop());
    }
    while (eduLiList.length > 0) {
        eduIn.removeChild(eduLiList.pop());
    }
    while (skillLiList.length > 0) {
        skillIn.removeChild(skillLiList.pop());
    }

    name = "";
    email = "";
    phone = "";
    skillList = [""];
    expList = [""];
    eduList = [""];
};

