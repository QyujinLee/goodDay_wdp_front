import React, { Component } from 'react';

import * as ServiceConstants from 'constants/serviceConstants';

class MissionWeight extends Component {
    render() {

        const { inputType, misnSrno, answerFir, answerSec, onClickBackBtn, onClickInputBtn ,onKeyUpText } = this.props;

        let contMap = {};

        if(ServiceConstants.MISN_DIV_CD_WEIGHT === misnSrno) {

            contMap.title = 'modify' === inputType ? <h1>다짐 수정</h1> : <h1>다짐 입력</h1>;
            contMap.contTitle = <h2 className='cont_title'>
                                    나를 위한<br/>
                                    한 줄 다짐 작성하기
                                </h2>;
            contMap.myTextClassName = 'my_text';
            contMap.prependTextArea = '';
            contMap.placeHolder = '달라진 나를 위해서!';
            contMap.imageName = 'images/tomi_start.png';

        } else if(ServiceConstants.MISN_DIV_CD_ESTEEM === misnSrno) {

            contMap.title = 'modify' === inputType ? <h1>감사일기수정</h1> : <h1>감사일기쓰기</h1>;
            contMap.contTitle = <h2 className='cont_title'>
                                    작은일 이라도 좋아요<br/>
                                    짧은 문장이라도 좋아요
                                </h2>;
            contMap.myTextClassName = 'my_text diary';
            contMap.prependTextArea =   <div className='textarea_wrap'>
                                            <textarea placeholder='감사한사람' id='inputPerson' defaultValue={answerFir} onKeyUp ={onKeyUpText}  ></textarea>
                                        </div>;
            contMap.placeHolder = '감사한 내용';
            contMap.imageName = 'images/tomi_write.png';

        } else if(ServiceConstants.MISN_DIV_CD_HABIT === misnSrno) {

            contMap.title = 'modify' === inputType ? <h1>건강습관 목표</h1> : <h1>건강습관 목표 수정</h1>;
            contMap.contTitle = <h2 className='cont_title'>
                                    이루고 싶은 습관<br/>
                                    실행 목표를 세워보세요!
                                </h2>;
            contMap.myTextClassName = 'my_text';
            contMap.prependTextArea = '';
            contMap.placeHolder = '독서하는 습관을 기를거야!';
            contMap.imageName = 'images/tomi_goal.png';

        } else if(ServiceConstants.MISN_DIV_CD_WORD === misnSrno) {

            contMap.title = <h1>다짐 한마디</h1>;
            contMap.contTitle = <h2 className='cont_title'>
                                    시작이 반!<br/>
                                    첫 날 다짐 한마디 남겨주세요!
                                </h2>;
            contMap.myTextClassName = 'my_text';
            contMap.prependTextArea = '';
            contMap.placeHolder = '구체적으로 적을수록 효과적입니다.';
            contMap.imageName = 'images/tomi_start.png';

        }

        return (
            <div style={{backgroundColor: "#f4f4f4", height:"100%"}}>
                <header className='header normal'>
                    <div className='title_set'>
                        <a href='#!' className='arrow_lft' onClick={onClickBackBtn}><span className='blind'>페이지이동</span></a>
                        {contMap.title}
                    </div>
                </header>

                <div className='contents'>
                    <div className='m_input_wrap'>
                        {contMap.contTitle}
                        <div className={contMap.myTextClassName}>
                            {contMap.prependTextArea}
                            <div className='speech_bubble'>
                                <div className='textarea_wrap'>
                                    <textarea placeholder={contMap.placeHolder}  id='inputContents' defaultValue={answerSec} onKeyUp={onKeyUpText} ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='img_box'>
                            <img src={contMap.imageName} alt='토마토 이미지'/>
                        </div>
                        <div className='btn_wrap'>
                            <button className='bt_red big' onClick={()=>onClickInputBtn(misnSrno, document.querySelectorAll('textarea'))}>
                                {'modify' === inputType ? <span>수정</span> : <span>입력</span>}
                            </button>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default MissionWeight;