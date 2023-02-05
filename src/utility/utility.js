import Toast from 'react-native-root-toast';
// import {Vibration} from 'react-native/types';
import ComponentStyles from '../constants/ComponentStyles';
import {ALERT_COLOR} from '../constants/Constatns';

export const toast = (message, alertType) => {
  const bgColor = ALERT_COLOR[alertType];

  // Vibration.vibrate(75);
  // setTimeout(() => Vibration.vibrate(75), 150);

  let toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: bgColor,
    textStyle: {
      fontSize: ComponentStyles.FONT_SIZE.EX_SMALL + 1,
      color: ComponentStyles.COLORS.WHITE,
    },
  });
  setTimeout(() => {
    Toast.hide(toast);
  }, 3000);
};

// export const clickVibrate = () => {
//   Vibration.vibrate(75);
// };
