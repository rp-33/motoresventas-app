// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const iconTheme = {
    fontSize: 20, // variables.iconFontSize
    color: variable.textColor
  };

  return iconTheme;
};
