import {showMessage} from 'react-native-flash-message';
import {flashModalBackGroundColor} from '../constants/colorsConst';

function ShowAlertMessage(message, type, duration = 3000) {
  const colour =
    type === 'red' || type === 'error'
      ? flashModalBackGroundColor.red
      : flashModalBackGroundColor.green;
  showMessage({
    message: message,
    type: type,
    backgroundColor: colour,
    duration: duration,
  });
}

export {ShowAlertMessage};
