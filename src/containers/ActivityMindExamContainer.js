import React, { Component} from 'react';
import { connect } from 'react-redux';

import ActivityMindExam from 'components/ActivityMindExam';
import * as utils from 'lib/utils';

class ActivityMindExamContainer extends Component {

    componentDidMount(){
        utils.extApp('04');
    }
    render() {
        const {rsltData, rsltToggle, mindState} = this.props;
        return (
            <ActivityMindExam rsltData={rsltData} 
                            rsltToggle={rsltToggle} 
                            mindState={mindState}/>
        );
    }
}

export default connect(
    (state) => ({
        rsltData: state.mindExam.get('rsltData'),
        rsltToggle : state.mindExam.get('rsltToggle'),
        mindState : state.mindExam.get('mindState'),
    })
)(ActivityMindExamContainer);