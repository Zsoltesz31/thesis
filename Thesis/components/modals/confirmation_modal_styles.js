import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  modalContent: {
    height: '35%',
    width: '95%',
    backgroundColor: 'white',
    borderRadius:18,
    position: 'absolute',
    bottom: '40%',
    left:'2.5%',
    elevation:5
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#009AB9',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold'
  },
  });