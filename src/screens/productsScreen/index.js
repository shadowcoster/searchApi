import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SectionList,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ColorConst} from '../../constants/colorsConst';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  categorySearchAction,
  getCategoryAction,
  getProductListAction,
  getSelectedProductAction,
} from '../../redux/actions/products';
import {Picker} from '@react-native-picker/picker';
import { constants} from '../../constants/apiConstants';

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
const renderItemSelected = ({item}) => (
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
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Text style={styles.headerText}>{constants.Products}</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedCategory}
              style={{height: 50, width: 150}}
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

        {selectedCategory != 'all' ? (
          <View>
            <Text style={styles.sectionHeader}>{selectedCategory}</Text>
            <FlatList
              data={selectedProductList?.products}
              renderItem={renderItemSelected}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ) : search?.length > 0 ? (
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
              <Text style={styles.noDataText}>{constants.NoData}</Text>
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
