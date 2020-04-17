import React, { Component, Fragment } from 'react';

class InputBodyAgeWeight extends Component {
    render() {

        const { inputBodyAge } = this.props; // props data
        const { onClickConfirmBtn, onClickBackBtn, onChangeInputValue, onBodyAgeScroll, onClosed, hideCloseBtnFlag } = this.props; // props event

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        {hideCloseBtnFlag ? null : (
                            <a href='#!' className='arrow_lft' pretype='height' onClick={onClickBackBtn}>
                                <span className='blind'>페이지이동</span>
                            </a>
                            )
                        }
                        <h1>몸무게 입력</h1>
                        <div className='right_btn'>
                            <a href='#!' className='close_btn' onClick={onClosed}> </a>
                        </div>
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_wrap'>
                        <div className='info_input'>
                            <span className='noti'>몸무게를 입력하세요</span>
                            <div className='input_bx'>
                                <input type='tel' id='inp_txt' className='inp_txt bodyWeight'
                                    value={inputBodyAge.get('bodyWeight')} onChange={onChangeInputValue}
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
                                <span>{inputBodyAge.get('bodyWeight')}</span>
                            </div>
                            <div className='h_range_slider' onScroll={onBodyAgeScroll}>
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
                                        <li>290</li>
                                        <li>310</li>
                                        <li>330</li>
                                        <li>350</li>
                                        <li>370</li>
                                        <li style={{marginLeft:'71px'}}>390</li>
                                    </ul>
                                </div>
                            </div>
                            <span className='point'></span>
                        </div>
                        <div className='btn_wrap'>
                            <button className='bt_red big' nexttype='waist' onClick={onClickConfirmBtn}>
                                <span>확인</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default InputBodyAgeWeight;