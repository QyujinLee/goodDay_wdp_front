import React, { Component, Fragment} from 'react';
import SlideRuler from 'components/SlideRulerComponent';

class RecordBloodSugar extends Component {
    render() {

        const { bloodSugar, inputType, mealYn, onChangeInputValue, onResetBloodSugarValue, 
                onRecordBloodSugar, onMealYN, onClickRemoveBtn } = this.props;

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                    {
                        'modify' !== inputType ? (
                            <>
                                <h1>혈당 입력</h1>
                                <div className='right_btn'>
                                    <a href='#!' className='close_btn' onClick={onResetBloodSugarValue}> </a>
                                </div>
                            </>
                        ) : (
                            <>
                                <a href='/activity/detailBloodSugar' className='arrow_lft'>
                                    <span className='blind'>페이지이동</span>
                                </a>
                                <h1>혈당 수정</h1>
                                <div className='right_btn'>
                                    <a href='#!' className='bt_line' onClick={onClickRemoveBtn}><span>삭제하기</span></a>
                                </div>
                            </>
                        )

                    }
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_wrap'>
                        <div className='info_input'>
                            {
                                'modify' !== inputType ? (
                                    <>
                                        <span className='noti'>혈당을 입력하세요</span>
                                        <ul className='btn_lst'>
                                            <li><button className='bt_line small mealN' onClick={onMealYN}>
                                                <span>공복</span></button>
                                            </li>
                                            <li><button className='bt_line small mealY' onClick={onMealYN}>
                                                <span>식후</span></button>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <span className='noti'>혈당을 수정하세요</span>
                                        <ul className='btn_lst'>
                                            { 
                                                'N' === mealYn ? (
                                                    <>
                                                        <li><button className='bt_line small mealN sel' onClick={onMealYN}>
                                                            <span>공복</span></button>
                                                        </li>
                                                        <li><button className='bt_line small mealY' onClick={onMealYN}>
                                                            <span>식후</span></button>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li><button className='bt_line small mealN' onClick={onMealYN}>
                                                            <span>공복</span></button>
                                                        </li>
                                                        <li><button className='bt_line small mealY sel' onClick={onMealYN}>
                                                            <span>식후</span></button>
                                                        </li>
                                                    </>
                                                )
                                            }
                                        </ul>
                                    </>
                                )
                            }
                            
                            <div className='input_bx small'>
                                <input type='tel' id='inp_txt' className='inp_txt'
                                    value={bloodSugar} onChange={onChangeInputValue}/>
                                <label htmlFor='inp_txt'>mg/dL</label>
                            </div>
                        </div>    
                    </div>
                    <div className='value_scroll blood'>
                        <div className='value_tooltip'>
                            <span>{bloodSugar}</span>
                        </div>
                        <div className='h_range_slider'>
                            <SlideRuler currentValue={bloodSugar}/>
                        </div>
                        <span className='point'></span> 
                    </div>
                    <div className='btn_wrap'>
                        <button className='bt_red big' onClick={onRecordBloodSugar}>
                            <span>저장</span>
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RecordBloodSugar;