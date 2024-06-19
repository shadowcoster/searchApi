import {StyleSheet} from 'react-native';
import {ColorConst} from '../../constants/colorsConst';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorConst.white,
    flex: 1,
  },
  headerContainer: {
    height: hp(8),
    backgroundColor: ColorConst.offWhite,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
  dropdownContainer: {},
  dropdown: {
    flex: 1.5,
    height: hp(7.5),
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  searchContainer: {
    backgroundColor: ColorConst.white,
    marginTop: hp(3),
    marginHorizontal: wp(5),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: {
    paddingHorizontal: wp(3),
  },
  sectionHeader: {
    color: 'black',
    fontSize: wp(5),
    padding: hp(1),
    backgroundColor: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    margin: wp(0.2),
  },
  itemImage: {
    height: 100,
    width: 100,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: hp(2),
  },
  itemDescription: {
    fontSize: hp(1.5),
  },
  sectionListContent: {
    paddingBottom: hp(25),
  },
  noDataContainer: {
    height: 100,
    marginTop: hp(3),
    backgroundColor: ColorConst.white,
  },
  noDataText: {
    color: 'black',
    textAlign: 'center',
  },
  footer: {
    padding: 10,
  },
});
