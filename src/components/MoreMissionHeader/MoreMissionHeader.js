import React, { Component, Fragment } from 'react';

class MoreMissionHeader extends Component {

    render() {
        const { missionDivision,missionCnt, onClickGoMission } = this.props;
        const mission = missionCnt[0];
        
        return (
            <Fragment>
                {
                    undefined !== mission ? (
                        <ul className='mission_state_tab'>
                            <li className={'daily' === missionDivision?'num_times on':'num_times'} onClick={() => onClickGoMission('daily')}>
                                <a href='#!'>
                                    <span className='tit'>데일리</span>
                                    <span className='time'>{mission.dailyCnt}</span>
                                </a>
                            </li>
                            <li className={'program' === missionDivision?'num_times on':'num_times'} onClick={() => onClickGoMission('program')}>
                                <a href='#!'>
                                    <span className='tit'>프로그램</span>
                                    <span className='time'>{mission.progCnt}</span>
                                </a>
                            </li>
                            <li className='num_times'  onClick={() => onClickGoMission('walking')}>
                                <a href='#!'>
                                    <span className='tit'>걷기</span>
                                    <span className='time'>{mission.alwaCnt} </span>
                                </a>
                            </li>
                        </ul>
                    ) : null
                }
            </Fragment>
        );
    }

}
export default MoreMissionHeader;