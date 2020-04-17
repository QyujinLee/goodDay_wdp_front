import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailBloodPressure extends Component {
    render() {

        const { bloodPressureSystolic, bloodPressureDiastolic, onClickModifyBtn, statusClassName, latestDateBloodPressure } = this.props;

        return (
            <>
                <header className='header'>
                    <div className='title_set'>
                        <a href='/activity' className='arrow_lft'><span className='blind'>페이지이동</span></a>
                        <h1>혈압</h1>
                        <div className='right_btn'>
                            <a href='#!' className='bt_line'><span>목표관리</span></a>
                        </div>
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_chart_wrap'>
                    {'' === bloodPressureSystolic ? (
                        <div className='recent_num_info no_data'>
                            <div className='time_set'>
                                <span>최근</span>
                            </div>
                            <div className='figure'>
                                <p>입력된 데이터가 없습니다.</p>
                            </div> 
                        </div>
                    ) : (
                        <div className={statusClassName}>
                            <div className='time_set'>
                                <span>최근</span>
                                <time>{latestDateBloodPressure}</time>
                            </div>
                            <div className='figure'>
                                <span className='num'>{bloodPressureSystolic}/{bloodPressureDiastolic}<em className='unit'>mmHg</em></span>
                                <Link to='/activity/recordBloodPressure' className='btn_edit' onClick={onClickModifyBtn}/>
                            </div> 
                        </div>
                    )}
                        <ul className='p_info'>
                            <li><span className='con'>수축기</span></li>
                            <li><span className='rel'>이완기</span></li>
                        </ul>
                        <div className='img_box'>
                            <img src='/images/img_graph_press.png' alt='혈압차트'/>
                        </div>

                    </div>
                    <div className='btn_wrap'>
                        <Link to='/activity/recordBloodPressure'>
                            <button className='bt_red big'><span>혈압입력</span></button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

export default DetailBloodPressure;