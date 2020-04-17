import React, { Component  } from 'react';
import { Link } from 'react-router-dom';

class MindExamMain extends Component {
    
    render() {
        
        const {handleClickNext}  = this.props;
        return (
            <>
                <header className="header normal">
                        <div className="title_set">
                            <Link to="/activity" className="arrow_lft" ><span className="blind">페이지이동</span></Link>
                            <h1>마음 검진</h1> 
                        </div>
                </header>
                <div id="contents" className="contents">
                    <div className="mind_wrap">
                        <dl className="main_msg" style={{paddingTop:"10px"}}>
                            <dt>
                                나 자신,<br/>
                                스스로를 먼저 이해하는 것이<br/>
                                중요합니다.
                            </dt>
                            <dd>
                            불안을 그대로 두면 마음의 병이 생기기도 합니다.<br/>
                            간단한 자기진단으로 내 마음 상태 알아봐요
                            </dd>
                        </dl>
                        <dl className="main_msg">
                            <dt>
                            간편 심리검사
                            </dt>
                            <dd>
                            간단한 자기진단으로 내 마음상태 알아보기
                            </dd>
                        </dl>
                        <div id="imgBox" className="img_box">
                            <img src="/images/img_mind_info.png" alt="토마토이미지"/>
                        </div>
                        <div id="btn_wrap" className="btn_wrap">
                            <button className="bt_red big" onClick={handleClickNext}><span>마음건강 진단하기</span></button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MindExamMain;