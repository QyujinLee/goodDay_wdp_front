import React, { Component } from 'react';

class MoreHeader extends Component {

    render() {

        const { onClickGoPage } = this.props;

        return (
            <header className='header'>
                <div className='title_set'>
                    <a href='#!' onClick={() => onClickGoPage('')} className='arrow_lft'><span className='blind'>페이지이동</span></a>
                    <h1>미션현황</h1>
                    <div className='right_btn'>
                    </div>
                </div>
            </header>
        );
    }
}
export default MoreHeader;