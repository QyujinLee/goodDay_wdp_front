import React, { Component, Fragment } from 'react';

class BodyAgeCompare extends Component {

    getprovalueStyle(rankdata) {
        return 'inset(0 ' + (100 - Number(rankdata)) + '% 0 0)';
    }

    render() {

        const { examinationData } = this.props;

        let bodyAgeRankContentsArea = null;

        let rank = -1;

        examinationData.forEach(element => {
            if ('CUSTOM_RANK' === element.mediExamItmDivCd) {
                rank = element.lbdyAgeRnkVal;
            }
        });


        bodyAgeRankContentsArea = (
            <div className='cont_wrap'>
                <dl className='lanking'>
                    <dt>랭킹</dt>
                    <dd>
                        <p className='msg_txt'>동일 연령 100명 중 <span className='bold'>{rank}등</span> 입니다.</p>
                        <div className='lank_progress_wrap'>
                            <div className='progress' style={{height:"52px"}}>
                                <div className='pro_value' style={{ clipPath: this.getprovalueStyle(rank) }}></div>
                            </div>
                            <ol className='label_num'>
                                <li>0</li>
                                <li>100</li>
                            </ol>
                        </div>
                    </dd>
                </dl>
            </div>
        );

        return (
            <Fragment>
                {bodyAgeRankContentsArea}
            </Fragment>
        );
    }
}


export default BodyAgeCompare;