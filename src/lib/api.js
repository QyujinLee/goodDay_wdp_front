import axios from 'axios';

import * as utils from 'lib/utils';

/**
 * axios Header
 */
function commonHeader() {
    return { 
        'Content-Type': 'application/json', 
        'x-Auth': utils.getUserInfo().usrId 
    };
}

/**
 * axios Call 공통
 * @param {*} url 
 * @param {*} params 
 * @param {*} method 
 */
function toAxios(url, params, method) {

    if(window.location.hostname.indexOf('wdp-front') > -1) {
        url = 'https://besvc.icatchup.co.kr' + url;
    }
    const requestOption = {
        headers: commonHeader(),
        url: url
    };

    if (undefined === method) {
        requestOption.method = 'get';
        requestOption.params = params;
    } else {
        requestOption.method = method;
        requestOption.data = params;
    }

    return axios(requestOption).then(response => {
        utils.extApp('05', 'Success');
        return response;
    }).catch(err => {
        utils.extApp('05', 'Fail');
        console.log(err);
    });
}

/* ********** 만보 API ********** */
/**
 * GET /svc/steps
 * 검색어 기준 걸음수를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getStepsDataAPI(params) {
    return toAxios('/svc/steps', params);
}

/**
 * GET /svc/steps/pattern
 * 시간단위 걸음수를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getPatternDataAPI(params) {
    return toAxios('/svc/steps/pattern', params);
}

/**
 * GET /steps/rank/daily
 * 일일 걸음수 랭킹을 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getStepsRankingDailyAPI(params) {
    return toAxios('/svc/steps/rank/daily', params);
}

/**
 * GET /steps/rank/weekly
 * 주 걸음수 랭킹을 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getStepsRankingWeeklyAPI(params) {
    return toAxios('/svc/steps/rank/weekly', params);
}

/**
 * GET /steps/rank/monthly
 * 달 걸음수 랭킹을 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getStepsRankingMonthlyAPI(params) {
    return toAxios('/svc/steps/rank/monthly', params);
}

/* ********** 만보 API ********** */

/* ********** 건강검진 API ********** */
/**
 * GET /svc/health/report/history/year
 * 건강검진 이력 연도 목록을 조회한다.
 * @returns {response}
 */
export function getHealthReportHistoryYearAPI() {
    return toAxios('/svc/health/report/history/year');
}

/**
 * GET /svc/health/report/history
 * 건강검진 이력 목록을 조회한다.
 * @returns {response}
 */
export function getHealthReportHistoryAPI() {
    return toAxios('/svc/health/report/history');
}

/**
 * GET /svc/health/report/living/age
 * 건강검진 상세정보 중 생체나이 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportDetailLivingAgeAPI(params) {
    return toAxios('/svc/health/report/living/age', params);
}

/**
 * GET /svc/health/report/living/age/item
 * 건강검진 상세정보 중 항목별 생체나이 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportDetailLivingAgeItemAPI(params) {
    return toAxios('/svc/health/report/living/age/item', params);
}

/**
 * GET /svc/health/report/body/average
 * 건강검진 신체평균 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportDetailBodyAverageAPI(params) {
    return toAxios('/svc/health/report/body/average', params);
}

/**
 * GET /svc/health/report/history/detail
 * 건강검진 이력 상세 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportDetailAPI(params) {
    return toAxios('/svc/health/report/history/detail', params);
}

/**
 * GET /svc/health/report/normal/scope
 * 건강검진 검진항목별 정상 범위 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportNormalScopeAPI(params) {
    return toAxios('/svc/health/report/normal/scope', params);
}

/**
 * GET /svc/statistic/graph/lbody
 * 건강검진 생체나이 추이 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportLivingAgeTrendAPI(params) {
    return toAxios('/svc/statistic/graph/lbody', params);
}

/**
 * GET /svc/statistic/graph/medi
 * 건강검진 레포트 추이 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getHealthReportTrendAPI(params) {
    return toAxios('/svc/statistic/graph/medi', params);
}

/**
 * GET /svc/statistic/graph/obesity
 * 비만체형나이 추이 그래프 중 최근 1건을 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getStatisticGraphObesityLatelyAPI(params) {
    return toAxios('/svc/statistic/graph/obesity', params);
}

/* ********** 건강검진 API ********** */

/* ********** PHR API ********** */
/**
 * GET /phr/
 * PHR 데이터를 조회한다.
 * @param {*} params 
 * @returns {response}
 */
export function getPhrDataAPI(params) {
    return toAxios('/svc/phr', params);
}

/**
 * POST /phr/body/analysis
 * 비만체형 나이를 입력하여 분석한다.
 * @param {*} params 
 * @returns {response}
 */
export function postPhrBodyAnalysisAPI(params) {
    return toAxios('/svc/phr/body/analysis', params, 'post');
}

/**
 * POST /phr/
 * PHR 데이터를 개별 입력한다. 
 * @param {*} params 
 * @returns {response}
 */
export function postInputPhrDataAPI(params) {
    return toAxios('/svc/phr', params, 'post');
}

/**
 * PUT /phr/
 * PHR 데이터를 개별 수정한다. 
 * @param {*} params 
 * @returns {response}
 */
export function putInputPhrDataAPI(params) {
    return toAxios('/svc/phr', params, 'put');
}

/**
 * DELETE /phr/
 * PHR 데이터를 개별 삭제한다. 
 * @param {*} params 
 * @returns {response}
 */
export function deleteInputPhrDataAPI(params) {
    return toAxios('/svc/phr', params, 'delete');
}

/**
 * GET /phr/body/msmtdt
 * PHR 비만체형나이 측정일자 목록을 조회한다 
 * @returns {response}
 */
export function getPhrBodyMsmtdtAPI() {
    return toAxios('/svc/phr/body/msmtdt');
}
/* ********** PHR API ********** */

/* ********** 아토머스(마음) API ********** */
/**
 * GET /svc/survey
 * 아토머스 문진 내용 조회
 * @param {*} params 
 * @returns {response}
 */
export function getSrvMindExamContents(params) {
    return toAxios('/svc/survey', params);
}

/**
 * POST /svc/survey/answer
 * 아토머스 문진 결과 저장
 * @param {*} params 
 * @returns {response}
 */
export function postSrvMindExamResult(params) {
    return toAxios('/svc/survey/answer', params, 'post');
}

/**
 * GET /svc/survey/result/atms
 * 아토머스 문진 결과 조회
 * @param {*} params 
 * @returns {response}
 */
export function getSrvMindExamResult(params) {
    return toAxios('/svc/survey/result/atms', params);
}
/* ********** 아토머스(마음) API ********** */

/* ********** 포인트 API ********** */

/**
 * POST /svc/point
 * 포인트 등록
 * @param {*} params 
 * @returns {response}
 */
export function postPointAPI(params) {
    return toAxios('/svc/point', params, 'post');
}

/**
 * GET /svc/point
 * 포인트 조회
 * @returns {response}
 */
export function getPointAPI() {
    return toAxios('/svc/point');
}

/**
 * GET /svc/point/existence
 * 포인트 유무 조회
 * @param {*} params 
 * @returns {response}
 */
export function getPointExistenceAPI(params) {
    return toAxios('/svc/point/existence', params);
}


/* ********** 포인트 API ********** */

/* ********** 미션 API ********** */

/**
 * GET /svc/mission/medi
 * 미션 조회(1:건강검진, 2:비만체형, 3:아토머스)
 * @param {*} params 
 * @returns {response}
 */
export function getMissionMediAPI(params) {
    return toAxios('/svc/mission/medi', params);
}

/**
 * GET /svc/mission/day
 * 미션 조회(수행날짜 기준)
 * @param {*} params 
 * @returns {response}
 */
export function getMissionDayAPI(params) {
    return toAxios('/svc/mission/day', params);
}

/**
 * POST /svc/mission/do
 * 미션 수행 처리
 * @param {*} params 
 * @returns {response}
 */
export function postMissionDoAPI(params) {
    return toAxios('/svc/mission/do', params, 'post');
}

/**
 * PUT /svc/mission/do
 * 미션 수행 수정 (답변 수정)
 * @param {*} params 
 * @returns {response}
 */
export function putMissionDoAPI(params) {
    return toAxios('/svc/mission/do', params, 'put');
}

/**
 * GET /svc/mission/medi/ansDtl
 * 미션 답변 목록 조회
 * @param {*} params 
 * @returns {response}
 */
export function getMissionAnswerList(params) {
    return toAxios('/svc/mission/medi/ansDtl', params);
}

/**
 * POST /svc/mission/dos
 * Mission결과 저장[multi]
 * @param {*} params 
 * @returns {response}
 */
export function postMissionSave(params) {
    return toAxios('/svc/mission/dos', params, 'post');
}

/**
 * PUT /svc/mission/do
 * 미션 수행 수정[multi]
 * @param {*} params 
 * @returns {response}
 */
export function putMissionDosAPI(params) {
    return toAxios('/svc/mission/dos', params, 'put');
}

/**
 * PUT /svc/mission
 * Mission 변경
 * @param {*} params 
 * @returns {response}
 */
export function putMission(params) {
    return toAxios('/svc/mission', params, 'put');
}

/**
 * PUT /svc/mission/point
 * Mission 포인트 수행이력 변경
 * @param {*} params 
 * @returns {response}
 */
export function putMissionPointAPI(params) {
    return toAxios('/svc/mission/point', params, 'put');
}

/* ********** 더보기 API ********** */

/**
 * GET /svc/mission/present/condition/daily 
 * 미션현황 데일리 목록 조회
 * @param {*} params 
 * @returns {response}
 */
export function getMissionPresentConditionDailyAPI(params) {
    return toAxios('/svc/mission/present/condition/daily', params);
}

/**
 * GET /svc/mission/present/condition
 * 미션현황 조회(데일리/프로그램/상시)
 * @param {*} params 
 * @returns {response}
 */
export function getMissionPresentConditionAPI(params) {
    return toAxios('/svc/mission/present/condition', params);
}

/**
 * GET /svc/mission/present/condition/program
 * 미션현황 프로그램 세부 목록 조회
 * @param {*} params 
 * @returns {response}
 */
export function getMissionPresentConditionProgramAPI(params) {
    return toAxios('/svc/mission/present/condition/program', params);
}

/**
 * GET /svc/mission/present/condition/program/detail
 * 미션현황 프로그램 세부 조회
 * @param {*} params 
 * @returns {response}
 */
export function getMissionPresentConditionProgramDetailAPI(params) {
    return toAxios('/svc/mission/present/condition/program/detail', params);
}
/**
 * GET /svc/mission/medi/ansDtl/interest
 * 관심사 답변 결과 조회
 * @param {*} params 
 * @returns {response}
 */
export function getInterestAnsList(params) {
    return toAxios('/svc/mission/medi/ansDtl/interest', params);
}

/* ********** 더보기 API ********** */

/* ********** 쇼핑 API ********** */

/**
 * GET /svc/product/recommend
 * 미션 추천상품 조회
 * @param {*} params 
 * @returns {response}
 */
export function getProductRecommendAPI(params) {
    return toAxios('/svc/product/recommend', params);
}
/* ********** 쇼핑 API ********** */