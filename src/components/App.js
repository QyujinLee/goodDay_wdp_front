import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PointPage,
         StepsPage,
         ActivityPage,
         MindExamPage,
         MindExamResultPage,
         RecordBodyWeightPage,
         RecordBloodPressurePage,
         RecordBloodSugarPage,
         DetailBodyWeightPage,
         DetailBloodPressurePage,
         DetailBloodSugarPage, 
         ShoppingPage,
         ReportPage,
         InputBodyAgePage,
         MorePage,
         MissionPage} from 'pages';

function App() {
    return (
        <Switch>
            <Route exact path='/' component={StepsPage} />
            <Route exact path='/point' component={PointPage} />
            <Route exact path='/steps' component={StepsPage} />
            <Route exact path='/activity' component={ActivityPage} />
            <Route exact path='/activity/mindExam' component={MindExamPage} />
            <Route exact path='/activity/mindExamResult' component={MindExamResultPage} />
            <Route exact path='/activity/recordBodyWeight' component={RecordBodyWeightPage} />
            <Route exact path='/activity/recordBloodPressure' component={RecordBloodPressurePage} />
            <Route exact path='/activity/recordBloodSugar' component={RecordBloodSugarPage} />
            <Route exact path='/activity/detailBodyWeight' component={DetailBodyWeightPage} />
            <Route exact path='/activity/detailBloodPressure' component={DetailBloodPressurePage} />
            <Route exact path='/activity/detailBloodSugar' component={DetailBloodSugarPage} />
            <Route exact path='/shopping' component={ShoppingPage} />
            <Route exact path='/report' component={ReportPage} />
            <Route exact path='/report/inputBodyAge' component={InputBodyAgePage} />
            <Route exact path='/more' component={MorePage} />
            <Route exact path='/mission' component={MissionPage} />
        </Switch>
    );
}

export default App;