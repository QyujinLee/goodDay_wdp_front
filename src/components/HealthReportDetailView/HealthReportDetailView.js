import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

class HealthReportDetailView extends Component {

    getMaxValue(scope, state) {
        let firstValue = 0;
        let secondValue = 0;
        const text = scope.map((item, index) => {

            firstValue = 0 === index ? item.strVal : firstValue;
            secondValue = 1 === index ? item.strVal : secondValue;

            if (1 === index) {
                if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {
                 
                    if (firstValue > secondValue) {
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

        if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === state || '음성' === state || '정상' === state) {
            return 'normal';
        } else if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === state || '주의' === state) {
            return 'caution';
        } else if (ServiceConstants.REF_NCL_DIV_CD_DANGER === state || '양성' === state || '위험' === state) {
            return 'danger';
        } else {
            return 'state';
        }
    }

    getYgtpText(scope, value) {

        const text = scope.map((item, index) => {
            /* eslint-disable*/
            if (eval(item.strVal + item.strSymbNm + value)
                && eval(item.endVal ? value + item.strSymbNm + item.endVal : 1)) {

                if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_YGTP === item.mediExamItmDivCd) {

                    if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === item.refNclDivCd) {
                        return <span key={index}><b>건강한 수치입니다.</b><br />앞으로도 지속적인 관심 바랍니다.</span>;
                    } else if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {
                        return <span key={index}><b>주의가 필요한 정상 수치입니다.</b><br />앞으로도 지속적인 관심 바랍니다.</span>;
                    } else if (ServiceConstants.REF_NCL_DIV_CD_DANGER === item.refNclDivCd) {
                        return <span key={index}><b>질환이 의심되는 위험 수치입니다.</b><br />관리가 필요합니다.</span>;
                    }
                }
            }

            return null;
        });

        return text;
    }


    getArwStyle(scope, value) {

        // style left 값을 구하기 위한 left변수, 정상범위의 사이 값, 사용자의 실제 데이터 값, 범위 갯수 변수 선언
        let left = 0;
        let scopeTerm = 0;
        let scopeTermNormal = 0;
        let userValue = value;
        const scopeLength = scope.length;

        //화면 비율에 맞는 left값을 조정하기 위한 설정 
        const clientWidth = document.body.clientWidth;

        const Totalbar = clientWidth - 80

        scope.forEach(element => {

            scopeTermNormal = (ServiceConstants.REF_NCL_DIV_CD_NORMAL === element.refNclDivCd && undefined !== element.endVal ? element.endVal - element.strVal : element.strVal);
            scopeTerm = (ServiceConstants.REF_NCL_DIV_CD_CAUTION === element.refNclDivCd ? element.endVal - element.strVal : element.strVal);

            /* eslint-disable*/
            if (eval(element.strVal + element.strSymbNm + userValue)
                && eval(element.endVal ? userValue + element.strSymbNm + element.endVal : 1)) {

                if (userValue === element.strVal) {
                    userValue = userValue + 0.0000001;
                }
                if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === element.refNclDivCd) {

                    //정상
                    left = (40 + ((userValue) / element.strVal) * Totalbar / scopeLength);

                    if ('<=' === element.strSymbNm || '<' === element.strSymbNm) {
                        left = ((element.strVal / userValue) * Totalbar / scopeLength);
                        if (scopeTermNormal !== 0) {
                            left = 40 + ((userValue - element.strVal) / (scopeTermNormal)) * ((Totalbar / scopeLength));
                        }
                    }

                } else if (ServiceConstants.REF_NCL_DIV_CD_CAUTION === element.refNclDivCd) {

                    //주의 or 비만                                             
                    left = (((Totalbar / scopeLength) + 40) + (userValue - (element.strVal)) / (scopeTerm) * Totalbar / scopeLength);

                } else if (ServiceConstants.REF_NCL_DIV_CD_DANGER === element.refNclDivCd) {

                    left = 40 + (Totalbar / scopeLength * (scopeLength - 1))
                    //위험 or 고도비만
                    left = ((((Totalbar / scopeLength) * (scopeLength - 1)) + 40) + (userValue - (element.strVal)) / (scopeTerm) * Totalbar / scopeLength);
                    if ('>=' === element.strSymbNm || '>' === element.strSymbNm) {
                        left = ((((Totalbar / scopeLength) * (scopeLength - 1)) + 40) + ((element.strVal) - userValue) / (scopeTerm) * Totalbar / scopeLength);

                    }
                }
            }
        });

        if (40 >= left) {
            return 40;
        } else if (40 + Totalbar < left) {
            return 40 + Totalbar;
        } else {
            return left
        }

    }
    render() {

        const { contents, bodyAverage, normalScope, examination, message, diffYear } = this.props; // props data
        const { onHealthReportContentsToggle, onHealthReportMoveTrend } = this.props; // props event

        let mediExamArea = null;
        let mediExamTitleArea = null;
        let mediExamChartArea = null;

        if (1 === examination.length) {

            const firstValue = examination[0];

            // Titel
            mediExamTitleArea = (
                <div className='title_set' onClick={undefined !== firstValue.mediExamItmVal || '' !== firstValue.mediExamItmDesc ? onHealthReportContentsToggle : undefined}>
                    <h3>{contents.subTitle}</h3>
                    <span className='chk_num'>
                        <b>{undefined !== firstValue.mediExamItmVal ? (utils.numberFixed(firstValue.mediExamItmVal, true)) : ''}</b> {undefined !== firstValue.mediExamItmVal ? firstValue.unitDivNm : ''}
                    </span>
                    <span className={'state ' + this.getStateClass(undefined !== firstValue.refNclDivCd ? firstValue.refNclDivCd : firstValue.mediExamItmDesc)}>{undefined !== firstValue.jugNm ? firstValue.jugNm : firstValue.mediExamItmDesc}</span>
                    {undefined !== firstValue.mediExamItmVal || '' !== firstValue.mediExamItmDesc ? (
                        <a href='#!' className='btn_tg'>
                            <span className='blind'>토글버튼</span>
                        </a>
                    ) : null}
                </div>
            );

            mediExamChartArea = (
                <div className='tg_conts'>
                    <p className='msg_txt tip'>{contents.subTitle} <span className='bold'>꿀팁</span></p>
                    {/* {ServiceConstants.MEDI_EXAM_ITM_DIV_CD_HDL === contents.mediExamItmDivCd[0] ? ( */}
                    {
                        0 < message.length ? (
                            <div className='tip_bx'>
                                <dl>
                                    <dt className='topic' dangerouslySetInnerHTML={{ __html: message[0].topic }}></dt>
                                    <dd className='desc' dangerouslySetInnerHTML={{ __html: message[0].desc }}></dd>
                                </dl>
                            </div>
                        ) : null
                    }

                    {ServiceConstants.MEDI_EXAM_ITM_DIV_CD_YGTP === contents.mediExamItmDivCd[0] ? (

                        <p className='msg_txt'>
                            {this.getYgtpText(normalScope, firstValue.mediExamItmVal)}
                        </p>

                    ) : null}
                    {ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_PROTEIN !== contents.mediExamItmDivCd[0] &&
                        ServiceConstants.MEDI_EXAM_ITM_DIV_CD_TUBERCULOSIS !== contents.mediExamItmDivCd[0] ? (
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
                                <div className='value_arw' style={{ width: '30px', textAlign: 'center', marginLeft: '-15px', left: + this.getArwStyle(normalScope, firstValue.mediExamItmVal) + 'px' }}>{utils.numberFixed(firstValue.mediExamItmVal, true)}</div>
                                <ol className='label_lst'>
                                    {
                                        normalScope.map((item, index) => {
                                            return <li key={index} className={'state_' + this.getStateClass(item.refNclDivCd)}><span>{item.jugNm}</span></li>;
                                        })
                                    }
                                </ol>
                            </div>
                        ) : null}
                    <div className='s_btn_wrap'>
                        <button className='bt_white'>
                            <span onClick={onHealthReportMoveTrend}>{diffYear}년간 나의변화 확인</span>
                        </button>
                    </div>
                    <ul className='doit_lst'>
                        <li><a href='#!'>하면 좋은 것</a></li>
                        <li><a href='#!'>하면 안 좋은 것</a></li>
                    </ul>
                </div>
            );

            //  폐질환, 골다공증 차트 제외
            if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_OSTEOPOROSIS === contents.mediExamItmDivCd[0]) {
                mediExamChartArea = null;
            }

        } else if (2 === examination.length) {

            const firstValue = examination[0];
            const secondValue = examination[1];

            let mediExamTitleDivArea = null;

            if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_HEIGHT === firstValue.mediExamItmDivCd && ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WEIGHT === secondValue.mediExamItmDivCd) {

                const mineheight = Number(firstValue.mediExamItmVal);
                const mineWeight = Number(secondValue.mediExamItmVal);
                const avgWeight = Number(bodyAverage.bdwghVal);

                // 키/몸무게
                mediExamTitleDivArea = (
                    <Fragment>
                        <b>{'' !== mineheight ? utils.numberFixed(mineheight, true) : ''}</b> {'' !== mineheight ? firstValue.unitDivNm : ''} {'' !== mineWeight ?'/':''} <b>{'' !== mineWeight ? utils.numberFixed(mineWeight, true) : ''}</b> {'' !== mineWeight ? secondValue.unitDivNm : ''}
                    </Fragment>
                );

            } else if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_LEFT_EYE === firstValue.mediExamItmDivCd && ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_RIGHT_EYE === secondValue.mediExamItmDivCd) {

                // 시력
                mediExamTitleDivArea = (
                    <Fragment>
                        <ul className='eyes_ears_info'>
                            <li>
                                <span className='dir'>좌</span><span className='num'>{utils.numberFixed(firstValue.mediExamItmVal, false)}</span>
                            </li>
                            <li>
                                <span className='dir'>우</span><span className='num'>{utils.numberFixed(secondValue.mediExamItmVal, false)}</span>
                            </li>
                        </ul>
                    </Fragment>
                );

                // Chart
                mediExamChartArea = (
                    <div className='tg_conts'>
                    </div>
                );

            } else if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_LEFT_HEARING === firstValue.mediExamItmDivCd && ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_RIGHT_HEARING === secondValue.mediExamItmDivCd) {

                // 청력
                mediExamTitleDivArea = (
                    <Fragment>
                        <ul className='eyes_ears_info'>
                            <li><span className='dir'>좌</span><span className='state normal'>{firstValue.mediExamItmDesc}</span></li>
                            <li><span className='dir'>우</span><span className='state normal'>{secondValue.mediExamItmDesc}</span></li>
                        </ul>
                    </Fragment>
                );

                // Chart
                mediExamChartArea = (
                    <div className='tg_conts'>
                    </div>
                );

            }

            // Titel
            mediExamTitleArea = (
                <div className='title_set' >
                    <h3>{contents.subTitle}</h3>
                    <span className='chk_num'>
                        {mediExamTitleDivArea}
                    </span>
                </div>
            );
        }

        if (0 < examination.length) {

            mediExamArea = (
                <div className={undefined !== examination[0].refNclDivCd &&
                    ServiceConstants.REF_NCL_DIV_CD_NORMAL !== examination[0].refNclDivCd ?
                    'toggle_conts open' : 'toggle_conts'}>
                    {mediExamTitleArea}
                    {mediExamChartArea}
                </div>
            );
        }

        return (
            <li>
                {mediExamArea}
            </li>
        )
    }
}

export default HealthReportDetailView;