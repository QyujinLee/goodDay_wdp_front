import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

import moment from 'moment';

import * as android from 'lib/android';
import * as api from 'lib/api';

import * as ServiceConstants from 'constants/serviceConstants';

/**
 * 사용자 정보
 * @returns {Object}
 */
export function getUserInfo() {
    return android.extApp('01');
}

/**
 * App 통함 함수
 * @param {*} code 
 * @param {*} param 
 */
export function extApp(code, param) {
    return android.extApp(code, param)
}

/**
 * 1000단위 콤마
 * @param {string} str 
 * @returns {string}
 */
export function comma(str) {
    if (undefined === str || '' === str) {
        return '';
    } else {
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

}

/**
 * Data Type에 따른 split
 * @param {string} fromDate
 * @param {string} toDate
 * @param {string} searchType
 * @returns {string}
 */
export function dataSplit(fromDate, toDate, searchType) {

    if ('day' === searchType) {
        return moment(fromDate).format('MM.DD');
    } else if ('month' === searchType) {
        return moment(fromDate).format('MM');
    } else if ('week' === searchType) {
        return moment(fromDate).format('MM.DD') + '~' + moment(toDate).format('MM.DD');
    }
}

/**
 * Division에 따른 날짜 차이
 * division => years, months, days, hours, minutes, seconds
 * @param {string} fromDate
 * @param {string} toDate
 * @param {string} division
 * @returns {string}
 */
export function diffDate(fromDate, toDate, division) {
    return moment(toDate, 'YYYYMMDD').diff(moment(fromDate, 'YYYYMMDD'), division, false);
}

/**
 * 연도에 따른 한국나이 계산
 * @param {string} birth
 * @returns {Number}
 */
export function getKoreanAge(birth) {

    const birthYear = birth.substring(0, 4);
    const today = new Date();
    const nowYear = today.getFullYear();
    const age = nowYear - birthYear + 1; // 한국나이 + 1

    return age;
}

/**
 * 연도에 따른 만 나이 계산 
 * @param {string} birth
 * @returns {Number}
 */
export function getAge(birth) {

    const birthDay = new Date(moment(birth).format('YYYY/MM/DD'));
    const today = new Date();
    let age = today.getFullYear() - birthDay.getFullYear();

    birthDay.setFullYear(today.getFullYear());

    if (today < birthDay) {
        age--;
    }

    return age;
}

/**
 * 숫자 소수점 고정
 * @param {string} value
 * @param {string} bool
 * @returns {string}
 */
export function numberFixed(value, bool) {

    // 수치값 없을때
    if (undefined === value) {
        return '-';
    }

    if (bool) {
        // 일반적 숫자 표현
        return Number(value).toFixed(1).replace('.0', '');

    } else {
        // 시력 숫자 표현
        if (Number.isInteger(Number(value))) {
            return Number(value) + '.0';
        } else {
            return Number(value);
        }
    }
}

/**
 * UUID 반환
 * @returns {string}
 */
export function guid() {
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * 날짜 길이에 따른 포멧 반환
 * @param {string} str
 * @returns {string}
 */
export function momentDateFormat(str) {
    if (8 === str.length) {
        return moment(str).format('YYYY.MM.DD');
    } else if (6 === str.length) {
        return moment(str + '01').format('YYYY.MM');
    } else {
        return str;
    }
}

/**
 * 레포트 토글 전환 클래스 반환
 * @param {string} str
 * @returns {string}
 */
export function getToggleFocusClass(goalDissDivCd) {

    if (ServiceConstants.GOAL_DISS_DIV_CD_OBESITY === goalDissDivCd) {
        return ' measurement'
    } else if (ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_ANEMIA === goalDissDivCd) {
        return ' blood'
    } else if (ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_CHRONIC_DISEASES === goalDissDivCd) {
        return ' chronicDiseases'
    } else {
        return '';
    }
}

/**
 * 추이 값 Class 반환
 * @param {object} age
 * @returns {object}
 */
export function getTrendValueClass(trendData) {

    if (1 === Math.sign(trendData)) {
        // 양수
        return { 'age': 'older', 'calculation': 'plus', 'direction': '▲' };
    } else if (-1 === Math.sign(trendData)) {
        // 음수
        return { 'age': 'younger', 'calculation': 'minus', 'direction': '▼' };
    } else {
        // 제로
        return { 'age': 'same', 'calculation': '', 'direction': '' };
    }
}

/**
 * LineChart 값 반환
 * @param {string} str
 * @returns {object}
 */
export function getLineChartInfo(str) {

    if (undefined === str || '정상' === str) {
        return { 'color': 'rgb(109, 212, 0)', 'lineColor': 'rgb(109, 212, 0, 0.5)', 'class': 'normal' };
    } else if ('주의' === str || '비만' === str || '골다소증' === str) {
        return { 'color': 'rgb(250, 185, 0)', 'lineColor': 'rgb(250, 185, 0, 0.5)', 'class': 'caution' };
    } else if ('위험' === str || '고도비만' === str || '골다공증' === str) {
        return { 'color': 'rgb(224, 32, 32)', 'lineColor': 'rgb(224, 32, 0, 0.5)', 'class': 'danger' };
    } else {
        return { 'color': 'rgb(109, 212, 0)', 'lineColor': 'rgb(109, 212, 0, 0.5)', 'class': '' };
    }
}

/**
 * LineChartWidth With 반환
 * @param {Number} length
 * @returns {Number}
 */
export function getLineChartWidth(length) {

    let chartWidth = 0;
    const clientWidth = document.body.clientWidth;
    const lengthWidth = length * 85;

    if (lengthWidth < clientWidth) {
        chartWidth = clientWidth - 90;
    } else {
        chartWidth = lengthWidth;
    }

    return chartWidth;
}

/**
 * 체형나이 값 Class 반환
 * @param {object} age
 * @returns {object}
 */
export function getBodyAgeClass(bodyData) {

    if (1 === Math.sign(bodyData)) {
        // 양수
        return { 'gapage': 'over', 'agesign': '+' + bodyData };
    } else if (-1 === Math.sign(bodyData)) {
        // 음수
        return { 'gapage': 'less', 'agesign': bodyData };
    } else {
        // 제로
        return { 'gapage': '', 'agesign': bodyData };
    }
}

/**
 * 추이그래프 실제나이 계산 
 * @param {string} str
 * @returns {string}
 */
export function TrendgapDate(startAge, startgapAge, endAge, endgapAge) {

    const ageStart = 1 === Math.sign(startgapAge) ? Number(startAge) - Math.abs(startgapAge) : Number(startAge) + Math.abs(startgapAge);
    const ageEnd = 1 === Math.sign(endgapAge) ? Number(endAge) - Math.abs(endgapAge) : Number(endAge) + Math.abs(endgapAge);

    return ageEnd - ageStart;
}

/**
 * mix, max 지정 랜덤
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function boxRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * dropBox Style
 * @returns {object}
 */
export function dropBoxStyle() {

    const length = boxRandom(0, document.body.clientWidth);
    const velocity = boxRandom(200, 1000);
    const size = 40;

    const boxStyle = {
        width: size + 'px',
        height: size + 'px',
        left: length + 'px',
        transition: 'transform ' + velocity + 'ms ease-out 0s',
        background: 'url("../images/ico_coin.png") 0% 0% / contain'
    };

    return { boxStyle: boxStyle };
}

/**
 * 포인트 지급 처리
 * @param {sting} misnDivCd 미션구분
 * @param {sting} rwdMgmtId 보상관리ID
 * @returns {void}
 */
export function pointPayment(misnDivCd, rwdMgmtId) {

    const mission = { misnDivCd: misnDivCd };
    const getMissionMedi = api.getMissionMediAPI(mission);
    getMissionMedi.then((response) => {

        const responseData = response.data.data;
        const missionLength = responseData.length;

        const point = {
            type: 'point',
            reward: {
                rwdMgmtId: '',
                misnDtlSrno: '',
                misnHstSrno: '',
                ffmDt: ''
            }
        };

        let missionCheck = false;
        if (0 < missionLength) {
            // 미션있을 경우

            responseData.forEach((element, index) => {

                // 건강검진, 비만생체나이 대기 미션 있을 경우(미션 완료 처리, 미션 포인트 설정)

                if (!missionCheck && (
                    ServiceConstants.MISN_DTL_SRNO_HEALTH_REPORT_DAILY === element.misnDtlSrno ||
                    ServiceConstants.MISN_DTL_SRNO_INPUT_BODY_AGE_DAILY === element.misnDtlSrno ||
                    ServiceConstants.MISN_DTL_SRNO_INPUT_BODY_AGE_PROGRAM === element.misnDtlSrno)) {

                    // 미션 포인트 수령 여부 Y
                    element.pntRecvYn = 'Y';
                    point.reward.misnDtlSrno = element.misnDtlSrno;
                    point.reward.misnHstSrno = element.misnHstSrno;
                    point.reward.ffmDt = element.ffmDt;
                    missionCheck = true;

                } else {
                    element.pntRecvYn = 'N';
                }

                const postMissionDo = api.postMissionDoAPI(element);
                postMissionDo.then((response) => {
                    console.log('수행완료 처리');
                });
            });

            if (missionCheck) {
                // 포인트 팝업 요청(앱)
                extApp('06', JSON.stringify(point));
            }

        }

        if (!missionCheck && ('1' === misnDivCd || '2' === misnDivCd)) {
            // 미션이 없으면서 건강검진, 비만체형나이 일때

            // 일반 포인트 존재유무
            const param = { rwdMgmtId: rwdMgmtId };
            const getPointExistence = api.getPointExistenceAPI(param);
            getPointExistence.then((response) => {

                const existence = response.data.data.existence;

                // 포인트 지급 판단
                if (!JSON.parse(existence)) {

                    // 일반 포인트 설정
                    point.reward.rwdMgmtId = rwdMgmtId;
                    // 포인트 팝업 요청(앱)
                    extApp('06', JSON.stringify(point));
                }
            });
        }
    });
}

/**
 * 성별, 레벨 등급에 따른 레벨아이콘 클래스 반환
 * @param {object} 성별,레벨 
 * @returns {sting} my_level_ 클래스 명
 */
export function getLevelClassName(infoData) {

    let level = 'my_level_1';

    if (undefined !== infoData && undefined !== infoData.lvlVal &&
        undefined !== infoData.gndrDivCd && '' !== infoData.lvlVal && '' !== infoData.gndrDivCd) {
        if (ServiceConstants.MORE_PROFILE_GNDR_DIV_CD_FEMALE === infoData.gndrDivCd) {
            level = 'my_level_' + infoData.lvlVal + ' female';
        } else if (ServiceConstants.MORE_PROFILE_GNDR_DIV_CD_MALE === infoData.gndrDivCd) {
            level = 'my_level_' + infoData.lvlVal;
        }
    }

    return level;
}

/**
 * 레벨 등급에 따른 할인율 적립율 반환
 * @param 레벨, 할인or적립 
 * @returns {sting} 할인율or적립율
 */
export function getLevelDiscountAccumulation(levelData, division) {
    let discount = 3;
    let accumulation = '0.10';

    if ('Discount' === division) {
        if (2 < Number(levelData) && Number(levelData) < 8) {
            discount = Number(levelData) + 1;
        } else if (8 === Number(levelData)) {
            discount = '10';
        }
        return discount;
    } else if ('Accumulation' === division) {
        if ('2' === levelData) {
            return '0.20';
        } else if ('3' === levelData) {
            return '0.40';
        } else if ('4' === levelData) {
            return '0.70';
        } else if ('5' === levelData) {
            return '1.00';
        } else if ('6' === levelData) {
            return '1.50';
        } else if ('7' === levelData) {
            return '2.00';
        } else if ('8' === levelData) {
            return '2.5';
        } else {
            return accumulation;
        }
    }

}

/**
 * 체중, 키, 허리둘레, 엉덩이 둘레, 혈당, 혈압 입력시 입력된 값을 통해 스크롤 위치를 알아온다.
 * @param value 입력된 값
 * @param num 한 격자당 값
 * @return 스크롤 위치
 * 
 */
export function getScrollPosition(value, num) {
    num = num === undefined ? 0.2 : num;
    const baseWidth = 371;
    const slider = document.querySelector('.h_range_slider');
    const sliderWidth = slider.offsetWidth;
    const gab = (baseWidth - Number(sliderWidth)) / 2;
    
    const scrollLeft = value / num + gab;

    return scrollLeft;
}
/**
 * 체중, 키, 허리둘레, 엉덩이 둘레, 혈당, 혈압 입력시 스크롤 위치에 따라 값을 알아온다.
 * @param nowScroll 스크롤 위치
 * @param num 한 격자당 값
 * @return 값
 */
export function getValueByScrollPosition(nowScroll, num){
    num = num === undefined ? 0.2 : num;
    // num = 0.2;
    const baseWidth = 371;
    const slider = document.querySelector('.h_range_slider');
    const sliderWidth = slider.offsetWidth;
    const gab = (baseWidth - Number(sliderWidth)) / 2;
    let curCm = 0;
    if(nowScroll - gab <= 0)curCm = 0;
    else curCm = (nowScroll - gab) * num;
    return curCm
}
export function getBodyAgeDefaultValue(type){
    const gender = android.extApp('01').gndrDivCd;
    let defaultValue = 0;
    if(gender === ServiceConstants.MORE_PROFILE_GNDR_DIV_CD_MALE) {
        //남자일 경우
        if('height' === type){
            defaultValue = 174;
        } else if('bodyWeight' === type){
            defaultValue = 75;
        } else if('waistCircum' === type){
            defaultValue = 83;
        } else if('hipCircum' === type){
            defaultValue = 94;
        } else if('bloodPressureSystolic' === type){
            defaultValue = 120;
        } else if('bloodPressureDiastolic' === type){
            defaultValue = 80;
        } else if('bloodSugar' === type){
            defaultValue = 85;
        }
    } else {
        //여자일 경우
        if('height' === type){
            defaultValue = 162;
        } else if('bodyWeight' === type){
            defaultValue = 55;
        } else if('waistCircum' === type){
            defaultValue = 72;
        } else if('hipCircum' === type){
            defaultValue = 92;
        } else if('bloodPressureSystolic' === type){
            defaultValue = 120;
        } else if('bloodPressureDiastolic' === type){
            defaultValue = 80;
        } else if('bloodSugar' === type){
            defaultValue = 85;
        }
    }

    return defaultValue;
}
/**
 * 체중, 키, 허리둘레, 엉덩이 둘레, 혈당, 혈압 등의 값 범위
 * @param nowScroll 종류
 * @return {object} 범위
 */
export function getBodyAgeValueRange(type){
    if('height' === type){
        return {min : 100, max : 200};
    } else if('bodyWeight' === type){
        return {min : 10, max : 200};
    } else if('waistCircum' === type){
        return {min : 10, max : 200};
    } else if('hipCircum' === type){
        return {min : 10, max : 200};
    } else if('bloodPressure' === type){
        return {min : 1, max : 400};
    } else if('bloodSugar' === type){
        return {min : 1, max : 500};
    }
}

/**
 * PHR 입력값 유효성 검사
 * @param value // 입력 값
 * @param type // 페이지 타입 
 */
export function validBodyAgeInteger(value, type) {
    const regex = /[^0-9]/g;

    if(value.length >= 3) {
        value = value.substring(0,3);
    }

    let range = null;
    if('height' === type){
        range = {min : 100, max : 200};
    } else if('bodyWeight' === type){
        range = {min : 10, max : 200};
    } else if('waistCircum' === type){
        range = {min : 10, max : 200};
    } else if('hipCircum' === type){
        range = {min : 10, max : 200};
    } else if('bloodPressure' === type){
        range = {min : 1, max : 400};
    } else if('bloodSugar' === type){
        range = {min : 1, max : 500};
    }

    if(range.max < Number(value)) {
        value = range.max + '';
    }
    
    value = Number(value.replace(regex,''));

    return value;
}
/**
 * PHR 입력값 유효성 검사(소수점)
 * @param type phr 종류
 * @param 이전 값
 * @param 이벤트 객체
 * @return {string} 수정 된 값
 */
export function validBodyAgeFloat(type, oriValue, element){
    let curValue = element.target.value;
    let range = null;
    if('height' === type){
        range = {min : 100, max : 200};
    } else if('bodyWeight' === type){
        range = {min : 10, max : 200};
    } else if('waistCircum' === type){
        range = {min : 10, max : 200};
    } else if('hipCircum' === type){
        range = {min : 10, max : 200};
    } else if('bloodPressure' === type){
        range = {min : 1, max : 400};
    } else if('bloodSugar' === type){
        range = {min : 1, max : 500};
    }

    if(/^[0-9.]*$/.test(curValue) === false) {//숫자와 '.'만 허용
        curValue = oriValue;
    } else if(Number(curValue) > range.max) {//최대값을 초과한 경우
        curValue = range.max;
    } else if((curValue.match(/\./g) || []).length > 1) {//'.'가 2개이상일 경우
        curValue = oriValue;
    } else if((curValue.match(/\./g) || []).length === 1 ) {//소수점이 있을 경우
        const arr = curValue.split('.');
        if(arr[1].length > 1) {//소수점이하 1자리만 허용
            curValue = oriValue;
        } else {//숫자가 0으로 시작하는 경우 방지
            curValue = String(Number(arr[0])).concat('.').concat(arr[1]);
        }
    } else if((curValue.match(/\./g) || []).length === 0) {//소수점이 없을 경우
        curValue = Number(curValue);
    }
    
    element.target.value = curValue;
    return curValue;
}

/**
 * 종료 팝업 나타내기
 * @param title 
 * @param msg 
 */
export function showAlert(title, msg, btnType, callback) {

    let msgArr = [];
    let brFlag = false;

    if(msg.indexOf('<br/>') !== -1) {
        msgArr = msg.split('<br/>');
        brFlag = true;
    }

    if(undefined !== callback) { // 버튼이 두 개 이며 콜백함수가 있는 경우 (<br/>이 두 개 이상인 경우는 배제)

        confirmAlert({
            customUI : ({onClose}) => (
                <div className='popup_wrap'>
                    <div className='title'>{title}</div>
                    <div className='pop_conts'>
                        {!brFlag ? (
                            <p className='msg'>{msg}</p>
                        ) : (
                            <p className='msg'>{msgArr[0]}<br/>{msgArr[1]}</p>
                        )
                        
                        }
                        <ul className='pop_btns'>
                            <li>
                                <button className='btn_middle' onClick={callback}>
                                <span>{'remove' === btnType ? '삭제' : '종료'}</span>
                                </button>
                            </li>
                            <li>
                                <button className='btn_middle_red' onClick={onClose}>
                                    <span>취소</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        });

    } else { // 확인 버튼만 있는 경우

        confirmAlert({
            customUI : ({onClose}) => (
                <div className='popup_wrap'>
                    <div className='title'>{title}</div>
                    <div className='pop_conts'>
                        <p className='msg'>{msg}</p>
                        <ul className='pop_btns'>
                            <li>
                                <button className='btn_middle_red' onClick={onClose}>
                                    <span>확인</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        });

    }

}
/**
 * 검진/비만 상세 차트 화살표 위치 구하기
 * @param normalscope
 * @param value 사용자의 수치
 * @return {Number} left  
 */
export function getChartArwStyle(scope, value) {

    // style left 값을 구하기 위한 사용자 값과 범위 갯수 변수 선언
    let left = 0;
    const userValue = Math.abs(value);
    const scopeLength = scope.length;

    //화면 비율에 맞는 최솟값 최댓값을 구하기 위한 설정 
    const clientWidth = document.body.clientWidth;
    const Totalbar = clientWidth - 80
    const min = 40;
    const max = min + Totalbar;
    
    const scopeFilter = scope.filter(filterItem=>{
          return ServiceConstants.REF_NCL_DIV_CD_CAUTION === filterItem.refNclDivCd;
    });

    scope.forEach(element => {

        const scopeTermNormal = (ServiceConstants.REF_NCL_DIV_CD_NORMAL === element.refNclDivCd && undefined !== element.endVal ? element.endVal - element.strVal : element.strVal);
        const scopeTerm = (0 !== scopeFilter.length ? Math.abs(scopeFilter[0].endVal) - Math.abs(scopeFilter[0].strVal) : Math.abs(element.strVal));

        /* eslint-disable*/
        if (eval(element.strVal + element.strSymbNm + userValue)
            && eval(element.endVal ? userValue + element.strSymbNm + element.endVal : 1)) {

            if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === element.refNclDivCd) { //정상

                left = (min + ((userValue) / element.strVal) * Totalbar / scopeLength);

                if ('<=' === element.strSymbNm || '<' === element.strSymbNm) {
                    left = ((element.strVal / userValue) * Totalbar / scopeLength);
                    if (element.strVal !== scopeTermNormal) {
                        left = min + ((userValue - element.strVal) / (scopeTermNormal)) * ((Totalbar / scopeLength));
                    }
                    if (0 > element.strVal) {
                        left = (min + (Math.abs(userValue) / Math.abs(element.strVal)) * Totalbar / scopeLength);
                    }
                }

            } else if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === element.refNclDivCd) { //주의 or 비만   

                left = (((Totalbar / scopeLength) + min) + (userValue - Math.abs(element.strVal)) / (scopeTerm) * Totalbar / scopeLength);

            } else if (ServiceConstants.REF_NCL_DIV_CD_DANGER === element.refNclDivCd) { //위험 or 고도비만
               
                left = ((((Totalbar / scopeLength) * (scopeLength - 1)) + min) + (userValue - (element.strVal)) / (scopeTerm) * (Totalbar / scopeLength));

                if ('>=' === element.strSymbNm || '>' === element.strSymbNm) {
                    left = ((((Totalbar / scopeLength) * (scopeLength - 1)) + min) + ((element.strVal) - userValue) / (scopeTerm) * Totalbar / scopeLength);
                    if (0 > element.strVal) {
                        left = ((((Totalbar / scopeLength) * (scopeLength - 1)) + min) + (Math.abs(userValue) - Math.abs(element.strVal)) / (scopeTerm) * Totalbar / scopeLength);
                    }
                }
            }
        }
    });

    if (min >= left) {
        return min;
    } else if (max < left) {
        return max;
    } else {
        return left;
    }

}
