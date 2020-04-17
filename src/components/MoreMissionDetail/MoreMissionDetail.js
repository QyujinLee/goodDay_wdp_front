import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';
class MoreMissionDetail extends Component {

    getAchieveList(data) {

        const state = data.split(':');

        if ('Y' === state[1]) {
            return 'm_chk_yes';
        } else if ('N' === state[1]) {
            return 'm_chk_no';
        } else if ('X' === state[1]) {
            return 'm_chk';
        }
    }

    getStateIng(missionData) {

        if (ServiceConstants.MORE_MISSION_MISN_STAT_DIV_CD_END  === missionData.misnStatDivCd) {
            return (
                <Fragment>
                    <span className='date'>{utils.momentDateFormat(missionData.strDt)} ~ {utils.momentDateFormat(missionData.endDt)}</span>
                    <span className='state_end'>진행완료</span>
                </Fragment>);
        } else if (ServiceConstants.MORE_MISSION_MISN_STAT_DIV_CD_ING === missionData.misnStatDivCd) {
            return (
                <Fragment>
                    <span className='date'>{utils.momentDateFormat(missionData.strDt)} ~ 진행중</span>
                    <span className='total_num'>({missionData.execCnt}회/{missionData.misnOfrCnt}회)</span>
                </Fragment>
            )

        } else if (ServiceConstants.MORE_MISSION_MISN_STAT_DIV_CD_WAITING === missionData.misnStatDivCd) {
            return <span className='date'>대기</span>
        } else {
            return <span className='date'>미진행</span>
        }
    }

    render() {
        const { detail, onClickGoPage, category, selectMission } = this.props;

        return (
            <div className='wrap_app'>
                <header className='header'>
                    <div className='title_set'>
                        <a className='arrow_lft' onClick={() => onClickGoPage('more' === category ? 'missionback' : 'goMain')} href='#!'>
                            <span className='blind'>페이지이동</span>
                        </a>
                        <h1>{(undefined !== detail && 0 !== detail.length) ? detail[0].misnDesc : ''}</h1>
                    </div>
                </header>
                <div className='contents'>
                    <div className='program_wrap'>
                        {undefined === detail ? '' : (undefined !== detail && 0 !== detail.length) && 'guide' === category ? (
                            <h2>{detail[0].misnDesc}</h2>
                        ) : (
                                <div className='condition'>
                                    {(undefined === selectMission || 0 === selectMission.length) ? '' : this.getStateIng(selectMission)}
                                </div>
                            )}

                        {
                            undefined !== detail ?
                                detail.map((item, index) => {

                                    const missionCheck = item.val.split(',');

                                    return (
                                        <dl className='achieve_lst_warp' key={index}>
                                            <dt>{item.misnSubNm}</dt>
                                            <dd>
                                                <ol className='achieve_lst'>
                                                    <li>
                                                        {
                                                            7 >= missionCheck.length ?
                                                                <ol className='ach_set'>
                                                                    {
                                                                        missionCheck.map((inneritem, innerindex) => {
                                                                            return (
                                                                                <li key={innerindex}><span className={this.getAchieveList(inneritem)}></span></li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ol>
                                                                : missionCheck.map((inneritem, innerindex) => {

                                                                    return (
                                                                        0 === ((innerindex) % 7) ? (
                                                                            <ol className='ach_set' key={innerindex}>
                                                                                {
                                                                                    missionCheck.map((ininneritem, ininnerindex) => {

                                                                                        return (innerindex + 6 >= ininnerindex && innerindex <= ininnerindex ? (
                                                                                            <li key={ininnerindex}><span className={this.getAchieveList(ininneritem)}></span></li>
                                                                                        ) : ''
                                                                                        )

                                                                                    })

                                                                                }

                                                                            </ol>
                                                                        ) : null
                                                                    )
                                                                })
                                                        }
                                                    </li>
                                                </ol>
                                                {
                                                    'more' === category ? (
                                                        <div className="num_pt"><b>{utils.comma(item.totPnt)}</b>P</div>
                                                    ) : null
                                                }

                                            </dd>
                                        </dl>
                                    )
                                })
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default MoreMissionDetail;