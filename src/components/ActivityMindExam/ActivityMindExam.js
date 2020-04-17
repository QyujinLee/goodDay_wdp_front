import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import * as utils from 'lib/utils';

class ActivityMindExam extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        const {rsltData} = this.props;
        if(rsltData) return false;
        return true;
    }
    render() {
        const {rsltData, mindState} = this.props;
        const stateClass = mindState === 'normal' ? 'my_info state' : 'my_info state ' + mindState;
        const mindNm = mindState === 'danger' ? '심각' : mindState === 'caution' ? '경미' : '건강';
        const usrInfo = utils.getUserInfo();
        // if(rsltData != null)alert(rsltData[0].regDtm);
        return (
            <>
            {
                rsltData != null && rsltData.length > 0 ? 
                <Link to='/activity/mindExamResult'>
                    <li>   
                        <dl className="codition_info">
                            <dt className="title">
                                <span className="tit">마음</span>
                                <span className="date">{rsltData[0].regDtm !== undefined ? rsltData[0].regDtm : ''}</span>
                            </dt>
                            <dd className={stateClass}>
                                <span className="img_info"></span>
                                <div className="txt_wrap">
                                    <span className="txt">
                                        {usrInfo.nickNm}님 마음은<br/>
                                        <em>{mindNm}</em>한 상태
                                    </span>
                                </div>
                            </dd>
                        </dl>
                    </li>
                </Link>
                :
                <Link to='/activity/mindExam'>
                    <li>
                        <dl className='codition_info'>
                            <dt className='title'>
                                <span className='tit'>마음</span>
                                {/* <span className='date'>2020.3.5 12:21:00</span> */}
                            </dt>
                            <dd className='no_data'>
                                <p>지금 마음 상태를 측정해요</p>
                            </dd>
                        </dl>
                    </li>
                </Link>

            }
            </>
        );
    }
}

export default ActivityMindExam;