import React, { Component } from 'react';

class BodyAgeHeader extends Component {

    render() {

        const { headerTab } = this.props; // props data
        const { onhandleBodyAgeHeaderTab } = this.props; // props action

        return (

            <header className='header'>
                <div className="title_set">

                    {
                        'Detail' === headerTab ? (
                            <>
                                <h1>비만체형나이</h1>
                                <div className='right_btn'>
                                    <a href='#!' className='bt_line ico_graph' onClick={onhandleBodyAgeHeaderTab} type={'Trend'}>
                                    <span>추이그래프</span> 
                                    </a>
                                </div>
                            </>
                        ) : (
                                <>
                                    <a href='#!' className='arrow_lft' onClick={onhandleBodyAgeHeaderTab} type={'Detail'}><span className='blind'>페이지이동</span></a>
                                    <h1>추이 그래프</h1>
                                </>
                            )
                    }

                </div>
            </header>

        );

    }
}
export default BodyAgeHeader;