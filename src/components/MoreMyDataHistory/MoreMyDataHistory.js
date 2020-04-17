import React, { Component } from 'react';

import * as utils from 'lib/utils';

class MoreMyDataHistory extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

    render() {
        const { onClickGoPage, onClickClass } = this.props;

        return (
            <div className='wrap_app'>
                <header className='header normal'>
                    <div className='title_set'>
                        <a className='arrow_lft' href='#!' onClick={() => onClickGoPage('')}> <span className='blind'>페이지이동</span></a>
                        <h1>My Data</h1>
                    </div>
                </header>

                <div className='contents'>

                    <div className='my_data_wrap'>
                        <div className='title_bx'>
                            <h2>Data 홍익인간</h2>
                            <p>My Data가 세상을 널리 이롭게 합니다.</p>
                        </div>

                        <ul className='my_tab'>
                            <li className='on' rel='tab_conts01' onClick={onClickClass}><a href='#!'>모집중</a></li>
                            <li rel='tab_conts02' onClick={onClickClass} ><a href='#!'>제공중</a></li>
                            <li rel='tab_conts03' onClick={onClickClass}><a href='#!'>제공종료</a></li>
                        </ul>

                        <div className='my_tab_conts tab_conts01' >

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'><em className='ico_new'>new</em>기아자동차</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm' onClick={() => onClickGoPage('myDataAgree')}><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts' onClick={() => onClickGoPage('myDataAgree')}>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_sorento.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 마케팅</span>
                                            <span>보상 : <b>구매 할인 +50만원</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'><em className='ico_new'>new</em>국립 정신 건강센터</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm' ><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_ncmh.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 통계</span>
                                            <span>보상 : <span className='ico_p'></span><b> +1000</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            정신건강에 따른 대사증후군자의 유병 (심혈관질환 , 당뇨 등)율 과의 상관관계
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'>종근당 건강</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm'><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/bitmap.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 마케팅</span>
                                            <span>보상 : <b>구매 할인 +50만원</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'>국립 암센터</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm'><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_cancer.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 학술/논문</span>
                                            <span>보상 : <span className='ico_p'></span><b> +1000</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                        </div>

                        <div className='my_tab_conts tab_conts02' style={{ display: 'none' }}>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'><em className='ico_new'>new</em>기아자동차</span>
                                    <div className='chk_agree'>
                                        <span className='txt_agree'>동의</span>
                                        <a href='#!' className='btn_w_sm'  ><span>철회하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_sorento.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 마케팅</span>
                                            <span>보상 : <b>구매 할인 +50만원</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'><em className='ico_new'>new</em>국립 정신 건강센터</span>
                                    <div className='chk_agree'>
                                        <span className='txt_agree'>동의</span>
                                        <a href='#!' className='btn_w_sm'><span>철회하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_ncmh.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 통계</span>
                                            <span>보상 : <span className='ico_p'></span><b> +1000</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            정신건강에 따른 대사증후군자의 유병 (심혈관질환 , 당뇨 등)율 과의 상관관계
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'>종근당 건강</span>
                                    <div className='chk_agree'>
                                        <span className='txt_agree'>동의</span>
                                        <a href='#!' className='btn_w_sm'><span>철회하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/bitmap.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 마케팅</span>
                                            <span>보상 : <b>구매 할인 +50만원</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'>국립 암센터</span>
                                    <div className='chk_agree'>
                                        <span className='txt_agree'>동의</span>
                                        <a href='#!' className='btn_w_sm'  onClick={() => onClickGoPage('myDataCancel')} ><span>철회하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts' onClick={() => onClickGoPage('myDataCancel')}>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_cancer.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 학술/논문</span>
                                            <span>보상 : <span className='ico_p'></span><b> +1000</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                        </div>

                        <div className='my_tab_conts tab_conts03' style={{ display: 'none' }}>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'><em className='ico_new'>new</em>기아자동차</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm'><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_sorento.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 마케팅</span>
                                            <span>보상 : <b>구매 할인 +50만원</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'><em className='ico_new'>new</em>국립 정신 건강센터</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm'><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_ncmh.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 통계</span>
                                            <span>보상 : <span className='ico_p'></span><b> +1000</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            정신건강에 따른 대사증후군자의 유병 (심혈관질환 , 당뇨 등)율 과의 상관관계
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'>종근당 건강</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm'><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/bitmap.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 마케팅</span>
                                            <span>보상 : <b>구매 할인 +50만원</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                            <div className='agree_bx'>
                                <div className='tit_com_info'>
                                    <span className='name'>국립 암센터</span>
                                    <div className='chk_agree'>
                                        <span className='txt_yet'>미동의</span>
                                        <a href='#!' className='btn_w_sm'><span>동의하기</span></a>
                                    </div>
                                </div>
                                <dl className='agree_conts'>
                                    <dt className='data_com'>
                                        <div className='logo_com'>
                                            <img src='images/img_logo_cancer.png' alt='' />
                                        </div>
                                        <p className='use_info'>
                                            <span>활용 분야 : 학술/논문</span>
                                            <span>보상 : <span className='ico_p'></span><b> +1000</b></span>
                                        </p>
                                    </dt>
                                    <dd className='data_info'>
                                        <p>
                                            퇴근 시간 이후, 건강을 위한 운동/레저취미 활동이 왕성한 3040세대에게 4세대 소렌토 특가안내
                                        </p>
                                        <span className='date'>데이터 제공 예정일 : 2020.03.05</span>
                                    </dd>
                                </dl>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
export default MoreMyDataHistory;