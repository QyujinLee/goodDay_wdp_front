import React, { Component } from 'react';

class MissionResult extends Component {

    render() {

        const { data, onClickGoPage } = this.props;

            let dataArr = [];
            let totalCnt = 0;
            let yesCnt = 0;
    
            if(undefined !== data && data.length !== 0){
    
                const arr = data[1].val.split(',');
                totalCnt = data[1].ofrCnt;
                let dataCol = [];
                
                for(let i in  arr){
    
                    const className = arr[i].split(':')[1] === 'Y' ? 'm_chk_yes' : 'm_chk_no';
                    dataCol.push(className);
    
                    if((Number(i) + 1) % 7 === 0 ){
    
                        dataArr.push(dataCol);
                        dataCol = [];
                    }
    
                    if(arr[i].split(':')[1] === 'Y') {
                        yesCnt++;
                    }
                }
            }

        
        return (
            <>
                <header className='header normal'>
                    <div className='title_set'>
                        <a href='#!' className='arrow_lft' onClick={() => onClickGoPage('doMissionNgoMain')}><span className='blind'>페이지이동</span></a>
                        <h1>성과확인</h1>
                    </div>
                </header>

                <div className='contents'>
                    <div className='program_wrap result'>
                        <h2>{data[0].ansDesc}</h2>
                        <div className='achieve_lst_warp'>
                            <ol className='achieve_lst'>
                                {
                                    dataArr.length === 0 ? '' : 
                                    dataArr.map((item, index) => (
                                        <li key={index}>
                                             <ol className="ach_set">
                                                {
                                                    item.map((it,idx) => (
                                                        <li key={idx}><span className={it}></span></li>
                                                    ))
                                                }
                                             </ol>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <p className='result_txt'>
                            <span>{totalCnt}번 중</span>
                            <strong><b className='s_num'>{yesCnt}</b>번 성공! <b className='f_num'>{totalCnt - yesCnt}</b>번 실패!</strong>
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

export default MissionResult;