import React, { Component, Fragment } from 'react';
import SlideRuler from 'components/SlideRulerComponent';

class InputBodyAgeHeight extends Component {

    render() {

        const { inputBodyAge } = this.props; // props data
        const { onClickConfirmBtn, onChangeInputValue, onClosed } = this.props; // props event
        const height = inputBodyAge.get('height');

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        <h1>키 입력</h1>
                        <div className='right_btn'>
                            <a href='#!' className='close_btn' onClick={onClosed}> </a>
                        </div>
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_wrap'>
                        <div className='info_input'>
                            <span className='noti'>키를 입력하세요</span>
                            <div className='input_bx'>
                                <input type='tel' id='inp_txt' className='inp_txt height'
                                    value={height} onChange={onChangeInputValue}
                                />
                                <label htmlFor='inp_txt'>cm</label>
                            </div>
                        </div>
                        <div className='char_wrap'>
                            <div className='my_character'>
                                <div className='head'></div>
                                <div className='leg'></div>
                            </div>
                        </div>

                        <div className='value_scroll height'>
                            <div className='value_tooltip'>
                                <span>{height}</span>
                            </div>
                            <div className='h_range_slider'>
                                <SlideRuler currentValue={height}/>
                            </div>
                            <span className='point'></span>
                        </div>

                        <div className='btn_wrap'>
                            <button className='bt_red big' nexttype='weight' onClick={onClickConfirmBtn}>
                                <span>확인</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default InputBodyAgeHeight;