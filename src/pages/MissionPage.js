import React from 'react';

import Wrap from 'components/Wrap';

import MissionContainer from 'containers/MissionContainer';

const MissionPage = ({match}) => {
  return (
    <Wrap>
      <MissionContainer id={match.params.id}/>
    </Wrap>
  )
}

export default MissionPage;