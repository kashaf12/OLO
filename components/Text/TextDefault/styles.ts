import { StyleSheet } from 'react-native';

const color = (textColor: string) =>
  StyleSheet.create({
    color: {
      color: textColor,
    },
  });

export default color;
