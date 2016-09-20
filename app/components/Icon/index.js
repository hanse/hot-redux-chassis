// @flow

import React from 'react';

type Props = {
  name: string
};

function Icon({ name }: Props) {
  return <i className={`icon ion-${name}`} />;
}

export default Icon;
