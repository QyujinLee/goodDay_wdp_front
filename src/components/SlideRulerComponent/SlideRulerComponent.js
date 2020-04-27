import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SlideRuler from 'slide-ruler';

import * as utils from 'lib/utils';

import * as inputBodyAgeActions from 'modules/inputBodyAge';
import * as recordBodyWeightActions from 'modules/recordBodyWeight';
import * as recordBloodPressureActions from 'modules/recordBloodPressure';
import * as recordBloodSugarActions from 'modules/recordBloodSugar';

class SlideRulerComponent extends Component {

    componentDidMount(){

        const {currentValue} = this.props;

        this.instance = this._renderSlideRuler(currentValue);
    }

    componentDidUpdate(prevProps, prevState) {
        const {currentValue} = this.props;
        this.instance.options.currentValue = currentValue;
        this.instance.dreawCanvas();
    }
    
    handleValue = (value) => {
        const { slideRulerType, height, bodyWeight, waistCircum, hipCircum, activityWeight, bloodPressureSystolic, bloodPressureDiastolic, bloodSugar, 
                InputBodyAgeActions, RecordBodyWeightActions, RecordBloodPressureActions, RecordBloodSugarActions, rulerClassName } = this.props;
        let range = null;

        if(undefined !== rulerClassName && 'bloodPressure' === slideRulerType) {

            if('systolic' === rulerClassName) { // 활동 수축기 혈압
                range = utils.getBodyAgeValueRange('bloodPressure');
    
                if(bloodPressureSystolic !== value && range.min <= value && ( bloodPressureSystolic >= range.min || value > range.min)) {
                    // redux 값 set
                    RecordBloodPressureActions.setRecordBloodPressureSystolic({
                        bloodPressureSystolic : value
                    });
                }
            } else if('diastolic' === rulerClassName) { // 활동 이완기 혈압
                range = utils.getBodyAgeValueRange('bloodPressure');
    
                if(bloodPressureDiastolic !== value && range.min <= value && ( bloodPressureDiastolic >= range.min || value > range.min)) {
                    // redux 값 set
                    RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                        bloodPressureDiastolic : value
                    });
                }
            }

        } else {

            if('height' === slideRulerType) { // 비만체형나이 신장 
                range = utils.getBodyAgeValueRange('height');
    
                if(height !== value && range.min <= value && ( height >= range.min || value > range.min)) {
                    
                    // 맨 마지막에 '.'이 있을 경우 redux set 하지 않음
                    const str = String(height);
                    if('.' !== str.charAt(str.length-1)){
                        // redux 값 set
                        InputBodyAgeActions.setInputBodyAgeHeight({ height : value });
                    } else if('.' === str.charAt(str.length-1) && Number(str) !== value){ // 마지막에 '.'이 있으나 스크롤과 값이 다를때 set
                        // redux 값 set
                        InputBodyAgeActions.setInputBodyAgeHeight({ height : value });
                    }

                } 

            } else if('weight' === slideRulerType) { // 비만체형나이 체중
                range = utils.getBodyAgeValueRange('bodyWeight');
    
                if(bodyWeight !== value && range.min <= value && ( bodyWeight >= range.min || value > range.min)) {

                    // 맨 마지막에 '.'이 있을 경우 redux set 하지 않음
                    const str = String(bodyWeight);
                    if('.' !== str.charAt(str.length-1)){
                        // redux 값 set
                        InputBodyAgeActions.setInputBodyAgeWeight({ bodyWeight : value });
                    } else if('.' === str.charAt(str.length-1) && Number(str) !== value){ // 마지막에 '.'이 있으나 스크롤과 값이 다를때 set
                        // redux 값 set
                        InputBodyAgeActions.setInputBodyAgeWeight({ bodyWeight : value });
                    }
                }
    
            } else if('waist' === slideRulerType) { // 비만체형나이 허리둘레
                range = utils.getBodyAgeValueRange('waistCircum');
    
                if(waistCircum !== value && range.min <= value && ( waistCircum >= range.min || value > range.min)) {
                    // redux 값 set
                    InputBodyAgeActions.setInputBodyAgeWaist({
                        waistCircum : value
                    });
                }
    
            } else if('hip' === slideRulerType) { // 비만체형나이 엉덩이둘레
                range = utils.getBodyAgeValueRange('hipCircum');
    
                if(hipCircum !== value && range.min <= value && ( hipCircum >= range.min || value > range.min)) {
                    // redux 값 set
                    InputBodyAgeActions.setInputBodyAgeHip({
                        hipCircum : value
                    });
                }
    
            } else if('activityWeight' === slideRulerType) { // 활동 체중
                range = utils.getBodyAgeValueRange('bodyWeight');
                                          
                if(activityWeight !== value && range.min <= value  && ( activityWeight >= range.min || value > range.min))  {

                    // 맨 마지막에 '.'이 있을 경우 redux set 하지 않음
                    const str = String(activityWeight);
                    if('.' !== str.charAt(str.length-1)){
                        // redux 값 set
                        RecordBodyWeightActions.setRecordBodyWeight({ weight : value });
                    } else if('.' === str.charAt(str.length-1) && Number(str) !== value){ // 마지막에 '.'이 있으나 스크롤과 값이 다를때 set
                        // redux 값 set
                        RecordBodyWeightActions.setRecordBodyWeight({ weight : value });
                    }

                }
            } else if('bloodSugar' === slideRulerType) { // 활동 혈당
                range = utils.getBodyAgeValueRange('bloodSugar');

                if(bloodSugar !== value && range.min <= value && ( bloodSugar >= range.min || value > range.min)) {
                    // redux 값 set
                    RecordBloodSugarActions.setRecordBloodSugar({
                        bloodSugar : value
                    });
                }
            }
        }

        
    }
    
    getRulerOptions= () =>{
        const {slideRulerType, rulerClassName} = this.props;
        let options = {};
        options.rulerClassName =  rulerClassName === undefined ? '.slideRuler' : '.slideRuler.' + rulerClassName;

        if('height' === slideRulerType) {
            options.maxValue = utils.getBodyAgeValueRange('height').max;
            options.minValue = utils.getBodyAgeValueRange('height').min;
        } else if('weight' === slideRulerType || 'activityWeight' === slideRulerType) {
            options.maxValue = utils.getBodyAgeValueRange('bodyWeight').max;
            options.minValue = utils.getBodyAgeValueRange('bodyWeight').min;
        } else if('waist' === slideRulerType) {
            options.maxValue = utils.getBodyAgeValueRange('waistCircum').max;
            options.minValue = utils.getBodyAgeValueRange('waistCircum').min;
        } else if('hip' === slideRulerType) {
            options.maxValue = utils.getBodyAgeValueRange('hipCircum').max;
            options.minValue = utils.getBodyAgeValueRange('hipCircum').min;
        } else if('bloodPressure' === slideRulerType ) {
            options.maxValue = utils.getBodyAgeValueRange('bloodPressure').max;
            options.minValue = utils.getBodyAgeValueRange('bloodPressure').min;
        } else if('bloodSugar' === slideRulerType) {
            options.maxValue = utils.getBodyAgeValueRange('bloodSugar').max;
            options.minValue = utils.getBodyAgeValueRange('bloodSugar').min;
        }
        if('height' === slideRulerType || 'weight' === slideRulerType || 'activityWeight' === slideRulerType) {
            options.precision = 0.1;
        } else {
            options.precision = 1;
        }
        return options;
    }

    _renderSlideRuler = (currentValue) => {
        const options = this.getRulerOptions();
        return new SlideRuler (
            {
                el: document.querySelector(options.rulerClassName),
                maxValue: options.maxValue,
                minValue: options.minValue,
                currentValue: currentValue,
                handleValue: this.handleValue,
                lineWidth: 1,
                precision: options.precision,
                fontSize : 16,
                fontColor : '#999',
                heightDecimal : 26
            }
            );
        }
        
    render() {
        const {rulerClassName} = this.props;
        const className = rulerClassName === undefined ? 'slideRuler' : 'slideRuler ' + rulerClassName;
        return (
            <div className={className}></div>
        );
    }
}
export default connect(
    (state) => ({
        height: state.inputBodyAge.get('height'),
        bodyWeight: state.inputBodyAge.get('bodyWeight'),
        waistCircum: state.inputBodyAge.get('waistCircum'),
        hipCircum: state.inputBodyAge.get('hipCircum'),
        activityWeight: state.recordBodyWeight.get('weight'),
        bloodPressureSystolic: state.recordBloodPressure.get('bloodPressureSystolic'),
        bloodPressureDiastolic: state.recordBloodPressure.get('bloodPressureDiastolic'),
        bloodSugar: state.recordBloodSugar.get('bloodSugar'),
        slideRulerType: state.activityPhr.get('slideRulerType')
    }),
    (dispatch) => ({
        InputBodyAgeActions: bindActionCreators(inputBodyAgeActions, dispatch),
        RecordBodyWeightActions: bindActionCreators(recordBodyWeightActions, dispatch),
        RecordBloodPressureActions: bindActionCreators(recordBloodPressureActions, dispatch),
        RecordBloodSugarActions: bindActionCreators(recordBloodSugarActions, dispatch),
    })
)(SlideRulerComponent);