import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputBodyAgeHeight from 'components/InputBodyAgeHeight';
import InputBodyAgeWeight from 'components/InputBodyAgeWeight';
import InputBodyAgeWaist from 'components/InputBodyAgeWaist';
import InputBodyAgeHip from 'components/InputBodyAgeHip';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import * as inputBodyAgeActions from 'modules/inputBodyAge';
import * as activityPhrActions from 'modules/activityPhr';

class InputBodyAgeContainer extends Component {

    componentDidMount() {

        const { misnDtlSrno, InputBodyAgeActions, ActivityPhrActions } = this.props;

        utils.extApp('04');
        utils.extApp('05', 'Success');
        
        // 몸무게 입력 7회 미션 진입 시
        if('' !== misnDtlSrno && ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_START <= misnDtlSrno 
            && ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_END >= misnDtlSrno) {

            // 줄자 타입 설정
            ActivityPhrActions.setSlideRulerType({
                slideRulerType : 'weight'
            });
            
            InputBodyAgeActions.setInputBodyAgeWeight({
                bodyWeight: utils.getBodyAgeDefaultValue('bodyWeight')
            });

            InputBodyAgeActions.setInputBodyAgeType({
                ageType: 'weight'
            });

        } else {

            // 신장 기본 Set
            InputBodyAgeActions.setInputBodyAgeHeight({
                height: utils.getBodyAgeDefaultValue('height')
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { InputBodyAgeActions, slideRulerType } = this.props;

        const nextBodyAge = this.props.inputBodyAge;
        const prevAgeType = prevProps.inputBodyAge.get('ageType');
        const nextAgeType = this.props.inputBodyAge.get('ageType');
        const prevHeight = prevProps.inputBodyAge.get('height');
        const nextHeight = this.props.inputBodyAge.get('height');
        const prevWeight = prevProps.inputBodyAge.get('bodyWeight');
        const nextWeight = this.props.inputBodyAge.get('bodyWeight');
        const prevWaist = prevProps.inputBodyAge.get('waistCircum');
        const nextWaist = this.props.inputBodyAge.get('waistCircum');
        const prevHip = prevProps.inputBodyAge.get('hipCircum');
        const nextHip = this.props.inputBodyAge.get('hipCircum');
        
        // ageType 변경 시에만 실행
        if (prevAgeType !== nextAgeType) {
            let type = 'height';
            let value = 0;
            if('height' === nextAgeType){
                type = 'height';
                value = nextBodyAge.get(type) === '' ? utils.getBodyAgeDefaultValue(type) : Number(nextBodyAge.get(type));

                InputBodyAgeActions.setInputBodyAgeHeight({
                    height: value
                });

            } else if('weight' === nextAgeType){
                type = 'bodyWeight';
                value = nextBodyAge.get(type) === '' ? utils.getBodyAgeDefaultValue(type) : Number(nextBodyAge.get(type));

                InputBodyAgeActions.setInputBodyAgeWeight({
                    bodyWeight: value
                });

            } else if('waist' === nextAgeType){
                type = 'waistCircum';
                value = nextBodyAge.get(type) === '' ? utils.getBodyAgeDefaultValue(type) : Number(nextBodyAge.get(type));

                InputBodyAgeActions.setInputBodyAgeWaist({
                    waistCircum: value
                });

            } else if('hip' === nextAgeType) {
                type = 'hipCircum';
                value = nextBodyAge.get(type) === '' ? utils.getBodyAgeDefaultValue(type) : Number(nextBodyAge.get(type));

                InputBodyAgeActions.setInputBodyAgeHip({
                    hipCircum: value
                });

            }
            
            // 페이지 타입과 줄자 타입이 같을 때만 캐릭터 조정
            if(nextAgeType === slideRulerType) {
                this.handleScroll();
            }
        }

        // 스크롤 제어
        if(prevHeight !== nextHeight || prevWeight !== nextWeight || prevWaist !== nextWaist || prevHip !== nextHip) {
            this.handleScroll();
        }
    }

    /**
    * 비만 체형 나이 분석 프로세스
    * @returns {void}
    */
    postPhrBodyAnalysisProcess(missionParam) {

        const { inputBodyAge, misnDtlSrno } = this.props;

        const params = {
            bodyWeight: inputBodyAge.get('bodyWeight'),
            height: inputBodyAge.get('height'),
            hipCircum: inputBodyAge.get('hipCircum'),
            waistCircum: inputBodyAge.get('waistCircum')
        };

        try {
            // 비만 체형 나이 분석 API 호출
            const postPhrBodyAnalysisAPI = this.postPhrBodyAnalysisAPI(params);
            
            // 레포트용 앱 로딩 요청
            utils.extApp('08', '3');
            
            postPhrBodyAnalysisAPI.then((response) => {

                if (undefined !== response[0] && 200 === response[0].status) {

                    if(undefined !== misnDtlSrno && '' !== misnDtlSrno) {
                        this.postMissionDoProcess(missionParam);
                    } else {
                        // 성공 시 report 페이지로 이동
                        window.location.href = '/report?pointPayment=true';
                    }

                } else {
                    console.log('API request fail : ', response)
                }

            });

        } catch (error) {
            console.log('error : ', error);
        }

    }

    /**
     * 미션 수행 (단건 용) API 호출 프로세스
     * @param param
     */
    postMissionDoProcess(param) {
        try {

            // 미션 수행 (단건 용) API 호출
            const postMissionDoAPI = this.postMissionDoAPI(param);

            postMissionDoAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }

            });
            
        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
     * 미션 수행 (리스트 용) API 호출 프로세스
     * @param param
     */
    postMissionDosProcess(param) {
        try {

            // 미션 수행 (리스트 용) API 호출
            const postMissionDosAPI = this.postMissionDosAPI(param);

            postMissionDosAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }

            });
            
        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
    * 비만 체형 나이 분석 API call
    * @returns {void}
    */
    postPhrBodyAnalysisAPI = async (param) => {
        return await Promise.all(
            [api.postPhrBodyAnalysisAPI(param)]
        );
    }

    /**
    * PHR 개별 입력 API call
    * @returns {void}
    */
    postInputPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.postInputPhrDataAPI(param)]
        );
    }

    /**
     * 미션 조회 API call
     * @param props
     * @returns {response}
     */
    getMissionMediAPI = async (param) => {
        return await Promise.all([
            api.getMissionMediAPI(param)
        ]);
    }

    /**
     * 미션 수행 처리 (단건) API call
     * @param props
     * @returns {response}
     */
    postMissionDoAPI = async (param) => {
        return await Promise.all([
            api.postMissionDoAPI(param)
        ]);
    }

    /**
     * 미션 수행 처리 (리스트형) API call
     * @param props
     * @returns {response}
     */
    postMissionDosAPI = async (param) => {
        return await Promise.all([
            api.postMissionSave(param)
        ]);
    }

    /**
     * 뒤로가기 버튼 클릭 제어 
     * @param e
     * @returns {void}
     */
    handleClickBackBtn = (e) => {

        const {misnDtlSrno, InputBodyAgeActions, ActivityPhrActions} = this.props;

        // 몸무게 입력 미션을 통해 진입 시
        if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_START <= misnDtlSrno 
            && ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_END >= misnDtlSrno) {

            const title = '몸무게 입력';
            const msg = '몸무게 입력을 종료할까요?';
            const btnType = 'end';
            const callback = function(){
                utils.extApp('02');
            }
    
            utils.showAlert(title, msg, btnType, callback);

        } else {

            // 줄자 타입 설정
            ActivityPhrActions.setSlideRulerType({
                slideRulerType : e.target.getAttribute('pretype')
            });

            // '뒤로 돌아가기' 버튼 클릭 시, 표출할 inputBodyAgeArea 설정
            InputBodyAgeActions.setInputBodyAgeType({
                ageType: e.target.getAttribute('pretype')
            });
        }
    }

    /**
     * 닫기 버튼 클릭 제어
     * @param e
     * @returns {void}
     */
    handleClosed = (e) => {

        const {misnSrno} = this.props;

        if(undefined !== misnSrno && '' !== misnSrno) {

            const title = '미션';
            const msg = '미션을 종료할까요?';
            const btnType = 'end';
            const callback = function(){
                utils.extApp('02');
            }

            utils.showAlert(title, msg, btnType, callback);
            
        } else {

            const title = '비만나이 검사';
            const msg = '비만나이 검사를 종료할까요? <br/> 언제든 다시 시작할 수 있어요.';
            const btnType = 'end';
            const callback = function(){
                window.location = '/report'
            }

            utils.showAlert(title, msg, btnType, callback);

        }
    }

    /**
     * 확인 버튼 클릭 제어
     * @param e
     * @returns {void}
     */
    handleClickConfirmBtn = (e) => {

        const { InputBodyAgeActions, ActivityPhrActions, inputBodyAge, misnSrno, ffmDt, misnDtlSrno, misnHstSrno } = this.props;

        if(this.inputValueValidation(inputBodyAge)) { // 입력 값 유효성 검사

            const nextType = e.currentTarget.getAttribute('nexttype');

            if(undefined !== misnSrno && '' !== misnSrno) { // ! 미션을 통해 진입

                if ('complete' === nextType) {
                    /** 
                     * 미션 : 데일리) 비만체형나이 유도
                     *      프로그램) 비만체형나이 진단 1회, 비교 1회 진입 시
                     */

                    const param = {
                        ansNo : '1',
                        ffmDt : ffmDt,
                        misnDtlSrno : misnDtlSrno,
                        misnHstSrno : misnHstSrno
                    }

                    // 비만 체형 나이 분석 process
                    this.postPhrBodyAnalysisProcess(param);

                } else if ('waist' === nextType) {

                    // 몸무게 입력 7회 미션 시
                    if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_START <= misnDtlSrno 
                        && ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_END >= misnDtlSrno) {
                        
                        const params = [
                            {
                                phrItmDivCd: ServiceConstants.PHR_ITM_DIV_CD_WEIGHT,
                                phrItmVal: inputBodyAge.get('bodyWeight')
                            }
                        ];
                
                        try {
                            // PHR 개별 입력 API 호출
                            const postInputPhrDataAPI = this.postInputPhrDataAPI(params);
                
                            postInputPhrDataAPI.then((response) => {
                
                                if (undefined !== response[0] && 200 === response[0].status) {
                
                                    // 성공 시 미션 수행 API 수행 후 앱 메인 페이지로 이동
                                    const param = {
                                        ansDesc : inputBodyAge.get('bodyWeight'),
                                        ansNo : '1',
                                        ffmDt : ffmDt,
                                        misnDtlSrno : misnDtlSrno,
                                        misnHstSrno : misnHstSrno
                                    }
                                    this.postMissionDoProcess(param);

                                } else {
                                    console.log('API request fail : ', response)
                                }
                
                            });
                
                        } catch (error) {
                            console.log('error : ', error);
                        }

                    } else if(ServiceConstants.MISN_DIV_CD_HEIGHT === misnSrno) { // 키/몸무게 진단 미션 시

                        const params = [
                            {
                            phrItmDivCd: ServiceConstants.PHR_ITM_DIV_CD_HEIGHT,
                            phrItmVal: inputBodyAge.get('height'),
                            },
                            {
                                phrItmDivCd: ServiceConstants.PHR_ITM_DIV_CD_WEIGHT,
                                phrItmVal: inputBodyAge.get('bodyWeight'),
                            },
                        ];
                
                        try {
                            // PHR 개별 입력 API 호출
                            const postInputPhrDataAPI = this.postInputPhrDataAPI(params);
                
                            postInputPhrDataAPI.then((response) => {
                
                                if (undefined !== response[0] && 200 === response[0].status) {
                
                                    // 성공 시 미션 수행 API 수행 후 앱 메인 페이지로 이동
                                    const param = [{
                                        ansDesc : inputBodyAge.get('height'),
                                        ansNo : '1',
                                        ffmDt : ffmDt,
                                        misnDtlSrno : misnDtlSrno,
                                        misnHstSrno : misnHstSrno
                                    },
                                    {
                                        ansDesc : inputBodyAge.get('bodyWeight'),
                                        ansNo : '2',
                                        ffmDt : ffmDt,
                                        misnDtlSrno : misnDtlSrno,
                                        misnHstSrno : misnHstSrno
                                    }];

                                    this.postMissionDosProcess(param);

                                } else {
                                    console.log('API request fail : ', response)
                                }
                
                            });
                
                        } catch (error) {
                            console.log('error : ', error);
                        }

                    } else {
                        
                        // 줄자 타입 설정
                        ActivityPhrActions.setSlideRulerType({
                            slideRulerType : nextType
                        });

                        // '확인' 버튼 클릭 시, 표출할 inputBodyAgeArea 설정
                        InputBodyAgeActions.setInputBodyAgeType({
                            ageType: nextType
                        });

                    }

                } else { // 완료 또는 몸무게 제외 확인 버튼 클릭 시

                    // 줄자 타입 설정
                    ActivityPhrActions.setSlideRulerType({
                        slideRulerType : nextType
                    });

                    // '확인' 버튼 클릭 시, 표출할 inputBodyAgeArea 설정
                    InputBodyAgeActions.setInputBodyAgeType({
                        ageType: nextType
                    });

                }

            } else { // ! 레포트의 비만체형나이 입력을 통해 진입

                if ('complete' === nextType) { // 프로세스의 마지막 확인 버튼 클릭

                    // 비만 체형 나이 분석 process
                    this.postPhrBodyAnalysisProcess();

                } else {

                    // 줄자 타입 설정
                    ActivityPhrActions.setSlideRulerType({
                        slideRulerType : nextType
                    });

                    // '확인' 버튼 클릭 시, 표출할 inputBodyAgeArea 설정
                    InputBodyAgeActions.setInputBodyAgeType({
                        ageType: nextType
                    });
                }
            }
        }
    };

    /**
     * 건강검진 비만 체형 나이 변경 시 Redux set
     * @param e
     * @returns {void}
     */
    handleChangeInputValue = (e) => {

        const { InputBodyAgeActions, inputBodyAge } = this.props;
        let range = '';
        let value = document.getElementsByClassName('inp_txt')[0].value;

        if (e.target.classList.contains('height')) {
            
            value = utils.validBodyAgeFloat('height', inputBodyAge.get('height'), e); // 유효성 검사

            // 신장 값 set
            InputBodyAgeActions.setInputBodyAgeHeight({
                height: value
            });

            // 허용치 정의
            range = utils.getBodyAgeValueRange('height');

        } else if (e.target.classList.contains('bodyWeight')) {

            value = utils.validBodyAgeFloat('bodyWeight', inputBodyAge.get('bodyWeight'), e); // 유효성 검사

            // 체중 값 set
            InputBodyAgeActions.setInputBodyAgeWeight({
                bodyWeight: value
            });

            // 허용치 정의
            range = utils.getBodyAgeValueRange('bodyWeight');

        } else if (e.target.classList.contains('waistCircum')) {

            value = utils.validBodyAgeInteger(value, 'waistCircum'); // 유효성 검사

            // 허리 둘레 값 set
            InputBodyAgeActions.setInputBodyAgeWaist({
                waistCircum: value
            });

            // 허용치 정의
            range = utils.getBodyAgeValueRange('waistCircum');

        } else if (e.target.classList.contains('hipCircum')) {

            value = utils.validBodyAgeInteger(value, 'hipCircum'); // 유효성 검사

            // 엉덩이 둘레 값 set
            InputBodyAgeActions.setInputBodyAgeHip({
                hipCircum: value
            });

            // 허용치 정의
            range = utils.getBodyAgeValueRange('hipCircum');
            
        }

        if(Number(value) >= range.min && Number(value) <= range.max ){
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(value);
        }
    }

    /**
     * 스크롤 제어
     */
    handleScroll = () => {
        const { slideRulerType } = this.props;
        let active = true;

        if('height' === slideRulerType) {
            this.changeCharacterHeight();
        } else if ('weight' === slideRulerType) {
            this.changeCharacterWeight();
        } else if ('waist' === slideRulerType) {
            this.changeCharacterWaist();
        } else if ('hip' === slideRulerType) {
            this.changeCharacterHip();
        }

        this.activeRuler(active);
    
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(function() {
            active = false;
            this.activeRuler(active);
        }.bind(this), 250);
        active = true;
    }

    scrollTimer = null;
    /**
     * 건강검진 비만 체형 나이 스크롤
     * @param e
     * @returns {void}
     */
    handleBodyAgeScroll = e => {

        let scrollType = '';

        if (e.target.parentNode.classList.contains('height')) {
            scrollType = 'height';
        } else if (e.target.parentNode.classList.contains('weight')) {
            scrollType = 'weight';
        } else if (e.target.parentNode.classList.contains('waist')) {
            scrollType = 'waist';
        } else if (e.target.parentNode.classList.contains('hip')) {
            scrollType = 'hip';
        }

        let num = 0;
        let active = true; //현재 스크롤여부
        const nowScroll = e.target.scrollLeft;
        
        if ('height' === scrollType) {
            
            const range = utils.getBodyAgeValueRange('height');
            const startX = utils.getScrollPosition(130); //초기 화면 스크롤시작값

            if(utils.getValueByScrollPosition(nowScroll) > range.max) {
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.max)
            } else if(utils.getValueByScrollPosition(nowScroll) < range.min){
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.min)
            } else {

                if (nowScroll > startX) {
                    num = nowScroll - startX;
                } else {
                    num = startX - nowScroll;
                }

                this.changeCharacterHeight(nowScroll, num);
                this.moveScroll(nowScroll, scrollType);
            }

        } else if ('weight' === scrollType) {
            
            

            const range = utils.getBodyAgeValueRange('bodyWeight');

            if(utils.getValueByScrollPosition(nowScroll) > range.max) {
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.max)
            } else if(utils.getValueByScrollPosition(nowScroll) < range.min){
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.min)
            } else {

                this.changeCharacterWeight(nowScroll);
                this.moveScroll(nowScroll, scrollType);

            }

        } else if ('waist' === scrollType) {

            const range = utils.getBodyAgeValueRange('waistCircum');

            if(utils.getValueByScrollPosition(nowScroll) > range.max) {
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.max)
            } else if(utils.getValueByScrollPosition(nowScroll) < range.min){
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.min)
            } else {

                this.changeCharacterWaist(nowScroll);
                this.moveScroll(nowScroll, scrollType);

            }

        } else if ('hip' === scrollType) {

            const range = utils.getBodyAgeValueRange('hipCircum');

            if(utils.getValueByScrollPosition(nowScroll) > range.max) {
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.max)
            } else if(utils.getValueByScrollPosition(nowScroll) < range.min){
                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.min)
            } else {

                this.changeCharacterHip(nowScroll);
                this.moveScroll(nowScroll, scrollType);

            }

        }

        this.activeRuler(active);

        clearTimeout(this.scrollTimer);

        this.scrollTimer = setTimeout(function () {
            active = false;
            this.activeRuler(active);
        }.bind(this), 250);
        active = true;
    }

    /**
     * 건강검진 비만 체형 나이 신장 캐릭터
     * @param nowScroll
     * @param num
     * @returns {void}
     */
    changeCharacterHeight() {
        const {inputBodyAge} = this.props;
        const height = inputBodyAge.get('height');
        
        const minX = 130; //캐릭터 최소 크기 변경 시점 값
        const maxX = 190; //캐릭터 최대 크기 변경 시점 값
        const hPer = 100 / (maxX - minX); //range 퍼센트 환산
        const myHead = document.querySelector('.my_character .head');

        let curPer = 0; //현재 신장 percent
        let gab = 0;

        if (height > minX) {
            gab = height - minX;
        } else {
            gab = minX - height;
        }
        
        if (height < minX) {
            curPer = 0;
        } else if (height > maxX) {
            curPer = 100;
        } else {
            curPer = gab * hPer;
        }

        myHead.style.bottom = curPer + '%';
    }

    /**
     * 건강검진 비만 체형 나이 체중 캐릭터
     * @param nowScroll
     * @param num
     * @returns {void}
     */
    changeCharacterWeight() {
        const {inputBodyAge} = this.props;
        const weight = inputBodyAge.get('bodyWeight');

        const minX = 25; //25이하 스크롤값
        const maxX = 120; //120이상 스크롤값
        const hPer = 100 / (maxX - minX); //range 퍼센트 환산
        const myHead = document.querySelector('.my_character .head');
        const minPer = 133 / 250;
        const maxPer = 1;
        const rangePer = maxPer - minPer;
        const marginLft = -(myHead.offsetWidth / 2);
        
        let posHead = myHead.offsetBottom;
        const gab = weight - minX;
        let curPer = 1; //현재 체중 percent
        curPer = minPer + (rangePer / 100 * (gab * hPer));
        const curW = weight === '' ? utils.getBodyAgeDefaultValue('bodyWeight') : weight;

        const face = document.querySelector('.face');

        if( curW < 25) {
            face.classList.add('thin');
            curPer = minPer;
        } else if( curW < 40) {
            //25~40kg일때 표정바뀜
            face.classList.add('thin');
        } else if(curW < 90) {
            //41~89kg
            face.classList.remove('thin');
            face.classList.remove('obesity');
        } else if(curW < 120) {
            //90~120kg일때 표정바뀜 
            face.classList.add('obesity');
        } else {
            //90~120kg일때 표정바뀜 
            face.classList.add('obesity');
            curPer = maxPer;
        }

        myHead.style.transform = 'scale(' + curPer + ')';
        myHead.style.marginLeft = marginLft + 'px';
        myHead.style.bottom = posHead + 'px';
    }

    /**
     * 건강검진 비만 체형 나이 허리둘레 캐릭터
     * @param nowScroll
     * @returns {void}
     */
    changeCharacterWaist() {
        const {inputBodyAge} = this.props;
        const waist = inputBodyAge.get('waistCircum');

        const maxX = 100; //100cm 이상 스크롤값
        const minX = 50; //50cm 이상 스크롤값
        const hPer = 100 / (maxX - minX); //range 퍼센트 환산
        const myHead = document.querySelector('.my_character .head');
        const curInch = waist === '' ? utils.getBodyAgeDefaultValue('waistCircum') : waist;
        const minPer = 133 / myHead.offsetWidth;
        const maxPer = 222 / myHead.offsetWidth;
        const rangePer = maxPer - minPer;
        const gab = waist - minX;
        
        let curPer = 1; /*현재 waist percent*/
        curPer = minPer + (rangePer / 100 * (gab * hPer));

        let wPer = curPer * 134;//줄자 크기 134px
        const upperBody = document.getElementsByClassName('upper_body')[0];

        if (curInch < 50) {
            upperBody.classList.add('thin');
            curPer = minPer;
            wPer = minPer * 134;
        } else if (curInch >= 50 && curInch <= 60) {
            upperBody.classList.add('thin');
        } else if (curInch > 60 && curInch < 81) {
            upperBody.classList.remove('thin');
            upperBody.classList.remove('obesity');
        } else if (curInch > 80 && curInch <= 100) {
            upperBody.classList.add('obesity');
        } else if (curInch > 100) {
            upperBody.classList.add('obesity');
            curPer = maxPer;
            wPer = maxPer * 134;
        }


        myHead.style.transform = 'scaleX(' + curPer + ')';

        const tapeLine = document.querySelector('.my_character .tape_line');
        let marginLeft = -1 * Number(134 * curPer / 2);

        tapeLine.style.width = wPer + 'px';
        tapeLine.style.marginLeft = marginLeft + 'px';

    }

    /**
     * 건강검진 비만 체형 나이 엉덩이둘레 캐릭터
     * @param nowScroll
     * @param num
     * @returns {void}
     */
    changeCharacterHip() {
        const {inputBodyAge} = this.props;
        const hip = inputBodyAge.get('hipCircum');

        const maxX = 100; //100cm 이상 스크롤값
        const minX = 50; //50cm 이상 스크롤값
        const hPer = 100 / (maxX - minX); //range 퍼센트 환산
        const myHead = document.querySelector('.my_character .head');
        const curInch = hip === '' ? utils.getBodyAgeDefaultValue('hipCircum') : hip;
        const minPer = 133 / myHead.offsetWidth;
        const maxPer = 222 / myHead.offsetWidth;
        const rangePer = maxPer - minPer;
        const gab = hip - minX;

        let curPer = 1; /*현재 waist percent*/
        curPer = minPer + (rangePer / 100 * (gab * hPer));

        let wPer = curPer * 134;//줄자 크기 134px

        if (curInch < 50) {
            curPer = minPer;
            wPer = minPer * 134;
        } else if (curInch > 100) {
            curPer = maxPer;
            wPer = maxPer * 134;
        }

        myHead.style.transform = 'scaleX(' + curPer + ')';

        const tapeLine = document.querySelector('.my_character .tape_line');
        let marginLeft = -(134 * curPer / 2);

        tapeLine.style.width = wPer + 'px';
        tapeLine.style.marginLeft = marginLeft + 'px';

    }
    /**
     * 건강검진 비만 체형 나이 값
     * @param nowScroll
     * @returns {void}
     */
    moveScroll(nowScroll, scrollType){
        const { InputBodyAgeActions, inputBodyAge } = this.props;

        const curCm = utils.getValueByScrollPosition(nowScroll);

        if ('height' === scrollType) {

            if(Math.abs(inputBodyAge.get('height') - curCm) > 0.1){
                // 신장 값 set
                InputBodyAgeActions.setInputBodyAgeHeight({
                    height: curCm.toFixed(1)
                });
            }

        } else if ('weight' === scrollType) {

            if(Math.abs(inputBodyAge.get('bodyWeight') - curCm) > 0.1){
                // 체중 값 set
                InputBodyAgeActions.setInputBodyAgeWeight({
                    bodyWeight: curCm.toFixed(1)
                });
            }

        } else if ('waist' === scrollType) {

            if(Math.abs(inputBodyAge.get('waistCircum') - curCm) > 0.1){
                // 허리둘레 값 set
                InputBodyAgeActions.setInputBodyAgeWaist({
                    waistCircum: curCm.toFixed(0)
                });
            }
            
        } else if ('hip' === scrollType) {

            if(Math.abs(inputBodyAge.get('hipCircum') - curCm) > 0.1){
                // 엉덩이둘레 값 set
                InputBodyAgeActions.setInputBodyAgeHip({
                    hipCircum: curCm.toFixed(0)
                });
            }

        }
    }
    
    /**
     * 건강검진 비만 체형 나이 포인트
     * @param nowScroll
     * @returns {void}
     */
    activeRuler(active) {

        const point = document.querySelector('.value_scroll .point');

        if (active) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    }

    /** 
     * 입력값 유효성 검사
     * @param inputBodyAge
     * @returns
     */
    inputValueValidation(inputBodyAge) {

        let result = false;
        let title = '';
        let msg = '';
        const btnType = 'end';

        switch(inputBodyAge.get('ageType')) {

            case 'height' :

                title = '키 입력';

                if(inputBodyAge.get('height') > 200) {
                    msg = '키는 200cm를 초과할 수 없습니다.';
                    utils.showAlert(title, msg, btnType);
                } else if(inputBodyAge.get('height') < 100) {
                    msg = '키는 100cm 미만일 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else {
                    result = true;
                }
                break;

            case 'weight' :

                title = '몸무게 입력';

                if(inputBodyAge.get('bodyWeight') > 200) {
                    msg = '몸무게는 200kg을 초과할 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else if(inputBodyAge.get('bodyWeight') < 10) {
                    msg = '몸무게는 10kg 미만일 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else {
                    result = true;
                }
                break;

            case 'waist' :

                title = '허리둘레 입력';

                if(inputBodyAge.get('waistCircum') > 200) {
                    msg = '허리둘레는 200cm를 초과할 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else if(inputBodyAge.get('waistCircum') < 10) {
                    msg = '허리둘레는 10cm 미만일 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else {
                    result = true;
                }
                break;

            case 'hip' :

                title = '엉덩이둘레 입력';

                const waistCircum = Number(inputBodyAge.get('waistCircum'));
                const hipCircum = Number(inputBodyAge.get('hipCircum'));

                if(inputBodyAge.get('hipCircum') > 200) {
                    msg = '엉덩이둘레는 200cm를 초과할 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else if(inputBodyAge.get('hipCircum') < 10) {
                    msg = '엉덩이둘레는 10cm 미만일 수 없습니다.';
                    utils.showAlert(title ,msg, btnType);
                } else if(waistCircum > (hipCircum * 1.5) || waistCircum < (hipCircum * 0.5)) {
                    msg = '엉덩이 둘레와 허리둘레의 범위를 확인하세요.';
                    utils.showAlert(title ,msg, btnType);
                } else {
                    result = true;
                }
                break;

            default : 
                break;
        };
        return result;
    }

    render() {

        const { inputBodyAge, misnDtlSrno, ActivityPhrActions } = this.props;

        const ageType = inputBodyAge.get('ageType');

        let hideCloseBtnFlag = false;
        let inputBodyAgeArea = null;

        if(undefined !== misnDtlSrno){
            hideCloseBtnFlag = ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_START <= misnDtlSrno 
                && ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_END >= misnDtlSrno ? true : false;
        }

        if ('height' === ageType) {
            
            // 줄자 타입 설정
            ActivityPhrActions.setSlideRulerType({
                slideRulerType : 'height'
            });

            inputBodyAgeArea = (
                <InputBodyAgeHeight
                    inputBodyAge={inputBodyAge}
                    onClickConfirmBtn={this.handleClickConfirmBtn}
                    onChangeInputValue={this.handleChangeInputValue}
                    onClosed={this.handleClosed}
                />
            );

        } else if ('weight' === ageType) {

            inputBodyAgeArea = (
                <InputBodyAgeWeight
                    inputBodyAge={inputBodyAge}
                    onChangeInputValue={this.handleChangeInputValue}
                    onClickConfirmBtn={this.handleClickConfirmBtn}
                    onClickBackBtn={this.handleClickBackBtn}
                    onClosed={this.handleClosed}
                    hideCloseBtnFlag={hideCloseBtnFlag}
                />
            );

        } else if ('waist' === ageType) {

            inputBodyAgeArea = (
                <InputBodyAgeWaist
                    inputBodyAge={inputBodyAge}
                    onChangeInputValue={this.handleChangeInputValue}
                    onClickConfirmBtn={this.handleClickConfirmBtn}
                    onClickBackBtn={this.handleClickBackBtn}
                    onClosed={this.handleClosed}
                />
            );

        } else if ('hip' === ageType) {

            inputBodyAgeArea = (
                <InputBodyAgeHip
                    inputBodyAge={inputBodyAge}
                    onChangeInputValue={this.handleChangeInputValue}
                    onClickConfirmBtn={this.handleClickConfirmBtn}
                    onClickBackBtn={this.handleClickBackBtn}
                    onClosed={this.handleClosed}
                />
            );

        }

        return (
            <Fragment>
                {inputBodyAgeArea}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        inputBodyAge: state.inputBodyAge,
        misnSrno : state.mission.get('misnSrno'),
        ffmDt : state.mission.get('ffmDt'),
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnHstSrno : state.mission.get('misnHstSrno'),
        slideRulerType : state.activityPhr.get('slideRulerType')
    }),
    (dispatch) => ({
        InputBodyAgeActions: bindActionCreators(inputBodyAgeActions, dispatch),
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(InputBodyAgeContainer);