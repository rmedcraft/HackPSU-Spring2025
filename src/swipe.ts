
import axios from "axios";

const DEFAULT_PFP = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fblank-default-pfp-wue0zko1dfxs9z2c.jpg&f=1&nofb=1&ipt=6ad5068598eae061197c0bafbcc8482cf97b7524ce2255898cbf1e1ed4e074e7&ipo=images";

const response = await axios.get("http://localhost:3000/resumes");



const length = response.data;
let i = 0;

let swipeLeft = 0;
let swipeRight = 0;
// output: 

updateData();
function updateData() {
    const edu = document.getElementById("education");
    const work = document.getElementById("experience");
    const skills = document.getElementById("skills");

    clearChildren(edu);
    clearChildren(work);
    clearChildren(skills);

    if (i >= length) {
        // document.getElementById("title").innerHTML = "You've seen all availablle applicants";
        return;
    } else {
        document.getElementById("name").innerHTML = response.data[i].name;

        response.data[i].education.forEach((education) => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(education));
            edu.appendChild(li);
        });

        const image = document.getElementById("image") as HTMLImageElement;
        image.src = response.data[i].image;

        response.data[i].experience.forEach((job) => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(job));
            work.appendChild(li);
        });


        response.data[i].skills.forEach((skill) => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(skill));
            skills.appendChild(li);
        });

        document.getElementById("phone").innerHTML = response.data[i].contact["phone"];
        document.getElementById("email").innerHTML = response.data[i].contact["email"];
        document.getElementById("location").innerHTML = response.data[i].location;
    }
}

function clearChildren(node) {
    node.querySelectorAll("li").forEach((thing) => {
        thing.remove();
    });
}

window.addEventListener('keydown', keyDownListener, false);

function keyDownListener(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key === "ArrowLeft") {
        i++;
        swipeLeft++;
        updateData();
    } else if (e.key === "ArrowRight") {
        i++;
        swipeRight++;
        updateData();
    }
}