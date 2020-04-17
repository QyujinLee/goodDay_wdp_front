import React, { Component, Fragment } from 'react';

class RecordBloodPressure extends Component {
    render() {

        const { bloodPressure, onChangeInputValue, onResetBloodPressureValue, 
                onRecordBloodPressureScroll, onRecordBloodPressure, onClickRemoveBtn } = this.props;

        const inputType = bloodPressure.get('inputType');
        const systolic = bloodPressure.get('bloodPressureSystolic');
        const diastolic = bloodPressure.get('bloodPressureDiastolic');

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        {
                            'modify' !== inputType ? (
                                <>
                                    <h1>혈압 입력</h1>
                                    <div className='right_btn'>
                                        <a href='#!' className='close_btn' onClick={onResetBloodPressureValue}> </a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <a href='/activity/detailBloodPressure' className='arrow_lft'>
                                        <span className='blind'>페이지이동</span>
                                    </a>
                                    <h1>혈압 수정</h1>
                                    <div className='right_btn'>
                                        <a href='#!' className='bt_line' onClick={onClickRemoveBtn}><span>삭제하기</span></a>
                                    </div>
                                </>
                            )

                        }
                        
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_wrap pressure'>
                        <div className='info_input'>
                            {
                                'modify' !== inputType ? (
                                    <span className='noti'>혈압을 입력하세요</span>
                                ) : (
                                    <span className='noti'>혈압을 수정하세요</span>
                                )
                            }
                            <div className='input_bx small'>
                                <span className='tit'>수축기</span>  
                                <input type='tel' className='inp_txt systolic'
                                    value={systolic} onChange={onChangeInputValue}/>
                                <label htmlFor='inp_txt'>mmHg</label>
                            </div>
                        </div>
                        <div className='value_scroll contract'>
                            <div className='value_tooltip'>
                                <span>{systolic}</span>
                            </div>
                            <div className='h_range_slider systolic' onScroll={onRecordBloodPressureScroll}>
                                <div className='range_measure' style={{'width':'2453px'}}>
                                    <ul className='measure_num' style={{'width':'2453px'}}>
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
                                        <li>390</li>
                                        <li>410</li>
                                        <li style={{marginLeft:'71px'}}>430</li>
                                    </ul>
                                </div>
                            </div>
                            <span className='point'></span>
                        </div>
                        <div className='info_input'>
                            <div className='input_bx small'>
                                <span className='tit'>이완기</span>
                                <input type='tel' className='inp_txt diastolic'
                                    value={diastolic} onChange={onChangeInputValue}/>
                                <label htmlFor='inp_txt'>mmHg</label>
                            </div>
                        </div>
                        <div className='value_scroll relaxation'>
                            <div className='value_tooltip'>
                                <span>{diastolic}</span>
                            </div>
                            <div className='h_range_slider diastolic' onScroll={onRecordBloodPressureScroll}>
                                <div className='range_measure' style={{'width':'2453px'}}>
                                    <ul className='measure_num' style={{'width':'2453px'}}>
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
                                        <li>390</li>
                                        <li>410</li>
                                        <li style={{marginLeft:'71px'}}>430</li>
                                    </ul>
                                </div>
                            </div>
                            <span className='point'></span> 
                        </div>
                        <div className='btn_wrap'>
                            <button className='bt_red big' onClick={onRecordBloodPressure}>
                                <span>저장</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RecordBloodPressure;