import { showMessage, MessageOptions } from 'react-native-flash-message';

import styles from './styles';

const FlashMessage = (props: MessageOptions) => {
  showMessage({
    hideOnPress: true,
    hideStatusBar: false,
    message: props.message,
    type: props.type,
    position: props.position ?? 'top',
    floating: false,
    titleStyle: styles.text,
  });
};

export default FlashMessage;
