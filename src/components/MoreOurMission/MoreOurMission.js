import React, { Component } from 'react';


import * as utils from 'lib/utils';

class MoreOurMission extends Component {


    componentDidMount() {
        utils.extApp('04');
    }

    render() {
        const { onClickToggle, onClickGoPage } = this.props;

        return (
            <div className='wrap_app gray'>

                <header className='header'>
                    <div className='title_set'>
                        <a href='#!' className='arrow_lft'  onClick={() => onClickGoPage('')}><span className='blind'>페이지이동</span> </a>
                        <h1>우리의 미션</h1>
                    </div>
                </header>

                <div className='contents'>

                    <div className='wdp_mission_wrap'>
                        <div className='img_box'>
                            <img src='images/img_ourmission_01.png' alt='wdp Poc구축' />
                        </div>
                        <ul className='wdp_mission_lst'>
                            <li className='on' onClick ={onClickToggle}>
                                <a href='#!'>혁신</a>
                                <ul className='main_lst'>
                                    <li>AI 모션 인식 기반 Home-Training</li>
                                    <li>건강 통장/건강 선언문</li>
                                    <li>가족(부모/자녀) 건강 관리 서비스</li>
                                </ul>
                                <ol className='sub_lst'>
                                    <li>Block-chain 기반 Consent Mgmt</li>
                                    <li>Together Challenge(월정액 유료 미션)</li>
                                    <li>대사증후군 특화 서비스</li>
                                </ol>
                            </li>
                            <li  onClick ={onClickToggle}>
                                <a href='#!'>지속</a>
                                <ul className='main_lst'>
                                    <li>Community / Social 기능</li>
                                    <li>구독 서비스(Partner 쿠폰 Pack 등)</li>
                                    <li>건강 검진 기관/상품 연계(검진 항목 추천 등)</li>
                                </ul>
                                <ol className='sub_lst'>
                                    <li>포인트 기부(소득공제)</li>
                                    <li>건강 싱품/서비스 공동구매</li>
                                    <li>랭킹, 룰렛 등 Gamification</li>
                                </ol>
                            </li>
                            <li  onClick ={onClickToggle}>
                                <a href='#!'>확장</a>
                                <ul className='main_lst'>
                                    <li>건강 전문 컨텐츠(BTV/SK Store /신라호텔 연계 등)</li>
                                    <li>유전자 DTC/마이크로바이오옴 검사</li>
                                </ul>
                                <ol className='sub_lst'>
                                    <li>고객 위치 정보 기반 맞춤형 서비스</li>
                                    <li>Wearable Device/서비스 결합 BM</li>
                                    <li>헬스장 연계 서비스(O2O)</li>
                                    <li>건강 습관 기능 고도화</li>
                                </ol>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        );
    }


}
export default MoreOurMission;