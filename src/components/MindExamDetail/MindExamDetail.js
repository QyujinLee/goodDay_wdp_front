import React, { Component  } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

class MindExamDetail extends Component { 
    render() {
        const { handleClickNext, 
                handleClickAnswer, 
                handleClickViewResult,
                handleClickBack,
                handleClickClose,
                qustItmNo,
                srvData,
                endFlag}  = this.props;
        const jsonData = srvData.toJS();
        const curData = jsonData[qustItmNo - 1];
        return (
            <>
                <header className="header normal">
                    <div className="title_set">
                        {qustItmNo === 1 ? null :
                            <button className="arrow_lft" onClick={handleClickBack}><span className="blind">페이지이동</span></button>
                        }
                        <div className="right_btn">
                            <button className="close_btn" onClick={handleClickClose}/>
                        </div>
                    </div>
                </header>
                <div className="contents">
                    <div className="mind_wrap">
                        <div className="qa_state">{curData.qustItmTypDivCdNm} <b>{curData.qustItmGrpCd}</b>-{curData.qustItmAdtnNo}</div>
                            <div className="qa_cont">
                                {/* 19번째 문진의 경우 너무 달라서 하드코딩됨 */}
                                {
                                    curData.qustItmNo === "19" ?
                                    <>
                                        <p className="question">
                                            <span>지금까지 살아오면서</span>
                                            <span className="q_txt">다음과 같은 사건을 경험한 적이 있나요?</span>
                                        </p>
                                        <ul className="q_lst">
                                            <li key="q_list1">- 위험한 사고 또는 화재</li>
                                            <li key="q_list2">- 태풍, 홍수, 지진 등 천재지변</li>
                                            <li key="q_list3">- 자신 혹은 타인의 심각한 부상이나 죽음</li>
                                            <li key="q_list4">- 신체적이거나 성적인 폭행 혹은 학대</li>
                                        </ul>
                                    </>
                                    :
                                    <p className="question">
                                        <span>{curData.qustItmAdtnNm}</span>
                                        <span className="q_txt">{curData.qustItmNm}</span>
                                    </p>
                                }
                                <div className="btn_wrap">
                                    {
                                        curData.ansCnt === "2" ? 
                                        <ol className="answer_lst yesOrno">
                                        {
                                            curData.answers.map((item, index) => (
                                                <li key={index} className="sel" style={index + 1 === curData.answers.length ? {marginLeft : '3.125%'} : {marginLeft : '0px'}}>
                                                    <button className={Number(curData.ansNo) === index ? 'bt_line_big sel' : 'bt_line_big'} onClick={() => handleClickAnswer(item.ansNo)}>
                                                        <span>{item.ansNm}</span>
                                                    </button>
                                                </li>
                                            ))
                                        }
                                        </ol>
                                        :
                                        <ol className={curData.ansCnt === "5" ? "answer_lst five" : "answer_lst four"} >
                                            {
                                                curData.answers.map((item, index) => (
                                                    <li key={index} >
                                                        <div className="ck_radio">
                                                            <input type="radio" id="r_00" name="r_score"  checked={Number(curData.ansNo) === index} readOnly/> 
                                                            <label htmlFor="r_00" onClick={() => handleClickAnswer(item.ansNo)}>{item.ansNo}</label>
                                                            <span className="txt">{ReactHtmlParser(item.ansNm)}</span>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ol> 
                                    }
                                    {
                                        endFlag ?
                                        <button className="bt_red big" onClick={handleClickViewResult}><span>결과 보기</span></button>
                                        :
                                        <button className="bt_red big" onClick={handleClickNext}><span>다음</span></button>
                                    }
                        
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MindExamDetail;