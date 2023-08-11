import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const widthPercentageToDP = percentage => {
  const perc = +percentage.split('%')[0];
  return (width * perc) / 100;
};
export const heightPercentageToDP = percentage => {
  const perc = +percentage.split('%')[0];
  return (height * perc) / 100;
};

export default {
  WIDTH: width,
  HEIGHT: height,
  COLORS: {
    GREY: '#D2D2D2',

    RED: '#f95146',
    ORANGE: '#f0ad4e',
    GREEN: '#fdfdfds',
    ALERT_GREEN: '#5cb85c',
    WHITE: '#ffffff',
    BLACK: '#000000',

    YELLOW_DARAK: '#FFB100',
    YELLOW_LIGHT: '#FBC252',
    LIGHT_GREEN: '#7851a9',
    DARK_GREY: '#434242',
    LIGHT_YELLOW_2: '#F0ECCF',
  },

  FONT_SIZE: {
    // EX_SMALL: 13,
    EX_SMALL: heightPercentageToDP('1.5%'),
    // SMALL: 16,
    SMALL: heightPercentageToDP('1.9%'),
    // MEDIUM: 20,
    MEDIUM: heightPercentageToDP('2.3%'),
    // LARGE: 21,
    LARGE: heightPercentageToDP('2.45%'),
    // EX_LARGE: 25,
    EX_LARGE: heightPercentageToDP('2.9%'),

    EX_LARGE_2: heightPercentageToDP('5%'),
  },

  ICON_SIZE: {
    // EX_SMALL: 16,
    EX_SMALL: heightPercentageToDP('1.9%'),
    // SMALL: 20,
    SMALL: heightPercentageToDP('2.3%'),
    // MEDIUM: 30,
    MEDIUM: heightPercentageToDP('3.45%'),
    // LARGE: 35,
    LARGE: heightPercentageToDP('4%'),
  },

  PARENT_CONTAINER: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
};
