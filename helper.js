import {Linking} from "react-native";
import {Text } from 'react-native-elements';
import { useInternalRenderer } from 'react-native-render-html';
export const onPressLink=async(event, href)=>{
  try{
    await Linking.canOpenURL(href);
    try{await Linking.openURL(href);}catch{}
  }catch{}
}

export function CustomImageRenderer(props) {
  const { Renderer, rendererProps } = useInternalRenderer('img', props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onPress = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: uri.replace('1200', '300').replace('800', '200')
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Renderer {...rendererProps} source={thumbnailSource} onPress={onPress} />
      <Modal visible={isModalOpen} onRequestClose={onModalClose}>
        <Renderer {...rendererProps} />
        <Text>A full resolution image!</Text>
        <Button title="Close Modal" onPress={onModalClose} />
      </Modal>
    </View>
  );
}

export function CustomIframeRender(props) {
  const { Renderer, rendererProps } = useInternalRenderer('iframe', props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailSource = {...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: uri.replace('1200', '300').replace('800', '200')
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Renderer {...rendererProps} source={thumbnailSource} onPress={onPress} />
    </View>
  );
}


