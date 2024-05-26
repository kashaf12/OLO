import { showMessage, MessageOptions } from 'react-native-flash-message';

import styles from './styles';

const FlashMessage = (props: MessageOptions) => {
  showMessage({
    hideOnPress: true,
    hideStatusBar: false,
    type: props.type,
    floating: false,
    titleStyle: styles.text,
    ...props,
    position: props.position ?? 'top',
  });
};

export default FlashMessage;
