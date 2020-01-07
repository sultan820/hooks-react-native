import React, { useState, useEffect, useReducer } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import Dialog from 'react-native-dialog';
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return action.name.length
        ? [
            ...state,
            {
              id: state.length
                ? Math.max(...state.map(todo => todo.id)) + 1
                : 0,
              name: action.name
            }
          ]
        : state;
    }
    case 'DELETE_TODO': {
      let index = state.findIndex(todo => todo.id === action.id);
      state = [...state.slice(0, index), ...state.slice(index + 1)];
      return state;
    }
    default: {
      return state;
    }
  }
};

function ReducerComponent() {
  const initialState = [];
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');

  addTodo = () => {
    dispatch({ type: 'ADD_TODO', name: input });
    toggleAlertDialog();
    setInput('');
  };
  toggleAlertDialog = () => {
    setIsVisible(prevState => !prevState);
    setInput('');
  };
  renderTodo = ({ item }) => (
    <View style={styles.renderView}>
      <Text style={styles.todoTitle}>{item.name}</Text>
      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => dispatch({ type: 'DELETE_TODO', id: item.id })}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={state}
        renderItem={renderTodo}
        keyExtractor={item => `${item.id}`}
      />
      <Dialog.Container visible={isVisible}>
        <Dialog.Title style={{ color: '#192A56' }}>Add Todo</Dialog.Title>
        <Dialog.Input
          onChangeText={value => setInput(value)}
          value={input}
          multiline
          autoCapitalize={'none'}
          autoFocus={true}
        ></Dialog.Input>

        <Dialog.Button
          label="Cancel"
          style={{ color: '#30336B' }}
          onPress={toggleAlertDialog}
        />
        <Dialog.Button
          label="Add"
          style={{ color: '#30336B' }}
          onPress={addTodo}
        />
      </Dialog.Container>

      <TouchableOpacity
        style={styles.addButtonStyle}
        onPress={toggleAlertDialog}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192A56',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  renderView: {
    width: Dimensions.get('window').width - 20,
    marginLeft: 10,
    marginRight: 10,
    height: 70,
    backgroundColor: '#30336B',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10
  },
  btnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 60
  },
  deleteText: {
    color: 'white',
    fontSize: 16
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  addButtonStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30336B',
    borderRadius: 30,
    bottom: 50,
    right: 25
  },
  btnText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ReducerComponent;
