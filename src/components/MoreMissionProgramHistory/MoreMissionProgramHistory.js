import React, { Component } from 'react';

import * as ServiceConstants from 'constants/serviceConstants';

class MoreMissionProgramHistory extends Component {


    getProgramState(stateData) {
        if (ServiceConstants.MORE_MISSION_MISN_STAT_DIV_CD_ING === stateData) {
            return 'state_ing';
        } else if (ServiceConstants.MORE_MISSION_MISN_STAT_DIV_CD_END === stateData) {
            return 'state_end';
        } else if (ServiceConstants.MORE_MISSION_MISN_STAT_DIV_CD_WAITING === stateData) {
            return 'state_yet';
        } else {
            return 'state_yet';
        }
    }

    render() {

        const { program, onClickGoDetail } = this.props;

        return (

            <div className='m_detail_lst_wrap'>
                <p className='m_detail_tit'>프로그램 세부</p>
                <ol className='m_detail_lst'>
                    {
                        undefined !== program ? (
                            program.map((item, index) => {

                                return (
                                    <li key={index}>
                                       <a href='#!' onClick={() => onClickGoDetail(item) }>
                                            <span className='article'>{item.misnDesc}</span>
                                            <span className={this.getProgramState(item.misnStatDivCd)}  >{undefined !== item.misnStatDivNm && '' !== item.misnStatDivNm ? item.misnStatDivNm : '미진행'}</span>
                                        </a>
                                    </li>
                                )
                            })
                        ) : null
                    }
                    <li>
                        <a href='#!'>
                            <span className='article'>혈당 집중 관리</span>
                            <span className='state_yet'>미진행</span>
                        </a>
                    </li>
                    <li>
                        <a href='#!'>
                            <span className='article'>혈압 집중 관리</span>
                            <span className='state_yet'>미진행</span>
                        </a>
                    </li>
                    <li>
                        <a href='#!'>
                            <span className='article'>약 잘 먹기</span>
                            <span className='state_yet'>미진행</span>
                        </a>
                    </li>
                    <li>
                        <a href='#!'>
                            <span className='article'>물 마시기</span>
                            <span className='state_yet'>미진행</span>
                        </a>
                    </li>
                    <li>
                        <a href='#!'>
                            <span className='article'>수면</span>
                            <span className='state_yet'>미진행</span>
                        </a>
                    </li>
                    <li>
                        <a href='#!'>
                            <span className='article'>운동</span>
                            <span className='state_yet'>미진행</span>
                        </a>
                    </li>
                </ol>
            </div>

        );
    }
}
export default MoreMissionProgramHistory;