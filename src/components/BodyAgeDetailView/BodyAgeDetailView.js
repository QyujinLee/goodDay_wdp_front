import React, { Component, Fragment } from 'react';


import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

class BodyAgeDetailView extends Component {

    getMaxValue(scope, state) {
        let firstValue = 0;
        let secondValue = 0;
        const text = scope.map((item, index) => {

            firstValue = 0 === index ? item.strVal : firstValue;
            secondValue = 1 === index ? item.strVal : secondValue;

            if (1 === index) {
                if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {

                    if (Number(firstValue) > Number(secondValue)) {
                        firstValue = item.endVal;
                        secondValue = item.strVal;
                    } else {
                        firstValue = item.strVal
                        secondValue = item.endVal;
                    }

                }

                if ('normal' === state) {
                    return <span key={index} className='max_value'>{firstValue}</span>
                } else if ('caution' === state) {
                    return <span key={index} className='max_value'>{secondValue}</span>
                }
            }
            return null;
        });
        return text;
    }



    getStateClass(state) {

        if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === state || '정상' === state) {
            return 'normal';
        } else if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === state || '비만' === state || '주의' === state) {
            return 'caution';
        } else if (ServiceConstants.REF_NCL_DIV_CD_DANGER === state || '고도비만' === state || '위험' === state) {
            return 'danger';
        } else {
            return 'state';
        }
    }

    render() {

        const { contents, normalScope, examination, diffYear } = this.props; // props data
        const { onBodyAgeToggle, onBodyAgeMoveTrend } = this.props; // props event

        let bodyAgeArea = null;
        let bodyAgeTitleArea = null;
        let bodyAgeChartArea = null;

        let bodyAgeValue = null;

        if (1 === examination.length) {

            const firstValue = examination[0];

            if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_BMI === firstValue.mediExamItmDivCd) { //체질량지수
                bodyAgeValue = (undefined !== firstValue.bmi && 0 !== Number(firstValue.bmi) ? firstValue.bmi : '');
            } else if ('CUSTOM_WHR' === firstValue.mediExamItmDivCd) { //허리/엉덩이 둘레비
                bodyAgeValue = (undefined !== firstValue.whr && 0 !== Number(firstValue.whr) ? firstValue.whr : '');
            } else {
                bodyAgeValue = (undefined !== firstValue.calLbdyAge && 0 !== Number(firstValue.calLbdyAge) ? firstValue.calLbdyAge : '');
            }

            // Titel
            bodyAgeTitleArea = (

                <div className='title_set' onClick={undefined !== Number(firstValue.calLbdyAge) && 0.0 !== Number(firstValue.calLbdyAge) && undefined !== firstValue.jugNm ? onBodyAgeToggle : undefined}>
                    <h3>{contents.subTitle}</h3>
                    <span className='chk_num'>
                        <b>{'' !== bodyAgeValue ? (utils.numberFixed(bodyAgeValue, true)) : ''}</b> {'' !== bodyAgeValue ? firstValue.unitDivCdNm : ''}
                    </span>
                    <span className={'state ' + this.getStateClass(firstValue.jugNm)}>{'' !== bodyAgeValue ? firstValue.jugNm : ''}</span>
                    {
                        ServiceConstants.MEDI_EXAM_ITM_DIV_CD_HIP !== firstValue.mediExamItmDivCd &&
                            'CUSTOM_WHR' !== firstValue.mediExamItmDivCd &&
                            '' !== bodyAgeValue ? (
                                <a href='#!' className='btn_tg'>
                                    <span className='blind'>토글버튼</span>
                                </a>
                            ) : (null)
                    }
                </div>
            );

            if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WAIST === firstValue.mediExamItmDivCd || ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_BMI === firstValue.mediExamItmDivCd) {
                bodyAgeChartArea = (
                    <div className='tg_conts'>
                        <p className='msg_txt tip'>{contents.subTitle} <span className='bold'>꿀팁</span></p>
                        <div className={2 === normalScope.length ? 'step2_chart' : 'step3_chart'} >
                            <ul>
                                {
                                    normalScope.map((item, index) => {
                                        return (
                                            <li key={index} className={this.getStateClass(item.refNclDivCd)}>
                                                {this.getMaxValue(normalScope, this.getStateClass(item.refNclDivCd))}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            <div className='value_arw' style={{ width: '30px', textAlign: 'center', marginLeft: '-15px', left: + utils.getChartArwStyle(normalScope, undefined !== firstValue.calLbdyAge ? firstValue.calLbdyAge : firstValue.bmi) + 'px' }}>{utils.numberFixed(undefined !== firstValue.calLbdyAge ? firstValue.calLbdyAge : firstValue.bmi, true)}</div>
                            <ol className='label_lst'>
                                {
                                    normalScope.map((item, index) => {
                                        return <li key={index} className={'state_' + this.getStateClass(item.refNclDivCd)}><span>{item.jugNm}</span></li>;
                                    })
                                }
                            </ol>
                        </div>
                        <div className='s_btn_wrap'>
                            <button className='bt_white'>
                                <span onClick={onBodyAgeMoveTrend}>{diffYear}년간 나의변화 확인</span>
                            </button>
                        </div>
                        <ul className='doit_lst'>
                            <li><a href='#!'>하면 좋은 것</a></li>
                            <li><a href='#!'>하면 안 좋은 것</a></li>
                        </ul>
                    </div>

                );
            }

        } else if (2 === examination.length) {

            const firstValue = examination[0];
            const secondValue = examination[1];


            let bodyAgeTitleDivArea = null;

            if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_HEIGHT === firstValue.mediExamItmDivCd && ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WEIGHT === secondValue.mediExamItmDivCd) {

                const mineheight = (undefined !== firstValue.calLbdyAge && 0 !== Number(firstValue.calLbdyAge) ? Number(firstValue.calLbdyAge) : '');
                const mineWeight = (undefined !== secondValue.calLbdyAge && 0 !== Number(secondValue.calLbdyAge) ? Number(secondValue.calLbdyAge) : '');


                // 키/몸무게
                bodyAgeTitleDivArea = (
                    <Fragment>
                        <b>{'' !== mineheight ? utils.numberFixed(mineheight, true) : ''}</b> {'' !== mineheight ? firstValue.unitDivCdNm : ''}{'' !== mineWeight ? '/' : ''} <b>{'' !== mineWeight ? utils.numberFixed(mineWeight, true) : ''}</b> {'' !== mineWeight ? secondValue.unitDivCdNm : ''}
                    </Fragment>
                );

            }          // Titel
            bodyAgeTitleArea = (
                <div className='title_set'>
                    <h3>{contents.subTitle}</h3>
                    <span className='chk_num'>
                        {bodyAgeTitleDivArea}
                    </span>
                </div>
            );
        }

        if (0 < examination.length) {
            bodyAgeArea = (
                <div className={undefined !== examination[0].jugNm &&
                    '정상' !== examination[0].jugNm ?
                    'toggle_conts open' : 'toggle_conts'}>
                    {bodyAgeTitleArea}
                    {bodyAgeChartArea}
                </div>
            );
        }

        return (
            <li>
                {bodyAgeArea}
            </li>
        )
    }
}

export default BodyAgeDetailView;