import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

const SettingScreen = () => {
  const data = [
    { id: 1, image: 'https://img.icons8.com/color/70/000000/cottage.png', title: 'Order' },
    { id: 2, image: 'https://img.icons8.com/color/70/000000/administrator-male.png', title: 'Like' },
    { id: 3, image: 'https://img.icons8.com/color/70/000000/filled-like.png', title: 'Comment' },
    { id: 4, image: 'https://img.icons8.com/color/70/000000/facebook-like.png', title: 'Download' },
    { id: 5, image: 'https://img.icons8.com/color/70/000000/shutdown.png', title: 'Edit' },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option}>
      <View style={styles.optionContent}>
        <Image style={styles.optionIcon} source={{ uri: item.image }} />
        <Text style={styles.optionTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }}
          />
          <Text style={styles.name}>Jane Doe</Text>
        </View>
      </View>
      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Followers</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Following</Text>
          <Text style={styles.count}>200</Text>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOption}
          contentContainerStyle={styles.optionList}
        />
      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  header: {
    backgroundColor: '#EE82EE',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FF6347',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  optionList: {
    paddingHorizontal: 20,
  },
  option: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
  },
  optionTitle: {
    fontSize: 18,
    color: '#EE82EE',
    marginLeft: 10,
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00CED1',
  },
  count: {
    fontSize: 18,
  },
});

export default SettingScreen;
