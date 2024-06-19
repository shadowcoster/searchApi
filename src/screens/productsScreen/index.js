import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SectionList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ColorConst} from '../../constants/colorsConst';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useDispatch, useSelector} from 'react-redux';
import {
  categorySearchAction,
  getCategoryAction,
  getProductListAction,
  getSelectedProductAction,
} from '../../redux/actions/products';
import {Picker} from '@react-native-picker/picker';

const groupByCategory = products => {
  const grouped = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return Object.keys(grouped).map(category => ({
    title: category,
    data: grouped[category],
  }));
};

const groupByProducts = data => {
  if (!data || !Array.isArray(data.products) || data.products.length === 0) {
    return [];
  }

  const grouped = data.products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return Object.keys(grouped).map(category => ({
    title: category,
    data: grouped[category],
  }));
};

const renderItem = ({item}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  </View>
);

const renderSectionHeader = ({section: {title}}) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const ProductsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const {
    categoryList,
    productsList,
    loading,
    total,
    searchedList,
    selectedProductList,
  } = useSelector(state => state?.productsReducer);
  console.log('selectedPROD', selectedProductList);
  const categories = [
    {label: 'all', value: 'all'},
    ...(categoryList?.map(item => ({label: item?.name, value: item?.slug})) ||
      []),
  ];

  const sections = groupByCategory(productsList);
  const searchedSection = groupByProducts(searchedList);

  const fetchMoreData = () => {
    if (!loading) {
      const newSkip = skip + limit;
      setSkip(newSkip);
      dispatch(getProductListAction(limit, newSkip));
    }
  };

  const renderFooter = () =>
    loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;

  useEffect(() => {
    dispatch(getProductListAction(limit, skip));
    dispatch(getCategoryAction());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.headerText}>Products</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedCategory}
              style={{height: 50, width: 250}}
              onValueChange={itemValue => {
                dispatch(getSelectedProductAction(itemValue));
                setSelectedCategory(itemValue);
              }}>
              {categories.map(category => (
                <Picker.Item
                  key={category.value}
                  label={category.label}
                  value={category.label}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={ColorConst.black}
            value={search}
            style={styles.searchInput}
            onChangeText={txt => {
              setSearch(txt);
              setSelectedCategory('all');
              dispatch(categorySearchAction(txt));
            }}
          />
        </View>
        {search?.length > 0 ? (
          searchedSection.length !== 0 ? (
            <SectionList
              sections={searchedSection}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.sectionListContent}
              renderSectionHeader={renderSectionHeader}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data Found</Text>
            </View>
          )
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.sectionListContent}
            renderSectionHeader={renderSectionHeader}
            onEndReachedThreshold={0.5}
            onEndReached={skip <= total && fetchMoreData}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
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
  dropdownContainer: {
    position: 'absolute',
    top: 5,
    right: 0,
  },
  dropdown: {
    width: wp(30),
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
