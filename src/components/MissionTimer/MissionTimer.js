import React, { Component, Fragment } from 'react';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

class MissionTimer extends Component {
    state = {
        elapsed : 0
    }
    
    componentDidMount(){
        utils.extApp('04');
        this.timer = setInterval(this.tick, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    tick = () => {
        let { elapsed } = this.state;
        this.setState({elapsed : Number(elapsed) + 1});
    }
    zeroPad = (nr,base) =>{
        const  len = (String(base).length - String(nr).length)+1;
        return len > 0? new Array(len).join('0')+nr : nr;
    }
    render() {
        const {misnDtlSrno, handleClose, handleSave}  = this.props;

        let contents = {};

        if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_WALK_START <= misnDtlSrno 
            && misnDtlSrno <= ServiceConstants.MISN_DTL_SRNO_WEIGHT_WALK_END) {//30분간 산책하기 7회
            contents.title = '30분간 산책';
            contents.conTitle = '30분간 산책하기';
            contents.className = 'timer_wrap walking';
            contents.time = 30;
        } else if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_STRETCHING_START <= misnDtlSrno 
            && misnDtlSrno <= ServiceConstants.MISN_DTL_SRNO_WEIGHT_STRETCHING_END) {//5분간 스트레칭 하기
            contents.title = '5분간 스트레칭';
            contents.conTitle = '5분간 스트레칭 하기';
            contents.className = 'timer_wrap stretching';
            contents.time = 5;
        } else if(ServiceConstants.MISN_DTL_SRNO_ESTEEM_MEDITATE_START <= misnDtlSrno
            && misnDtlSrno <= ServiceConstants.MISN_DTL_SRNO_ESTEEM_MEDITATE_END) {//5분간 명상하기
            contents.title = '5분간 명상';
            contents.conTitle = '5분간 명상하기';
            contents.className = 'timer_wrap meditation';
            contents.time = 5;
        }

        const totalSeconds = this.state.elapsed;
        const minute = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        const timeText = this.zeroPad(minute, 10) + ":" + this.zeroPad(seconds,10);

        const width = String(totalSeconds / (60 * contents.time) * 100) + "%";
        if(totalSeconds >= (60 * contents.time)) clearInterval(this.timer);

        return (
            <Fragment>
                <header className="header normal">
                    <div className="title_set">
                    <button className="arrow_lft" onClick={handleClose}><span className="blind">페이지이동</span></button>
                    <h1>{contents.title}</h1>
                    </div>
                </header>
                <div className="contents">
                    <div className={contents.className}>
                        <h2 className="cont_title">{contents.conTitle}</h2>
                        <div className="stopwatch_wrap">
                            <div className="stopwatch">
                                <span className="time_progress" style={{width:width}}></span>
                                <time dateTime="04:41">{timeText}</time>
                            </div>
                        </div>
                        <div className="btn_wrap">
                            <ol className="answer_lst yesOrno">
                                <li className="sel">
                                    <button className="bt_grey big" onClick={handleClose}><span>아니오</span></button>
                                </li>
                                <li className="mr_lft"></li>
                                <li>
                                    <button className="bt_red big" onClick={handleSave}><span>다했어요</span></button>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>  
            </Fragment>
        );
    }
}

export default MissionTimer;