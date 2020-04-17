import { combineReducers } from 'redux';

import point from './point';
import steps from './steps';
import atvChart from './actChart';
import reportCommon from './reportCommon';
import healthReportContents from './healthReportContents';
import inputBodyAge from './inputBodyAge';
import activityPhr from './activityPhr';
import mindExam from './mindExam';
import recordBodyWeight from './recordBodyWeight';
import recordBloodPressure from './recordBloodPressure';
import recordBloodSugar from './recordBloodSugar';
import bodyAge from './bodyAge';
import mission from './mission';
import more from './more';
import shopping from './shopping';


export default combineReducers({
    point,
    steps,
    atvChart,
    reportCommon,
    healthReportContents,
    inputBodyAge,
    activityPhr,
    mindExam,
    recordBodyWeight,
    recordBloodPressure,
    recordBloodSugar,
    bodyAge,
    mission,
    more,
    shopping
});