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
                                <ul className='tab_cir'>
                                    <li className='tab02'><a href='#!' onClick={onhandleBodyAgeHeaderTab} type={'Trend'}> </a></li>
                                </ul>
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