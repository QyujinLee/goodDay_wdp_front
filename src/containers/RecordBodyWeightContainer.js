import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordBodyWeight from 'components/RecordBodyWeight';

import * as api from 'lib/api';
import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBodyWeightActions from 'modules/recordBodyWeight';

class RecordBodyWeightContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { weight, inputType } = this.props;

        if('create' === inputType) {
            // // 체중 기본 Set
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(utils.getBodyAgeDefaultValue('bodyWeight'));
        } else {
            // 입력된 체중이 있을 경우
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(weight);
        }
    }

    
    /**
     * 체중 기록 값 변경 시 Redux set
     * @param e
     * @returns {void}
     */
    handleChangeInputValue = (e) => {

        const { RecordBodyWeightActions, weight } = this.props;

        const curWeight = utils.validBodyAgeFloat('bodyWeight', weight, e);
        RecordBodyWeightActions.setRecordBodyWeight({ weight : curWeight });

        //입력된 숫자에 해당하는 위치로 스크롤 이동(허용치 이내일 경우)
        const range = utils.getBodyAgeValueRange('bodyWeight');
        if(Number(curWeight) >= range.min && Number(curWeight) <= range.max ){
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(curWeight);
        }
    }
    
    /**
     * 체중 기록 스크롤
     * @param e
     * @returns {void}
     */
    handleRecordBodyWeightScroll = e => {
        
        let active = true; //현재 스크롤여부
        const nowScroll = e.target.scrollLeft;
        const range = utils.getBodyAgeValueRange('bodyWeight');
        if(utils.getValueByScrollPosition(nowScroll) > range.max) {
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.max)
        } else if(utils.getValueByScrollPosition(nowScroll) < range.min){
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(range.min)
        } else{
            this.changeCharacter(nowScroll);
            this.moveScroll(nowScroll);
    
            this.activeRuler(active);
    
            clearTimeout(this.scrollTimer);
    
            this.scrollTimer = setTimeout(function() {
                active = false;
                this.activeRuler(active);
            }.bind(this), 250);
            active = true;
        }

    }

    /**
     * 체중 기록 캐릭터
     * @param nowScroll
     * @param num
     * @returns {void}
     */
    changeCharacter(nowScroll) {

        const { weight } = this.props;
        const minX = utils.getScrollPosition(25) ; 
        const maxX = utils.getScrollPosition(120); 
        const hPer = 100 / (maxX - minX); 
        const myHead = document.querySelector('.my_character .head');
        const minPer = 133 / 250;
        const maxPer = 1;
        const rangePer = maxPer - minPer;
        const marginLft = -(myHead.offsetWidth/2);

        let posHead = myHead.offsetBottom;
        const gab = nowScroll - minX;
        let curPer = 1; //현재 체중 percent
        curPer = minPer + ( rangePer / 100 * (gab * hPer));
        const curW = weight;

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
        myHead.style.marginLeft = marginLft+'px';
        myHead.style.bottom = posHead + 'px';
    }

    /**
     * 체중 기록 값
     * @param nowScroll
     * @returns {void}
     */
    moveScroll(nowScroll) {

        const { RecordBodyWeightActions, weight } = this.props;
        const curKg = utils.getValueByScrollPosition(nowScroll);

        // 소숫점 검사를 하고
        if(Math.abs(weight - curKg) > 0.1) {
            // 체중 값 set
            RecordBodyWeightActions.setRecordBodyWeight({
                weight: curKg.toFixed(1)
            });

        }
        
    }

    /**
     *  체중 기록 포인트
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

        const title = '몸무게 입력';
        const btnType = 'end';
        let msg = '';

        if(weight > 200) {

            msg = '몸무게는 200kg를 초과할 수 없습니다';

            utils.showAlert(title, msg, btnType);

        } else if(weight < 10){

            msg = '몸무게는 10kg 미만일 수 없습니다';

            utils.showAlert(title, msg, btnType);

        } else {

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

        const { inputType, weight, prevVal } = this.props;

        return (
            <Fragment>
                <RecordBodyWeight 
                    weight={weight}
                    inputType={inputType}
                    prevVal={prevVal}
                    onChangeInputValue ={this.handleChangeInputValue}
                    onRecordBodyWeightScroll={this.handleRecordBodyWeightScroll}
                    onResetWeightValue = {this.handleResetWeightValue}
                    onRecordBodyWeight = {this.handleRecordBodyWeight}
                    onClickRemoveBtn = {this.handleClickRemoveBtn}
                    onKeyDown={this.handleKeyDown}
                    />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        inputType: state.recordBodyWeight.get('inputType'),
        weight: state.recordBodyWeight.get('weight'),
        prevVal: state.activityPhr.get('weight')
    }),
    (dispatch) => ({
        RecordBodyWeightActions: bindActionCreators(recordBodyWeightActions, dispatch)
    })
)(RecordBodyWeightContainer);