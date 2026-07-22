const subjectInput = document.querySelector("#subject");
const creditInput = document.querySelector("#credit");
const gradeInput = document.querySelector("#grade");
const addBtn = document.querySelector("#addBtn");
const tableBody = document.querySelector("#tableBody");
const gpaResult = document.querySelector("#gpaResult");

let courses = [];

addBtn.addEventListener("click", addCourse);

function addCourse() {
    const subject = subjectInput.value.trim();
    const credit = Number(creditInput.value);
    const grade = Number(gradeInput.value);

    if (subject === "" || credit <= 0) {
        alert("กรุณากรอกชื่อวิชาและหน่วยกิตให้ถูกต้อง");
        return;
    }

    courses.push({
        subject,
        credit,
        grade
    });

    renderTable();

    subjectInput.value = "";
    creditInput.value = "";
    gradeInput.value = "4";
}

function renderTable() {
    tableBody.innerHTML = "";

    let totalCredit = 0;
    let totalPoint = 0;

    courses.forEach((course, index) => {

        const point = course.credit * course.grade;

        totalCredit += course.credit;
        totalPoint += point;

        tableBody.innerHTML += `
            <tr>
                <td>${course.subject}</td>
                <td>${course.credit}</td>
                <td>${course.grade.toFixed(1)}</td>
                <td>${point.toFixed(2)}</td>
                <td>
                    <button class="deleteBtn" data-index="${index}">
                        ลบ
                    </button>
                </td>
            </tr>
        `;
    });

    const gpa = totalCredit === 0 ? 0 : totalPoint / totalCredit;

    gpaResult.textContent = `GPA : ${gpa.toFixed(2)}`;

    document.querySelectorAll(".deleteBtn").forEach(button => {

        button.addEventListener("click", (event) => {

            const index = Number(event.target.dataset.index);

            courses.splice(index, 1);

            renderTable();

        });

    });

}