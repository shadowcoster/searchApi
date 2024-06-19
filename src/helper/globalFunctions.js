import {Dimensions} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

var dispatch = null;
var isDialogOpen = false;

export const setDispatch = data => {
  dispatch = data;
};

export const setIsDialogOpen = data => {
  isDialogOpen = data;
};

export const getIsDialogOpen = () => {
  return isDialogOpen;
};

export const getInternetStatus = async () => {
  return NetInfo.fetch().then(state => state.isConnected);
};

export const width =
  Dimensions.get('screen').height > Dimensions.get('screen').width
    ? Dimensions.get('screen').width
    : Dimensions.get('screen').height;
export const height =
  Dimensions.get('screen').height > Dimensions.get('screen').width
    ? Dimensions.get('screen').height
    : Dimensions.get('screen').width;
