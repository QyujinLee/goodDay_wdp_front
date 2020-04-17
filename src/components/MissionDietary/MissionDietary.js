import React, { Component, Fragment } from 'react';

class MissionTimer extends Component {

    render() {
        const { handleClose, handleSave, doFirstMissionYN} = this.props;
        return (
            <Fragment>
                <header className="header normal">
                    <div className="title_set">
                        <button className="arrow_lft" onClick={handleClose}><span className="blind">페이지이동</span></button>
                        <h1>식이 입력</h1>
                    </div>
                </header>
                <div className="contents">
                    <div className="diet_info_wrap">
                        <div className="my_meal">
                            <div className="img_box">
                                <img src="images/img_meal_photo.png" alt=""/>
                            </div>
                            <dl className="my_kcal">
                                <dt>
                                    <strong className="kcal_num">1,567 Kcal</strong>
                                    <div className="date">
                                        <span>#아침</span>
                                        <span>2020.3.25 08:17</span>
                                    </div>
                                </dt>
                                <dd className="progress_bar_wrap">
                                    <div className="progress_bar"><span className="value" style={{width: "70%"}}></span></div>
                                    <span className="pro_label">남은 칼로리</span>
                                </dd>
                            </dl>
                        </div>
                        <div className="day_recommended ">
                            <span className="tit">일일 권장량</span>
                            <ul className="ingredient_lst">
                                <li>
                                    <dl>
                                        <dt className="info_ingredient">
                                            <span className="txt">탄수화물</span>
                                        </dt>
                                        <dd className="progress_bar_wrap ingredi01">
                                            <span className="num">48%</span>
                                            <div className="progress_bar"><span className="value" style={{width:"48%"}}></span></div>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt className="info_ingredient">
                                            <span className="txt">지방</span>
                                        </dt>
                                        <dd className="progress_bar_wrap ingredi02">
                                            <span className="num">71%</span>
                                            <div className="progress_bar"><span className="value" style={{width:"71%"}}></span></div>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt className="info_ingredient">
                                            <span className="txt">단백질</span>
                                        </dt>
                                        <dd className="progress_bar_wrap ingredi03">
                                            <span className="num">100%</span>
                                            <div className="progress_bar"><span className="value" style={{width:"25%"}}></span></div>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                            <div className="all_per">
                                <dl>
                                    <dt>전체 밥상의 채소 비율</dt>
                                    <dd>
                                        <span className="per_num">25%</span>
                                        <span className="state">Very Good</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="btn_wrap btn_fixed">
                            <button className="bt_red big" onClick={handleSave}><span>{'N' === doFirstMissionYN ? '수정' : '완료'}</span></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MissionTimer;