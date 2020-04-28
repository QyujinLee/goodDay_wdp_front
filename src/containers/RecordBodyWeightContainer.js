import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordBodyWeight from 'components/RecordBodyWeight';

import * as api from 'lib/api';
import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBodyWeightActions from 'modules/recordBodyWeight';
import * as activityPhrActions from 'modules/activityPhr';

class RecordBodyWeightContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const {inputType, prevVal, RecordBodyWeightActions} = this.props;

        if('create' === inputType) {
            // redux 값 set
            RecordBodyWeightActions.setRecordBodyWeight({
                weight : utils.getBodyAgeDefaultValue('bodyWeight')
            });
        } else {
            // redux 값 set
            RecordBodyWeightActions.setRecordBodyWeight({
                weight : prevVal
            });
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.weight !== this.props.weight) {
            this.handleScroll();
        }
    }

    scrollTimer = null;
    /**
     * 스크롤 제어
     */
    handleScroll = () => {
        let active = true;

        this.changeCharacter();
        this.activeRuler(active);
    
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(function() {
            active = false;
            this.activeRuler(active);
        }.bind(this), 250);
        active = true;
    }

    /**
     * 체중 캐릭터 변경 제어
     */
    changeCharacter = () => {
        const { weight } = this.props;

        const minX = 25; // 캐릭터 최소 크기 변경 시점 값
        const maxX = 120; // 캐릭터 최대 크기 변경 시점 값
        const hPer = 100 / (maxX - minX); 
        const myHead = document.querySelector('.my_character .head');
        const minPer = 133 / 250; // 캐릭터 최소 크기 일때 px 값 / 최대 크기 일때 px 값
        const maxPer = 1;
        const rangePer = maxPer - minPer;
        const marginLeft = -(myHead.offsetWidth/2);

        let posHead = myHead.offsetBottom;
        const gab = weight - minX;
        let curPer = 1; //현재 체중 percent
        curPer = minPer + ( rangePer / 100 * (gab * hPer));
        const curW = weight === '' ? utils.getBodyAgeDefaultValue('bodyWeight') : weight;

        const face = document.querySelector('.face');
        face.classList.remove('thin');
        face.classList.remove('obesity');
        if( curW < 25) {//25kg 미만
            face.classList.add('thin');
            curPer = minPer;
        } else if( curW < 40) {
            //25~40kg일때 표정바뀜
            face.classList.add('thin');
        } else if(curW < 90) {
            //41~89kg
        } else if(curW < 120) {
            //90~120kg일때 표정바뀜 
            face.classList.add('obesity');
        } else {
            //120kg 이상 일때 표정바뀜 
            face.classList.add('obesity');
            curPer = maxPer;
        }
        myHead.style.transform = 'scale('+curPer+')';
        myHead.style.marginLeft = marginLeft+'px';
        myHead.style.bottom = posHead + 'px';
    }
    
    /**
     * 포인트 활성/비활성
     * @param active
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
     * 몸무게 입력 값 변경 제어
     */
    handleChangeInputValue = (e) => {
        const { weight, RecordBodyWeightActions } = this.props;

        // 유효성 검사
        const curWeight = utils.validBodyAgeFloat('bodyWeight', weight, e);

        // redux 값 set
        RecordBodyWeightActions.setRecordBodyWeight({
            weight : curWeight
        });
    }

    /**
     *  체중 기록 초기화
     * @returns {void}
     */
    handleResetWeightValue = () => {
        const { RecordBodyWeightActions, prevVal } = this.props;

        const title = '몸무게 입력';
        const msg = '몸무게 입력을 종료할까요?';
        const btnType = 'end';
        const callback = function(){
            // 체중 값 set
            RecordBodyWeightActions.setRecordBodyWeight({
                weight: ''
            });
            
            if('' === prevVal) {
                window.location.href = '/activity';
            } else {
                window.location.href = '/activity/detailBodyWeight';
            }
        }

        utils.showAlert(title, msg, btnType, callback);

    }

    /**
     *  체중 기록 API 호출
     * @returns {void}
     */
    handleRecordBodyWeight = () => {

        const {weight, inputType, prevVal} = this.props;

        const range = utils.getBodyAgeValueRange('bodyWeight');

        const title = '몸무게 입력';
        const btnType = 'end';
        let valid = false;
        if (weight < range.min) {
            utils.showAlert(title, '몸무게는 ' + range.min + 'kg 미만일 수 없습니다.', btnType);
        } else if (weight > range.max) {
            utils.showAlert(title, '몸무게는 ' + range.max + 'kg을 초과할 수 없습니다.', btnType);
        } else {
            valid = true;
        }

        if (!valid) return;

        const params = [{
            phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_WEIGHT,
            phrItmVal : weight
        }];

        try {

            if('create' === inputType) {
                // PHR 개별 입력 API 호출
                const postInputPhrDataAPI = this.postInputPhrDataAPI(params);
    
                postInputPhrDataAPI.then((response) => {
    
                    if(undefined !== response && 200 === response[0].status) {
                        
                        if('' === prevVal) {
                            // 메인 페이지에서의 입력 성공
                            window.location.href = '/activity';
                        } else {
                            // 상세 페이지에서의 입력 성공
                            window.location.href = '/activity/detailBodyWeight';
                        }
    
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });
            } else if ('modify' === inputType) {
                // PHR 개별 수정 API 호출
                const putInputPhrDataAPI = this.putInputPhrDataAPI(params);
    
                putInputPhrDataAPI.then((response) => {
    
                    if(undefined !== response && 200 === response[0].status) {
    
                        // 성공 시 페이지 이동
                        window.location.href = '/activity/detailBodyWeight';
    
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });
            }

        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
     *  체중 기록 삭제 버튼 클릭 제어
     * @returns {void}
     */
    handleClickRemoveBtn = () => {

        const title = '삭제 확인';
        const msg = '정말 삭제하시겠습니까?';
        const btnType = 'remove';
        const callback = this.RemoveWeightValue;

        utils.showAlert(title, msg, btnType, callback);
        
    }

    /**
     *  체중 기록 삭제 API 호출
     * @returns {void}
     */
    RemoveWeightValue = () => {

        const {weight} = this.props;

        const params = [{
            phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_WEIGHT,
            phrItmVal : weight
        }];

        try {
                // PHR 개별 삭제 API 호출
                const deleteInputPhrDataAPI = this.deleteInputPhrDataAPI(params);
    
                deleteInputPhrDataAPI.then((response) => {
    
                    if(undefined !== response && 200 === response[0].status) {
    
                        // 성공 시 activity 페이지로 이동
                        window.location.href = '/activity/detailBodyWeight';
    
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });

            } catch(error) {
                console.log('error : ', error);
            }

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
    * PHR 개별 수정 API call
    * @returns {void}
    */
    putInputPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.putInputPhrDataAPI(param)]
        );
    }

    /**
    * PHR 개별 삭제 API call
    * @returns {void}
    */
    deleteInputPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.deleteInputPhrDataAPI(param)]
        );
    }


    render() {

        const { inputType, weight, slideRulerType, ActivityPhrActions} = this.props;

        if('activityWeight' !== slideRulerType) {
            ActivityPhrActions.setSlideRulerType({
                slideRulerType : 'activityWeight'
            });
        }

        return (
            <RecordBodyWeight 
                inputType={inputType}
                weight={weight}
                onChangeInputValue={this.handleChangeInputValue}
                onResetWeightValue={this.handleResetWeightValue}
                onRecordBodyWeight={this.handleRecordBodyWeight}
                onClickRemoveBtn={this.handleClickRemoveBtn}
            />
        );
    }
}

export default connect(
    (state) => ({
        inputType: state.recordBodyWeight.get('inputType'),
        weight: state.recordBodyWeight.get('weight'),
        prevVal: state.activityPhr.get('weight'),
        slideRulerType : state.activityPhr.get('slideRulerType')
    }),
    (dispatch) => ({
        RecordBodyWeightActions: bindActionCreators(recordBodyWeightActions, dispatch),
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(RecordBodyWeightContainer);