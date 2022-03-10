import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class Map extends Component {
  render() {
    return <WebView source={{ uri: 'localhost.charlesproxy.com/api/map.html' }} />;
  }
}