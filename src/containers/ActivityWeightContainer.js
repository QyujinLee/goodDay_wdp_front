import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import ActivityWeight from 'components/ActivityWeight';

import * as activityPhrActions from 'modules/activityPhr';
import * as utils from 'lib/utils';
class ActivityWeightContainer extends Component {

    componentDidMount(){
        utils.extApp('04');
    }
    render() {

        const { weight, latestDateWeight } = this.props;

        let activityWeightArea = null;

        if('' === weight) {

            activityWeightArea = (
                <Link to='/activity/recordBodyWeight'>
                    <ActivityWeight 
                        weight={weight}/>
                </Link>
            );

        } else {

            activityWeightArea = (
                <Link to='/activity/detailBodyWeight'>
                    <ActivityWeight 
                        weight={weight}
                        latestDateWeight={latestDateWeight}/>
                </Link>
            );

        }

        return (
            <Fragment>
                {activityWeightArea}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        weight: state.activityPhr.get('weight'),
        latestDateWeight: state.activityPhr.get('latestDateWeight')
    }),
    (dispatch) => ({
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(ActivityWeightContainer);