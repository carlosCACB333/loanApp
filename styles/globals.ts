import {StyleSheet} from 'react-native';

export const globals = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  my: {
    marginTop: 8,
    marginBottom: 8,
  },
  p2: {
    padding: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  btn: {
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginVertical: 4,
  },
  select: {
    borderRadius: 8,
  },

  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },

  centerV: {
    justifyContent: 'center',
  },
  sbw: {
    justifyContent: 'space-between',
  },

  brrmd: {
    borderRadius: 8,
  },

  fab: {
    position: 'absolute',
    margin: 8,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },

  modal: {
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  flex2: {
    flex: 2,
  },
  scroll: {
    overflow: 'scroll',
    justifyContent: 'flex-start',
  },

  tooltip: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'black',
    width: 150,
    padding: 8,
    borderRadius: 4,
  },
});
