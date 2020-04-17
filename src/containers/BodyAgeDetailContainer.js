import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import BodyAgeDetail from 'components/BodyAgeDetail';

import * as bodyAgeActions from 'modules/bodyAge';

class BodyAgeDetailContainer extends Component {

    componentDidMount() {

        utils.extApp('04');

        const query = queryString.parse(window.location.search);
        const msmtDt = undefined !== query.ffmDt ? query.ffmDt : '';

        if ('' !== msmtDt) {

            const { BodyAgeActions } = this.props;

            BodyAgeActions.setBodyAgeDetailContentsData({
                type: 'msmtDt',
                data: msmtDt
            })
        } else {
            this.bodyAgeDetailProcess(this.props);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.msmtDt !== nextProps.msmtDt) {

            this.bodyAgeDetailProcess(nextProps);
        }
        return true;
    }

    bodyAgeDetailProcess(props) {
        //비만체형나이 추이 그래프 중 최근 1건 조회 프로세스
        this.getStatisticGraphObesityLatelyProcess(props);
    }

    /**
    * 비만체형나이 추이 그래프 중 최근 1건 조회 프로세스
    * @param props
    * @returns {void}
    */
    getStatisticGraphObesityLatelyProcess(props) {

        const { BodyAgeActions } = this.props;

        const param = {
            gndrDivCd: utils.getUserInfo().gndrDivCd,
            recentCnt: '1',
            msmtDt: props.msmtDt
        }

        const getStatisticGraphObesityLately = this.getStatisticGraphObesityLatelyAPI(param);

        getStatisticGraphObesityLately.then((response) => {

            const responseData = response[0].data.data;

            if (undefined !== response[0] && null !== responseData) {

                const livingAgeData = responseData.data[0].data;
                const examinationData = responseData.data[1].data;

                let living = [];
                livingAgeData.forEach((element, index) => {

                    living[index] = {
                        'mediExamItmDivCd': element.mediExamItmDivCd,
                        'mediExamItmDivCdNm': element.mediExamItmDivCdNm
                    };
                    living[index] = Object.assign(living[index], element.data[0])
                });

                let examination = [];
                examinationData.forEach((element, index) => {

                    examination[index] = {
                        'unitDivCd': undefined === element.unitDivCd ? '' : element.unitDivCd,
                        'unitDivCdNm': undefined === element.unitDivCdNm ? '' : element.unitDivCdNm,
                        'mediExamItmDivCd': element.mediExamItmDivCd,
                        'mediExamItmDivCdNm': element.mediExamItmDivCdNm
                    };
                    examination[index] = Object.assign(examination[index], element.data[0])
                });

                // 생체나이 데이터 Redux set
                BodyAgeActions.setBodyAgeDetailContentsData({
                    type: 'livingAge',
                    data: living
                });

                // 비만검사 데이터 Redux set
                BodyAgeActions.setBodyAgeDetailContentsData({
                    type: 'examination',
                    data: examination
                });
            }
        });
    }


    /**
     * 비만체형나이 추이 그래프 중 최근 1건 조회 API call
     * @returns {response}
     */
    getStatisticGraphObesityLatelyAPI = async (param) => {

        return await Promise.all([
            api.getStatisticGraphObesityLatelyAPI(param)
        ]);
    }

    render() {

        const { detail, onBodyAgeToggle } = this.props;

        return (
            <BodyAgeDetail
                livingAgeData={detail.get('livingAge')}
                examinationData={detail.get('examination')}
                onBodyAgeToggle={onBodyAgeToggle}
            />
        );
    }
}

export default connect(
    (state) => ({
        detail: state.bodyAge.get('detail'),
        msmtDt: state.bodyAge.get('detail').get('msmtDt')
    }),
    (dispatch) => ({
        BodyAgeActions: bindActionCreators(bodyAgeActions, dispatch)
    })
)(BodyAgeDetailContainer);