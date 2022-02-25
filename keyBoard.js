// 유니코드의 경우 한글
// 110 ~ 11FF (256)                한글자모
// 3130 ~ 318F (96)              호환용 한글 자모
// AC00 ~ D7AF (11184)       한글음절

// 호환용 한글 자모 : ㄱㄴㄷㄹㅁ.. ㅏㅑㅓㅕ 의 자음 모음이 문자로 쓰일 때 문자들 나열
// 한글 음절 : 일반적으로 유니코드 한글이라고 불리는 부분 / 표현될 수 있는 모든 한글 나열되어 있음 , 총 11184자
// 한글 음절 규칙 : 19개의 초성(ㄱㄴㄷㄹ..), 21개의 중성(ㅏㅑㅐ..), 28개의 종성(ㄱㄴㄷㄹ..)이 3차원 배열로 나열
// 종성이 x 축 / 중성이 y축 / 초성이 z축 
// 3차원 배열이기 때문에, 각각을 곱해서 전체 개수를 구할 수 있음 -> 19 X 21 X 28 = 총 11172자 조합

// 공식 : 1차원배열위치 = ((z * y길이) + y) * x길이 + x / x는 종성 y는 중성 z는 초성
// 한글음절위치 = ((초성 * 21) + 중성) * 28 + 종성

// 자음, 모음, 겹자음 & 쌍자음 인덱스

// 초성 19개
const chosung_index = ["ㄱ", "ㄲ", "ㄴ" ,"ㄷ" ,"ㄸ" ,"ㄹ" ,"ㅁ" ,"ㅂ" ,"ㅃ" ,"ㅅ" ,"ㅆ" ,"ㅇ" ,"ㅈ" ,"ㅉ" ,"ㅊ" ,"ㅋ" ,"ㅌ" ,"ㅍ" ,"ㅎ"]; 
// console.log(`초성length::: ${chosung_index.length}`);

// 중성 21개
const joongsung_index = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"]; 
// console.log(`중성length::: ${joongsung_index.length}`);

// 종성 28개
const jongsung_index = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ","ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
// console.log(`종성length::: ${jongsung_index.length}`);

const Jcombo_index =["ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ" ,"ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅄ"]; 
const Jcombo =["ㄱㅅ", "ㄴㅈ", "ㄴㅎ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅂㅅ"];
const Mcombo_index =['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']; 
const Mcombo = ['ㅗㅏ', 'ㅗㅐ', 'ㅗㅣ', 'ㅜㅓ', 'ㅜㅔ', 'ㅜㅣ', 'ㅡㅣ'];

let id_check = '';

// 클릭한 textarea 아이디값 찾기
$('.textArea').click(function() {
    id_check = $(this).attr('id');
    // console.log(`id확인 ::: ${id_check}`);
})

// 1. 마지막 글자 초성, 중성, 종성, 인덱스 구하기 
let chosung;
let joongsung;
let jongsung;

let jong_idx;
let joong_idx;
let cho_idx;

// 확인중
let num;

// 자음, 모음 판별 함수
const JM = function(char_uni) {
    if(char_uni >= 12593 && char_uni <= 12622) {
        return "J";
    } else if(char_uni >= 12623 && char_uni <= 12643){
		return "M";
	}else{
		return "";
	}
}

$('.key').on('click', function() {

    // 버튼 입력값 `
    let key = $(this).val();
    // console.log(`key입력값 ::: ${key}`);

    // 글자 합쳐서 나오는 값
    let hangeul = "";

    // textarea란에 있는 값 
    let text = $(`#${id_check}`).val();
    // console.log(`아이디값 text 확인::: ${text}`);

    // textarea란에 있는 마지막 값  
    let lastText = text.substring(text. length-1);
    // consol.log(`lastText 확인 ::: ${lastText}`);

    // space key
    if(key === "space") {
        key = ' ';
        $(`#${id_check}`).val(text + key);
        $(`#${id_check}`).focus();

    } else if(key === "←") {
        // backspace key
        console.log(`text값 확인 ::: ${text}`);
        text = text.substring(0, text.length-1);
        // console.log(`지우기 text ::: ${text}`);
        
        // 아스키코드로 변환
        // const charCode = text.charCodeAt(text);
        // text = String.fromCharCode(charCode - num);
        // console.log(`아스키코드 확인 text ::: ${charCode}`);
        // console.log(`아스키코드 확인 key ::: ${num}`);
        $(`#${id_check}`).val(text);
        $(`#${id_check}`).focus();

    } else if(lastText !== "") {
        // 마지막 문자가 공백이 아닐 경우 실행

        // 마지막 문자 유니코드
        const lastText_uni = lastText.charCodeAt(0);

        // 마지막 문자가 하나의 자음만 있는 경우
        if(JM(lastText_uni) === 'J') {
            chosung = lastText;
            joongsung = '';
            jongsung = '';

        } else if(JM(lastText_uni) === 'M') {
            // 마지막 문자가 하나의 모음만 있는 경우

            chosung = '';
            joongsung = lastText;
            jongsung = '';

        }else {
            // 마지막 문자가 하나의 자음이나 모음이 아닐 경우

            // 마지막 문자에서 AC00을 뺌
            const lastChar_uni_cal = lastText_uni - 44032;

            // 마지막 문자의 초성, 중성, 종성의 인덱스 구하기
            // 한글 음절 위치 = ((초성index * 21) + 중성index) * 28 + 종성index
            jong_idx = lastChar_uni_cal % 28;
            // console.log(`jong_idx::: ${jong_idx}`);
            joong_idx = (Math.floor(lastChar_uni_cal/28)) % 21;
            // console.log(`joong_idx::: ${joong_idx}`);
            cho_idx = Math.floor((Math.floor(lastChar_uni_cal / 28)) / 21);
            // console.log(`cho_idx::: ${cho_idx}`);

            // 마지막 문자의 초성, 중성, 종성 구하기
            chosung = chosung_index[cho_idx];
            joongsung = joongsung_index[joong_idx];
            jongsung = jongsung_index[jong_idx];
        }

        console.log(`마지막문자 :::  ${lastText}`);
		console.log(`마지막 문자의 초성, index :::  ${chosung}, ${cho_idx}`);
		console.log(`마지막 문자의 중성, index :::  ${joongsung}, ${joong_idx}`);
		console.log(`마지막 문자의 종성, index ::: ${jongsung}, ${jong_idx}`);
        // 마지막 문자가 하나의 자음이나 모음이 아닌 경우 초성, 중성, 종성구하기 여기까지가 끝
        

        // 2. 방금 친 글자가 자음인지 모음인지 구별
        const key_jm = JM(key.charCodeAt(0));
        num = key.charCodeAt(key);
        console.log(`방금 친 글자 ::: ${key} / 자음모음 ::: ${key_jm}`);

        let str_uni;
        let key_idx;


        // 3. 글자 재조합
        // 앞에 자음만 있는 경우 + 자음
        if(lastText === chosung&&key_jm === 'J') {
            console.log(`앞에 자음만 있는 경우 + 자음`);

            let newJa = chosung + key;

            // 앞자음 + 뒷자음 = 콤보
            if(Jcombo.indexOf(newJa) !== -1) {
                newJa = Jcombo_index[Jcombo.indexOf(newJa)];

                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text+newJa);
                $(`#${id_check}`).focus();
            }
            // 앞자음 + 뒺자음 = 콤보X
            else {
                $(`#${id_check}`).val(text+key);
                $(`#${id_check}`).focus();
            }
        }
        // 앞에 자음만 있는 경우 + 모음
        else if(lastText === chosung&&key_jm === 'M') {
            console.log('앞에 자음만 있는 경우 + 모음');
            key_idx = joongsung_index.indexOf(key);
            
            // 앞 자음이 콤보인 경우
            if(Jcombo_index.indexOf(lastText) !== -1) {

                const newJa = Jcombo[Jcombo_index.indexOf(lastText)];
                // console.log(`newJa ::: ${newJa}`);
                const newJa1 = newJa.substring(0, 1);
                // console.log(`newJa1 ::: ${newJa1}`);
                const newJa2 = newJa.substring(1, newJa.length);
                // console.log(`newJa2 ::: ${newJa2}`);

                console.log(`앞 자음의 콤보 쪼개기 ::: ${newJa1}, ${newJa2}`);

                const newJa2_idx = chosung_index.indexOf(newJa2);

                const str_uni = ((newJa2_idx * 21) + key_idx) * 28 + 44032;
                const str = String.fromCharCode(str_uni);

                hangeul = newJa1 + str;
                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text + hangeul);
                $(`#${id_check}`).focus();

            } else {
                // 앞 자음이 콤보가 아닌 경우 
                // ㄱ + ㅏ : 가
                cho_idx = chosung_index.indexOf(chosung);
                // console.log(`cho_idx ::: ${cho_idx}`); // 11
                // console.log(`key_idx ::: ${key_idx}`); // 2

                const str_uni = ((cho_idx * 21) + key_idx) * 28 + 44032;
                // console.log(`str_uni::: ${str_uni}`) // 50556

                let hangeul = String.fromCharCode(str_uni);
                console.log(`hangeul ::: ${hangeul}`);

                text = text.substring(0, text.length -1);
                console.log(`text확인 ::: ${text}`);

                $(`#${id_check}`).val(text+hangeul);
                $(`#${id_check}`).focus();
            }
        }
        // 앞에 모음만 있는 경우 + 자음
        else if(lastText === joongsung&&key_jm === 'J') {
            console.log('앞에 모음만 있는 경우 + 자음');

            $(`#${id_check}`).val(text + key);
            $(`#${id_check}`).focus();
        }
        // 앞에 모음만 있는 경우 + 모음
        else if(lastText === joongsung&&key_jm === 'M') {
            console.log("앞에 모음만 있는 경우 + 모음");

            let newChar = lastText + key;

            // 모음이 콤보인 경우
            if (Mcombo.indexOf(newChar) !== -1) {
                newChar = Mcombo_index[Mcombo.indexOf(newChar)];

                text = text.substring(0, text.length -1);

                $(`#${id_check}`).val(text + newChar);
                $(`#${id_check}`).focus();

            } else {
                // 모음이 콤보가 아닌 경우
                $(`#${id_check}`).val(text + key);
                $(`#${id_check}`).focus();
            }
        }
        // 3-1 이전 글자 종성이 있는 경우 + 자음
        else if(jongsung !== '' && key_jm === 'J') {
            console.log('이전 글자 종성이 있는 경우 + 자음');
            let newJong_idx = Jcombo.indexOf(jongsung + key);
            console.log(`newJong_idx ::: ${newJong_idx}`);

            // 이전 글자 종성 + 입력한 자음이 Combo 에 있는 경우
            // 갈 +ㄱ = 갉
            if(newJong_idx !== -1) {
                newJong = Jcombo_index[newJong_idx];
                newJong_idx = jongsung_index.indexOf(newJong);
                
                str_uni = ((cho_idx * 21) + joong_idx) * 28 + newJong_idx + 44032;
                hangeul = String.fromCharCode(str_uni);
                console.log(`새로 조합한 문자 ::: ${hangeul}`);

                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text + hangeul);
                $(`#${id_check}`).focus();

            } else {
                // 이전글자 종성 + 입력한 자음이 Combo 에 없는 경우 
                // 각 + ㅇ = 각ㅇ
                $(`#${id_check}`).val(text + key);
                $(`#${id_check}`).focus();
            }
        }
        // 3-2 이전 글자 종성이 있는 경우 + 모음 (강 + ㅏ = 가아 / 값 + ㅏ = 갑 사)
        else if(jongsung !== '' && key_jm === 'M') {
            console.log('이전 글자 종성이 있는 경우 + 모음');
            let newJong_idx = Jcombo_index.indexOf(jongsung);
            key_idx = joongsung_index.indexOf(key);

            // 종성이 콤보인 경우
            if(newJong_idx !== -1) {
                let newJong = Jcombo[newJong_idx];
                const newJong1 = newJong.substring(0, 1);
                const newJong2 = newJong.substring(1, newJong.length);

                const newJong1_idx = jongsung_index.indexOf(newJong1);
                const newJong2_idx = chosung_index.indexOf(newJong2);

                const str_uni1 = ((cho_idx * 21) + joong_idx) * 28 + newJong1_idx + 44032;
                const str_uni2 = ((newJong2_idx * 21) + key_idx) * 28 + 44032;

                hangeul = String.fromCharCode(str_uni1) + String.fromCharCode(str_uni2);
                console.log(`새로 조합한 문자 ::: ${hangeul}`);

                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text + hangeul);
                $(`#${id_check}`).focus();

            } else {
                // 종성이 콤보가 아닌 경우 ( 강 + ㅏ = 가 아)
                const newCho_idx = chosung_index.indexOf(jongsung);

                const str_uni1 = ((cho_idx * 21) + joong_idx) *28 + 44032;
                const str_uni2 = ((newCho_idx * 21) + key_idx) * 28 + 44032;
                console.log(`jong_idx::: ${jong_idx}`);

                hangeul = String.fromCharCode(str_uni1) + String.fromCharCode(str_uni2);
                console.log(`새로 조합한 문자 ::: ${hangeul}`);

                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text + hangeul);
                $(`#${id_check}`).focus();
            }
        }
        // 3-3 이전 글자에 종성이 없는 경우 + 자음 (가 + ㅇ = 강 / 가 + ㅉ = 가ㅉ)
        else if(jongsung == ''&& key_jm === 'J') {
            console.log('이전 글자 종성이 없는 경우 + 자음');
            key_idx = jongsung_index.indexOf(key);

            // 입력한 자음이 받침이 될 수 없는 경우 
            if(key_idx !== -1) {
                str_uni = ((cho_idx * 21)+ joong_idx) * 28 + key_idx + 44032;
                hangeul = String.fromCharCode(str_uni);

                console.log(`새로 조합한 문자 ::: ${hangeul}`);

                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text + hangeul);
                $(`#${id_check}`).focus();
            } else {
                // 입력한 자음이 받침이 될 수 없는 경우
                $(`#${id_check}`).val(text + key);
                $(`#${id_check}`).focus();
            }
        }
        // 3-4 이전 글자 종성이 없는 경우 + 모음
        else if(jongsung === '' && key_jm === 'M') {
            console.log('이전글자 종성이 없는 경우 + 모음');
            let mCom = joongsung + key; // ㅜ ㅣ
            let mCom_idx = Mcombo.indexOf(mCom);

            // 이전글자 모음(중성) + 친 글자(모음) = 콤보인 경우 (구 + ㅣ = 귀)
            if(mCom_idx !== -1) {
                mCom = Mcombo_index[mCom_idx];
                mCom_idx = joongsung_index.indexOf(mCom);
                str_uni = ((cho_idx * 21) + mCom_idx) * 28 + 44032;
                hangeul = String.fromCharCode(str_uni);
                console.log(`새로 조합한 문자 ::: ${hangeul}`);

                text = text.substring(0, text.length -1);
                $(`#${id_check}`).val(text + hangeul);
                $(`#${id_check}`).focus();
            } else {
                // 이전 글자 모음(중성) + 친글자(모음) 콤보 아닌 경우 ( 구 + ㅏ = 구ㅏ)
                console.log('이전글자 모음 + 친글자 모음');

                $(`#${id_check}`).val(text + key);
                $(`#${id_check}`).focus();
            }

        } 
    } else {
        //input란에  바로 출력
		$(`#${id_check}`).val(text+key);
		$(`#${id_check}`).focus();
    }
});