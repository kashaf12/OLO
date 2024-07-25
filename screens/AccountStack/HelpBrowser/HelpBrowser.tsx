import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

import { HelpBrowserProps } from './HelpBrowser.types';

function HelpBrowser({ url }: HelpBrowserProps) {
  const [loading, loadingSetter] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        onLoad={() => {
          loadingSetter(false);
        }}
      />
      {loading ? (
        <ActivityIndicator style={{ position: 'absolute', bottom: '50%', left: '50%' }} />
      ) : null}
    </View>
  );
}

export default React.memo(HelpBrowser);
