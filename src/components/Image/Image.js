import React from "react";
import { Image } from "react-native";

import styles from "./Image.styles";

const ImageComponent = (props) => {

    return(
        <Image 
            //style={[styles.image, props.style]}
            style={[
                styles.image,
                { 
                width: props.width || styles.image.width, 
                height: props.height || styles.image.height, 
                borderRadius: props.borderRadius || styles.image.borderRadius 
                },
                props.style
            ]}
            source ={props.source}            
        />        
    );
}

export default ImageComponent;