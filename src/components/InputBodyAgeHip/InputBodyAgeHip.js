import React, { Component, Fragment } from 'react';

class InputBodyAgeHip extends Component {
    render() {

        const { inputBodyAge } = this.props; // props data
        const { onClickConfirmBtn, onClickBackBtn, onChangeInputValue, onBodyAgeScroll, onClosed } = this.props; // props event

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        <a href='#!' className='arrow_lft' pretype='waist' onClick={onClickBackBtn}>
                            <span className='blind'>페이지이동</span>
                        </a>
                        <h1>엉덩이둘레 입력</h1>
                        <div className='right_btn'>
                            <a href='#!' className='close_btn' onClick={onClosed}> </a>
                        </div>
                    </div>
                </header>
                <div className='contents'>
                    <div className='active_wrap'>
                        <div className='info_input'>
                            <span className='noti'>엉덩이둘레를 입력하세요</span>
                            <div className='input_bx'>
                                <input type='tel' id='inp_txt' className='inp_txt hipCircum'
                                    value={inputBodyAge.get('hipCircum')} onChange={onChangeInputValue}
                                />
                                <label htmlFor='inp_txt'>cm</label>
                            </div>
                        </div>
                        <div className='char_wrap hip'>
                            <div className='my_character'>
                                <div className='hat'></div>
                                <div className='head'></div>
                                <div className='arms'></div>
                                <div className='tape_line'></div>
                                <div className='leg'></div>
                            </div>
                        </div>
                        <div className='value_scroll hip'>
                            <div className='value_tooltip'>
                                <span>{inputBodyAge.get('hipCircum')}</span>
                            </div>
                            <div className='h_range_slider' onScroll={onBodyAgeScroll}>
                                <div className='range_measure'>
                                    <ul className='measure_num'>
                                        <li>0</li>
                                        <li>20</li>
                                        <li>40</li>
                                        <li>60</li>
                                        <li>80</li>
                                        <li>100</li>
                                        <li>120</li>
                                        <li>140</li>
                                        <li>160</li>
                                        <li>180</li>
                                        <li>200</li>
                                        <li>220</li>
                                        <li style={{marginLeft:'71px'}}>240</li>
                                    </ul>
                                </div>
                            </div>
                            <span className='point'></span>
                        </div>
                        <div className='btn_wrap'>
                            <button className='bt_red big' nexttype='complete' onClick={onClickConfirmBtn}>
                                <span>확인</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default InputBodyAgeHip;