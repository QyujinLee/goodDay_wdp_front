/**
 * Call App Function
 * 01 : 사용자 정보 조회
 * 02 : 페이지 닫고 Main으로 가기(앱)
 * 03 : 검강검진 레포트 불러오기(공인인증서) (앱)
 * 04 : 하단 GND 제어 (앱), 닫기 버튼이난 뒤로 가기 버튼이 있을 경우 지움 -  'gone' 가리기, 'visible' 보이기
 * 05 : 데이터 로딩 종료 알림 전송 - Success , Fail
 * 06 : 포인트 팝업 요청
 * 07 : 현재 사용하지 않음
 * 08 : 앱 로딩 요청
 * 09 : 쇼핑 페이지 요청
 * 10 : 스텝 페이지 요청
 * 11 : 로그아웃
 * @param {*} code 
 * @param {*} param 
 */
export function extApp(code, param) {
    console.log('extApp : ', code, param);
    if (window.android) {//app가 연결되었을 경우
        if (code === '01') {
            return JSON.parse(window.android.extApp(code, param));
        } else if (code === '04') {

            // 스크롤 최상단으로 셋팅
            window.scrollTo(0, 0);
            
            if (document.getElementsByClassName('close_btn').length > 0 || document.getElementsByClassName('arrow_lft').length > 0) {
                param = 'gone';
            } else {
                param = 'visible';
            }
        }
        return window.android.extApp(code, param);
    } else {// app가 연결되지 않았을 경우
        if (code === '01') {
            return {
                usrId: 'hiyun',
                usrNm: '윤현일',
                nickNm: '현일',
                brthDt: '19780119',
                gndrDivCd: '001001',
                tlno: '01040408516',
                emailAddr: 'hiyun@openit.co.kr',
                lvlVal: '1',
                picLocNm: '/images/idphoto/hiyun.jpg',
                delYn: 'N',
                regDtm: '2020-03-09 11:27:32',
                regUsrId: 'hiyun',
                modDtm: '2020-03-09 11:27:32',
                modUsrId: 'hiyun'
            };
        }
    }
}

/**
 * Called By App
 * 01 : 걸음 수 조회 이벤트 호출
 * 02 : mission id 수신
 * 03 : 포인트 지급 요청
 * 04 : 검진연동 후 호출
 * 05 : 뒤로 가기
 * @param {*} code 
 * @param {*} param 
 */
window.extWeb = (code, param) => {
    try {
        console.log("========extWeb=================",code, param);
        switch (code) {
            case '01':
                window.stepsContainer.extSetStepsData(param);
                break;
            case '02':
                window.missionContainer.extSetMisnSrno(param);
                break;
            case '03':
                window.pointContainer.extSetPoint(param);
                break;
            case '04':
                window.reportContainer.extSetReportPointPayment();
                break;
            case '05':
                if(document.getElementsByClassName('arrow_lft').length !== 0){ // 화면에 뒤로가기 버튼이 있을 경우 클릭 이벤트 발생
                    (document.getElementsByClassName('arrow_lft')[0]).click();
                } else if(document.getElementsByClassName('close_btn').length !== 0) { // 화면에 닫기 버튼이 있을 경우 클릭 이벤트 발생
                    (document.getElementsByClassName('close_btn')[0]).click();
                } else { // 뒤로가기 버튼이 없을 경우 앱에 종료 이벤트 전달
                    extApp('02');
                }
                break;
            default:
                console.log('Unsupported Code!!')
                break;
        }
    } catch(error) {
        console.log('error : ', error);
    }
}