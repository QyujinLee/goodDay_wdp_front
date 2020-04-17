import React, { Component } from 'react';

class Calendar extends Component {
    render() {

        const { data } = this.props;
        const firstDate = data[0].fromDate;
        const year = firstDate.substring(0, 4);
        let month = firstDate.substring(5, 7);
        // 달력에 빈칸을 넣을 갯수
        let dayNumber = new Date(firstDate).getDay() - 1;
        const emptyArr = [];

        const maxCnt = () => {
            let cnt = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].stpCnt > 10000) {
                    cnt++;
                }
            }
            return cnt;
        };

        if (month.substring(0, 1) === '0') month = month.substring(1);

        // 일요일일경우 6으로 치환
        if (dayNumber === -1) dayNumber = 6;

        for (let i = 0; i < dayNumber; i++) {
            emptyArr.push(' ');
        }

        return (
            <div className='cont_wrap'>
                <dl>
                    <dt>
                        {year}년 {month}월 목표달성
                    </dt>
                    <dd>
                        <div className='calendar'>
                            <ul className='cal_week_lst'>
                                <li>월</li>
                                <li>화</li>
                                <li>수</li>
                                <li>목</li>
                                <li>금</li>
                                <li>토</li>
                                <li>일</li>
                            </ul>
                            <ol className='cal_day_list'>
                                {emptyArr.map((item, index) => (
                                    <li key={index}>
                                        <span>{item}</span>
                                    </li>
                                ))}

                                {data !== undefined && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <li key={index} className={ item.stpCnt > 10000 ? 'max' : '' }>
                                            <span>
                                                {item.fromDate.substring(8, 9) === '0' ? item.fromDate.substring(9) : item.fromDate.substring(8)}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <span></span>
                                )}
                            </ol>
                        </div>
                        <p className='msg_txt'>
                            총 <b>{maxCnt()}번의 만보를 달성</b>하셨어요
                        </p>
                    </dd>
                </dl>
            </div>
        );
    }
}

export default Calendar;
