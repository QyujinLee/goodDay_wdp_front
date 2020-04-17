import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'; 
import * as utils from 'lib/utils';

class MindExamResult extends Component {

    componentDidMount() {

        // 포인트 지급 처리
        utils.pointPayment('3');
    }

    render() {
        const {rsltData, mindState} = this.props;
        let stateImgClass, stateText, advice;
        const usrInfo = utils.getUserInfo();

        if(mindState === 'normal') {
            stateImgClass = 'my_state normal';
            stateText = (<span className="txt_condi_normal">건강</span>);
            advice = (
                <dd>
                    지금처럼 긍정적인 사고와 습관을<br/>유지해 주세요.<br/>
                    {usrInfo.nickNm}님의 건강한 마음을 응원합니다~^^/
                </dd>
            )
        } else if(mindState === 'caution') {
            stateImgClass = 'my_state caution';
            stateText = (<span className="txt_condi_caution">경미</span>);
            advice = (
                <dd>
                    조금만 더 긍정적이고,<br/>
                    편안한 마음을 가져 보도록 해요<br/>
                    PS. {usrInfo.nickNm}님, 마음건강 일일미션에<br/>
                    꾸준히 참여해 보세요.
                </dd>
            )
        } else {
            stateImgClass = 'my_state danger';
            stateText = (<span className="txt_condi_danger">심각</span>);
            advice = (
                <dd>
                마음이 건강해야 몸도 건강할 수 있습니다.<br/>
                증상완화를 위해 <br/>
                전문심리상담사와의 상담을 통해<br/>
                마음속 아픔을 치유해 보세요.
                </dd>
            )
        }
        return (
            <>                                     
                <div className="contents">                        
                    <div className="mind_result">                        
                        <dl className={stateImgClass}>
                            <dt>
                                {usrInfo.nickNm}님의 마음은<br/>
                                {stateText}한 상태
                            </dt>
                            {advice}
                            <Link to="/activity/mindExam" className="bt_red big" style={{marginTop:'15px', width:'80%'}} onClick={null}>
                                <span>마음건강 다시 진단하기</span>
                            </Link>
                        </dl>
                        <h3>세부검사 결과</h3>                            
                        <ul className="result_lst">
                        {
                            rsltData === null ? '' :
                            rsltData.map((item, index) => (
                                <li key={index}>
                                    <span className="s_tit">{item.qustItmTypDivCdNm} 검사결과</span>
                                    <p>{ReactHtmlParser(item.guidDesc)}</p>
                                    {
                                        item.subGuidDesc !== "" ?
                                        <div className="gry_bx">
                                            <p className="point">{item.subGuidDesc}</p>
                                        </div> :''
                                    }
                                </li>
                            ))
                        }
                        </ul>                            
                    </div>                        
                </div>   
            </>                 
        );
    }
}

export default MindExamResult;