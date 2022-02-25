// 자바스크립트로 행 추가하기
function addRow() {
    // table element 확인 
    const table = document.getElementById("writeTable");

    // 행 추가
    const newRow1 = table.insertRow(2);
    const newRow2 = table.insertRow(3);
    
    // 추가한 행에 cell 추가~
    const newCell1 = newRow1.insertCell(0);
    const newCell2 = newRow1.insertCell(1);
    const newCell3 = newRow1.insertCell(2);
    
    const newCell4 = newRow2.insertCell(0);
    const newCell5 = newRow2.insertCell(1);
    const newCell6 = newRow2.insertCell(2);
    
    newCell1.innerHTML = "<input type='checkbox' class='checkbox-test' id='1'>";
    newCell2.innerText = "Title";
    newCell3.innerHTML = "<textarea name=\"title\" id=\"utitle\" class=\"textArea\" rows=\"1\" cols=\"55\" placeholder=\"title\" maxlength=\"100\" required></textarea>";
    newCell4.innerHTML = "<input type='checkbox' class='checkbox-test' id='2'>";
    newCell5.innerText = "Comment";
    newCell6.innerHTML = '<textarea name="content" id="ucontent" class="textArea" placeholder="comment" required></textarea>';
}

// jquery로 값 추가하기
$('#btn-add-row').click(function() {
    // 총 tr 숫자
    let num = $('#writeTable > tbody tr').length;
    // console.log(`총 숫자 ::: ${num}`);

    $('#writeTable > tbody > tr').eq(num-2).after(`
        <tr class ="row1">
            <td>
                <input type="checkbox" class="checkbox-test" id="${num}">
            </td>
            <td width="120" align="center">
            Title
            </td>
            <td width="400">
                <textarea name="title" id="utitle" class="textArea" rows="1" cols="55" placeholder="title" maxlength="100" required></textarea>
            </td>
        </tr>
        <tr class ="row2">
            <td>
                <input type="checkbox" class="checkbox-test" id="${num+1}">
            </td>
            <td height="300" align="center">
            Comment
            </td>
            <td>
                <textarea name="content" id="ucontent" class="textArea" placeholder="comment" required></textarea>
            </td>
        </tr>
    `);
})

// 동시 체크 ajax, jquery 확인 
// $('.checkbox-test').click(function() {
    // let checkId = Number($(this).attr("id"));
//     // let checkVal = $(this).parent().parent();
//     // const nextCheckVal = checkVal.next('tr');
//     // const prevCheckVal = checkVal.prev('tr');
//     // console.log(`확인값:::: ${nextCheckVal}`);
//     const isCheck = this.checked;
//     // console.log(`체크박스값 ::: ${checkVal}`);
//     // console.log(`isCheck값 ::: ${isCheck}`);

//     if(isCheck === true) {
//         // 만약에 체크박스 id가 홀수면 다음 번호 선택, 짝수면 그 전번호 선택
//         if(checkId%2 === 1) {
//             // 홀수 -> +1
//             checkId++;
//             $(`#${checkId}`).prop("checked", true);
//             // $(`input:checkbox[${nextCheckVal}]`).prop("checked", true);
            
//         } else if(checkId%2 === 0) {
//             // 짝수 -> -1
//             checkId--;
//             $(`#${checkId}`).prop("checked", true);
//         }
//     } else {
//         if(checkId%2 === 1) {
//             // 홀수 -> +1
//             checkId++;
//             $(`#${checkId}`).prop("checked", false);
//         } else if(checkId%2 === 0) {
//             // 짝수 -> -1
//             checkId--;
//             $(`#${checkId}`).prop("checked", false);
//         }
//     }    
// })

// 삭제
$('#btn-delete').click(function() {

    if($('table input:checkbox:checked').length === 0) {
        // 선택된 행이 없는 경우
        alert('삭제할 행을 선택하세요.');
    } else {
        $('input[type=checkbox]:checked').each(function(index) {
            // 체크박스 포함된 행 제거
            let checkId = Number($(this).attr("id"));
            const clickedRow = $(this).parent().parent();

            if(checkId%2 === 1) {
                const clickedRowNext = clickedRow.next("tr");
                clickedRow.remove();
                clickedRowNext.remove();

            } else if(checkId%2 === 0) {
                const clickRowPrev = clickedRow.prev("tr");
                clickedRow.remove();
                clickRowPrev.remove();
            }
        });
    }
})
