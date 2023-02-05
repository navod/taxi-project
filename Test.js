import React, {useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';

const data = [
  {id: '1', name: 'John Doe', city: 'San Francisco'},
  {id: '2', name: 'Jane Doe', city: 'New York'},
  {id: '3', name: 'Jim Smith', city: 'Los Angeles'},
  // Add more objects to the array as needed
];

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = text => {
    setSearchTerm(text);

    const filtered = data.filter(item => {
      return (
        item.id.includes(text) ||
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.city.toLowerCase().includes(text.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  return (
    <View>
      <TextInput
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.city}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
