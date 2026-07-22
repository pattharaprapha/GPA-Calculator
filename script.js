const subjectInput = document.querySelector("#subject");
const creditInput = document.querySelector("#credit");
const scoreInput = document.querySelector("#score");
const addBtn = document.querySelector("#addBtn");
const tableBody = document.querySelector("#tableBody");
const gpaResult = document.querySelector("#gpaResult");


let courses = [];


// ==============================
// ป้องกันช่องหน่วยกิตใส่ทศนิยม
// ==============================

creditInput.addEventListener("keydown", function (event) {

    const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab"
    ];


    // ไม่ให้กด . , e + -
    if (
        event.key === "." ||
        event.key === "," ||
        event.key === "e" ||
        event.key === "E" ||
        event.key === "+" ||
        event.key === "-"
    ) {
        event.preventDefault();
    }


    // อนุญาตเฉพาะตัวเลข
    if (
        !/[0-9]/.test(event.key) &&
        !allowedKeys.includes(event.key)
    ) {
        event.preventDefault();
    }

});


// ป้องกันการวางค่า เช่น 2.5
creditInput.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});





addBtn.addEventListener("click", addCourse);





function getGrade(score) {


    if (score >= 80) return { letter: "A", point: 4.0 };
    if (score >= 75) return { letter: "B+", point: 3.5 };
    if (score >= 70) return { letter: "B", point: 3.0 };
    if (score >= 65) return { letter: "C+", point: 2.5 };
    if (score >= 60) return { letter: "C", point: 2.0 };
    if (score >= 55) return { letter: "D+", point: 1.5 };
    if (score >= 50) return { letter: "D", point: 1.0 };


    return { letter: "F", point: 0 };

}





function addCourse() {


    const subject = subjectInput.value.trim();

    const credit = Number(creditInput.value);

    const score = Number(scoreInput.value);



    if (

        subject === "" ||

        credit <= 0 ||

        !Number.isInteger(credit) ||

        score < 0 ||

        score > 100 ||

        Number.isNaN(score)

    ) {


        alert("กรุณากรอกข้อมูลให้ถูกต้อง (หน่วยกิตต้องเป็นจำนวนเต็ม)");

        return;

    }





    const grade = getGrade(score);



    courses.push({

        subject,

        credit,

        score,

        letter: grade.letter,

        point: grade.point

    });





    renderTable();




    subjectInput.value = "";

    creditInput.value = "";

    scoreInput.value = "";

}





function renderTable() {


    tableBody.innerHTML = "";


    let totalCredit = 0;

    let totalPoint = 0;





    courses.forEach((course, index) => {


        const gradePoint = course.credit * course.point;



        totalCredit += course.credit;

        totalPoint += gradePoint;





        tableBody.innerHTML += `

        <tr>

            <td>${course.subject}</td>

            <td>${course.credit}</td>

            <td>${course.score}</td>

            <td>${course.letter}</td>

            <td>${course.point.toFixed(1)}</td>

            <td>${gradePoint.toFixed(2)}</td>


            <td>

                <button class="deleteBtn" data-index="${index}">
                    ลบ
                </button>


            </td>


        </tr>

        `;


    });





    const gpa = totalCredit === 0

        ? 0

        : totalPoint / totalCredit;





    gpaResult.textContent = `GPA : ${gpa.toFixed(2)}`;






    document.querySelectorAll(".deleteBtn").forEach(button => {



        button.addEventListener("click", function(event) {



            const index = Number(event.target.dataset.index);



            courses.splice(index, 1);



            renderTable();



        });



    });



}