import React, { Component, Fragment } from 'react';
import * as utils from 'lib/utils';
import * as cstts from 'constants/serviceConstants';
class MissionInterest extends Component {

    render() {
        const {misnSrno, handleToggle, interestAnswers, handleSave, handleClose, oriAnsNo} = this.props;
        const userName = utils.getUserInfo().usrNm;
        
        let isEnable = false;
        if(interestAnswers === null ){
            isEnable = false;
        } else {
            if(misnSrno === '9999'){
                const idx = interestAnswers.findIndex(item => item.get('toggle') === true);
                isEnable = oriAnsNo !== interestAnswers.getIn([idx, 'ansNo']) ;
            } else {
                isEnable = interestAnswers.findIndex(item => item.get('toggle') === true) < 0 ? false : true;
            }
        }

        let content = {};
        if(misnSrno === cstts.MISN_DIV_CD_CHG_MISN){
            content.title = '미션 바꾸기';
            content.mainTxt = '도전할 미션을 선택하세요';
            content.subTxt = userName + '님의 관심사 목록입니다.';
            content.saveBtn = '선택완료';
        } else {
            content.title = '관심사 선택';
            content.mainTxt = userName + '님의 관심은?';
            content.subTxt = '내 삶은 내가 선택해요';
            content.saveBtn = '다했어요';

        }
        return (
            <Fragment>
                <header className="header normal">
                    <div className="title_set">
                    <button className="arrow_lft" onClick={handleClose}><span className="blind">페이지이동</span></button>
                    <h1>{content.title}</h1>
                    </div>
                </header>
                <div className="contents">
                    <div className="mission_wrap">
                        <p className="m_question">
                        <span className="q_txt">{content.mainTxt}</span>
                        <span>{content.subTxt}</span>
                        </p>
                        <div className="m_lst_wrap">
                        <ul className="mission_lst">
                        {
                            interestAnswers === null ? '' :
                            interestAnswers.map((item, index) => (
                                index%3 !== 1 ? ( 
                                    <li key={index} className={item.get('toggle') ? item.get('classNm') + ' on': item.get('classNm')} onClick={()=> handleToggle(index)}>
                                        {/*eslint-disable */}
                                        <a>{item.get('ansNm')}</a>
                                        {/*eslint-enable */}
                                    </li>
                                ) : (
                                    <li key={index} className={item.get('toggle') ? item.get('classNm') + ' middle on': item.get('classNm') + ' middle'} onClick={()=> handleToggle(index)}>
                                    {/*eslint-disable */}
                                    <a>{item.get('ansNm')}</a>
                                    {/*eslint-enable */}
                                </li>
                                )
                            ))
                        }
                        </ul>
                    </div>
                    <div className="btn_wrap">
                    {
                        isEnable ? 
                        <button className="bt_red big"  onClick={handleSave}><span>{content.saveBtn}</span></button>
                        : <button className="bt_red big" disabled ><span>{content.saveBtn}</span></button>
                    }
                    </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MissionInterest;