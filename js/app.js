window.onload = function () {
    $(function () {
        if (window.location.protocol === "https:")
            window.location.protocol = "http";
    });
}
console.clear();

const showResults = (data, id, semesterId) => {
    const parent = document.getElementById('row-container');
    data.forEach(element => {

        const child = document.createElement('div');
        child.classList.add("col", "w-25", "text-dark", "bg-light", "border", "border-dark", "rounded", "p-2", "m-2");
        child.innerHTML = `
        
            <h2 class="">${element.semesterName} ${element.semesterYear}</h2>
            <div>
                <h4 class="text-dark">${element.courseTitle}</h3>
                <h5 class="text-dark">Course Code: ${element.customCourseId}<span>3</span> </h3>
                <h5 class="text-dark">Course Credit <span>${element.totalCredit}</span></h3>
                <h5 class="text-dark">Grade Letter <span>${element.gradeLetter}</span></h3>
                <h5 class="text-dark">Grade Point <span class="text-success">${element.pointEquivalent}</span></h3>
            </div>
        `;
        parent.appendChild(child);
    });
    if (semesterId % 10 == 3) {
        semesterId = Math.round(semesterId / 10) + 1 + "1";
    }
    else {
        semesterId++;
    }
    loadData(id, semesterId);
}

const loadData = async (id, semesterId) => {

    const url = `http://software.diu.edu.bd:8189/result?grecaptcha=&semesterId=${semesterId}&studentId=${id}`;
    const res = await fetch(url);
    console.clear();
    const data = await res.json();

    if (data.length == 0) {
        return;
    }
    showResults(data, id, semesterId);

}


const getEvent = () => {
    const parent = document.getElementById('row-container');
    parent.innerText = '';

    const id = document.getElementById('id-input').value;
    let semesterId = '';
    for (let i = 0; i < id.length; i++) {
        if (id[i] == '-') {
            break;
        }
        else {
            semesterId += id[i];
        }
    }
    semesterId = parseInt(semesterId);
    loadData(id, semesterId);
    document.getElementById('id-input').value = '';
}



document.getElementById('input-button').addEventListener('click', getEvent);

