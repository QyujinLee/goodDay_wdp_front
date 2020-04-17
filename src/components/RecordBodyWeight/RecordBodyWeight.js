import React, { Component, Fragment } from 'react';
class RecordBodyWeight extends Component {
    render() {

        const { weight, inputType, onChangeInputValue, onRecordBodyWeightScroll, onResetWeightValue, 
                onRecordBodyWeight, onClickRemoveBtn} = this.props;

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        {
                            'modify' !== inputType ? (
                                <>
                                    <h1>몸무게 입력</h1>
                                    <div className='right_btn'>
                                        <a href='#!' className='close_btn' onClick={onResetWeightValue}> </a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <a href='/activity/detailBodyWeight' className='arrow_lft'>
                                        <span className='blind'>페이지이동</span>
                                    </a>
                                    <h1>몸무게 수정</h1>
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
                                    <span className='noti'>몸무게를 입력하세요</span>
                                ) : (
                                    <span className='noti'>몸무게를 수정하세요</span>
                                )
                            }
                            
                            <div className='input_bx'>
                                <input type='tel' id='inp_txt' className='inp_txt bodyWeight'
                                    value={weight} onChange={onChangeInputValue}
                                />
                                <label htmlFor='inp_txt'>kg</label>
                            </div>
                        </div>
                        <div className='char_wrap weight'>
                            <div className='my_character'>
                                <div className='head'>
                                    <div className='face'></div>
                                </div>
                                <div className='leg'></div>
                            </div>
                        </div>

                        <div className='value_scroll weight'>
                            <div className='value_tooltip'>
                                <span>{weight}</span>
                            </div>
                            <div className='h_range_slider' onScroll={onRecordBodyWeightScroll}>
                                <div className='range_measure'>
                                    <ul className='measure_num'>
                                        <li>0</li>
                                        <li>10</li>
                                        <li>30</li>
                                        <li>50</li>
                                        <li>70</li>
                                        <li>90</li>
                                        <li>110</li>
                                        <li>130</li>
                                        <li>150</li>
                                        <li>170</li>
                                        <li>190</li>
                                        <li>210</li>
                                        <li>230</li>
                                        <li>250</li>
                                        <li>270</li>
                                        <li>310</li>
                                        <li>330</li>
                                        <li>350</li>
                                        <li>370</li>
                                        <li>390</li>
                                    </ul>
                                </div>
                            </div>
                            <span className='point'></span> 
                        </div>
                        <div className='btn_wrap'>
                            <button className='bt_red big' onClick={onRecordBodyWeight}>
                                <span>저장</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RecordBodyWeight;