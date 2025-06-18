import React from "react";
import { Image } from "react-native";

import styles from "./Image.styles";

const ImageComponent = (props) => {

    return(
        <Image 
            style={[styles.image, props.style]}
            source ={props.source}
            width={props.width}
            height={props.height}
            borderRadius={props.borderRadius}
        />        
    );
}

export default ImageComponent;