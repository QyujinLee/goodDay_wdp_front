import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mindExamActions from 'modules/mindExam';
import MindExamResult from 'components/MindExamResult';
import * as api from 'lib/api';
import queryString from 'query-string';
import * as utils from 'lib/utils';
class MindExamResultContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { MindExamActions, rsltData } = this.props;
        if (rsltData === null) {//문진 결과 데이터가 없을 경우 조회
            this.getSrvMindExamResult({ srvSrno: "1" }).then((response) => {
                if (response[0].data === undefined) {
                    console.log("An Error Occured");
                } else {
                    MindExamActions.setRsltData(response[0].data.data);
                    return true;
                }
            });
        }
    }

    /**
     * 닫기 버튼 제어
     */
    handleCloseBtn = () => {
        const query = queryString.parse(window.location.search);
        if(query.mission !== undefined) utils.extApp('02');
        else window.location.href = '/activity';
    }


    getSrvMindExamResult = async (param) => {
        return await Promise.all(
            [api.getSrvMindExamResult(param)]
        );
    }

    render() {
        const { rsltData, mindState } = this.props;

        return (
            <Fragment>
                <header className="header normal">
                    <div className="title_set">
                        <h1>자기 진단 결과</h1>
                        <div className="right_btn">
                            <button  className="close_btn" onClick={this.handleCloseBtn}/>
                        </div>
                    </div>
                </header>
                <MindExamResult rsltData={rsltData} mindState={mindState} />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        rsltData: state.mindExam.get('rsltData'),
        mindState: state.mindExam.get('mindState'),
        misnDtlSrno : state.mission.get('misnDtlSrno')
    }),
    (dispatch) => ({
        MindExamActions: bindActionCreators(mindExamActions, dispatch)
    })
)(MindExamResultContainer);