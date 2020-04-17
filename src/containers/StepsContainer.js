import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import Calendar from '../components/Calendar/Calendar';
import WalkChart from 'components/WalkChart';
import AtvChart from 'components/AtvChart';
import StepsRanking from 'components/StepsRanking';

import * as stepsActions from 'modules/steps';
import * as atvActions from 'modules/actChart';

import moment from 'moment';
class StepsContainer extends Component {
    constructor() {

        super();
        window.stepsContainer = this;
        
    }

    componentDidMount() {
        
        if(!(window.android)) {
            let param = {};
            param.usrId = utils.getUserInfo().usrId;
            param.searchType = 'day';
            param.fromDate = moment().format('YYYYMMDD');
            this.extSetStepsData(param);
        }
    }

    extSetStepsData(param) {
     
        const { StepsActions, PatternActions } = this.props;

        const getStepsData = this.getStepsDataAPI(param);

        //stepsData Redux set
        getStepsData.then((response) => {

            if (undefined !== response[0]) {
              
                response[0].data.data.searchType = param.searchType;
                
                const responseData = response[0].data;

                StepsActions.setData(responseData);
            }



        });

        if ('month' !== param.searchType) {

            const getPatternData = this.getPatternDataAPI(param);

            //patternData Redux set
            getPatternData.then((response) => {

                if (undefined !== response[0]) {

                    const responseData = response[0].data;

                    PatternActions.setData(responseData);
                }


            });

        }

        this.getStepsRankingProcess(param);
    }

    /**
     * 일/주/월 단위 걸음 수  랭킹 조회 프로세스
     * @param props
     * @returns {void}
     */
    getStepsRankingProcess(param) {

        const { StepsActions } = this.props;

        let getStepsRanking = ''

        const params = {
            fromDate: param.fromDate
        }

        if ('day' === param.searchType) {

            getStepsRanking = this.getStepsRankingDailyAPI(params);

        } else if ('week' === param.searchType) {

            getStepsRanking = this.getStepsRankingWeeklyAPI(params);

        } else if ('month' === param.searchType) {

            getStepsRanking = this.getStepsRankingMonthlyAPI(params);

        }
        if ('' !== getStepsRanking) {
            getStepsRanking.then((response) => {
                if (undefined !== response[0]) {

                    const responseData = response[0].data.data

                    StepsActions.setStepsRankingData({
                        ranking: responseData
                    })
                }


            });
        }


    }

    /**
     * 일일 친구 랭킹 API call
     *  @returns {response}
     */
    getStepsRankingDailyAPI = async (params) => {
        return await Promise.all([
            api.getStepsRankingDailyAPI(params)
        ]);
    }

    /**
     * 주간 친구 랭킹 API call
     *  @returns {response}
     */
    getStepsRankingWeeklyAPI = async (params) => {
        return await Promise.all([
            api.getStepsRankingWeeklyAPI(params)
        ]);
    }

    /**
     * 월간 친구 랭킹 API call
     *  @returns {response}
     */
    getStepsRankingMonthlyAPI = async (params) => {
        return await Promise.all([
            api.getStepsRankingMonthlyAPI(params)
        ]);
    }

    /**
     * 검색어 기준 걸음수 조회 API call
     *  @returns {response}
     */
    getStepsDataAPI = async (params) => {
        return await Promise.all([
            api.getStepsDataAPI(params)
        ]);
    }

    /**
     * 시간 단위 걸음수 조회 API call
     * @returns {response}
     */

    getPatternDataAPI = async (params) => {
        return await Promise.all([
            api.getPatternDataAPI(params)
        ]);
    }

    handleToggleTooltip = index => {

        const { StepsActions } = this.props;

        StepsActions.toggleTootip(index);
    };

    render() {
        const {
            steps,
            curMonthData,
            searchType,
            ranking
        } = this.props;

        const { atvData } = this.props;
        console.log("=========== rendering : ", atvData);
        return (
            <div>
                <div className='cont_wrap walk'>
                    <dl>
                        {searchType === 'day' ? (<dt>일일</dt>) : searchType === 'week' ? (<dt>주간</dt>) : (<dt>월간</dt>)}

                        <dd className='walk_chart_wrap'>
                            <WalkChart
                                data={steps.get('stepsData')}
                                totalSteps={steps.get('totalSteps')}
                                avgSteps={steps.get('avgSteps')}
                                maxSteps={steps.get('maxSteps')}
                                searchType={steps.get('searchType')}
                                onToggleTooltip={this.handleToggleTooltip}
                            />
                        </dd>
                    </dl>
                </div>

                {searchType === 'month' ? (
                    <div>
                        <Calendar data={curMonthData} />
                    </div>
                ) : (
                        <div className='cont_wrap'>
                            <dl>
                                <dt>시간 패턴</dt>
                                <dd className='atv_chart_wrap'>
                                    <AtvChart atvData={atvData} />
                                </dd>
                            </dl>
                        </div>
                    )}

                <div className='cont_wrap'>
                    <dl>
                        <dt>비교하기</dt>
                        <dd className='real_time'>
                            <div className='img_box'>
                                <img src='images/img_chart.png' alt='' />
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className='cont_wrap'>
                    <StepsRanking
                        ranking={ranking} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        steps: state.steps,
        curMonthData: state.steps.get('curMonthData'),
        searchType: state.steps.get('searchType'),
        atvData: state.atvChart.get('atvData'),
        ranking: state.steps.get('ranking'),
    }),
    (dispatch) => ({
        StepsActions: bindActionCreators(stepsActions, dispatch),
        PatternActions: bindActionCreators(atvActions, dispatch)
    })
)(StepsContainer);
