import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailBloodSugar extends Component {
    render() {

        const { bloodSugar, onClickModifyBtn, onClickMealFlagBtn, statusClassName, latestDateBloodSugarBeforeMeal, latestDateBloodSugarAfterMeal } = this.props;
        const bloodSugarMealFlag = bloodSugar.get('bloodSugarMealFlag');
        const bloodSugarBeforeMeal = bloodSugar.get('bloodSugarBeforeMeal');
        const bloodSugarAfterMeal = bloodSugar.get('bloodSugarAfterMeal');

        let detailBloodSugarArea = (<div className='recent_num_info no_data'>
                                        <div className='time_set'>
                                            <span>최근</span>
                                        </div>
                                        <div className='figure'>
                                            <p>입력된 데이터가 없습니다.</p>
                                        </div> 
                                    </div>);
        
        const beforeBloodSugarArea = (  <div className={statusClassName}>
                                            <div className='time_set'>
                                                <span>최근</span>
                                                <time>{latestDateBloodSugarBeforeMeal}</time>
                                            </div>
                                            <div className='figure'>
                                                <span className='txt'>공복</span>
                                                <span className='num'>{bloodSugarBeforeMeal}<em className='unit'>mg/dL</em></span>
                                                <Link to='/activity/recordBloodSugar' className='btn_edit' onClick={onClickModifyBtn}/>
                                            </div>
                                        </div>);
        
        const afterBloodSugarArea = (  <div className={statusClassName}>
                                            <div className='time_set'>
                                                <span>최근</span>
                                                <time>{latestDateBloodSugarAfterMeal}</time>
                                            </div>
                                            <div className='figure'>
                                                <span className='txt'>식후</span>
                                                <span className='num'>{bloodSugarAfterMeal}<em className='unit'>mg/dL</em></span>
                                                <Link to='/activity/recordBloodSugar' className='btn_edit' onClick={onClickModifyBtn}/>
                                            </div>
                                        </div>);
        
        if('both' === bloodSugarMealFlag && ('' !== bloodSugarBeforeMeal || '' !== bloodSugarAfterMeal)) {

            if(latestDateBloodSugarBeforeMeal > latestDateBloodSugarAfterMeal) {
                
                detailBloodSugarArea = beforeBloodSugarArea;

            } else if (latestDateBloodSugarBeforeMeal < latestDateBloodSugarAfterMeal) {

                detailBloodSugarArea = afterBloodSugarArea;

            }

        } else if ('before' === bloodSugarMealFlag && '' !== bloodSugarBeforeMeal) {

            detailBloodSugarArea = beforeBloodSugarArea;

        } else if ('after' === bloodSugarMealFlag && '' !== bloodSugarAfterMeal) {

            detailBloodSugarArea = afterBloodSugarArea;
            
        }

        return (
            <>
                <header className='header'>
                    <div className='title_set'>
                        <a href='/activity' className='arrow_lft'><span className='blind'>페이지이동</span></a>
                        <h1>혈당</h1>
                        <div className='right_btn'>
                            <a href='#!' className='bt_line'><span>목표관리</span></a>
                        </div>
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_chart_wrap'>
                        {detailBloodSugarArea}
                        <ul className='btns_meal'>
                            <li><a href='#!' className='btn_before sel' onClick={onClickMealFlagBtn}>공복</a></li>
                            <li><a href='#!' className='btn_after sel' onClick={onClickMealFlagBtn}>식후</a></li>
                        </ul>
                        {'before' === bloodSugarMealFlag ? (
                            <div className='img_box'>
                                <img src='/images/img_graph_eatbefore.png' alt='혈당차트'/>
                            </div>
                        ) : 'after' === bloodSugarMealFlag ? (
                            <div className='img_box'>
                                <img src='/images/img_graph_eat.png' alt='혈당차트'/>
                            </div>
                        ) : (
                            <div className='img_box'>
                                <img src='/images/img_graph_both.png' alt='혈당차트'/>
                            </div>
                        )}
                    </div>

                    <div className='btn_wrap'>
                        <Link to='/activity/recordBloodSugar'>
                            <button className='bt_red big'><span>혈당입력</span></button>
                        </Link>
                    </div>
                </div>  
            </>
        );
    }
}

export default DetailBloodSugar;