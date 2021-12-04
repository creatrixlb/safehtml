import React, { useState } from "react";
import {View} from "react-native";
import {decode} from 'html-entities';
import { withTheme} from 'react-native-elements';
import {isNotEmpty} from '@creatrix/typeofdata';
import RenderHtml from 'react-native-render-html';
import tagsStyles from './htmlstyle';
import {onPressLink,CustomImageRenderer} from "./helper";
function SafeHtml({text}){
  const [containerWidth, setContainerWidth] = useState(0);

  const _onViewLayoutChange = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }

  const renderersProps = {
    img: {enableExperimentalPercentWidth: true},
    a: {onPress: onPressLink}
  };

  const renderers = {
    img: CustomImageRenderer,
    iframe:CustomIframeRender
  };
  
  if (isNotEmpty(text)!==true){return null;}
    return (
      <View style={{width:'100%'}} onLayout={_onViewLayoutChange}>
      {containerWidth>0 &&
        <RenderHtml
        source={{html:`${decode(text)}`}}
        //baseStyle={hs.defaultStyle}
        contentWidth={containerWidth}
        tagsStyles={tagsStyles}
        //systemFonts={systemFonts}
        renderers={renderers}
        renderersProps={renderersProps}
      />
      }
      </View>
  );
}
export default withTheme(SafeHtml);
