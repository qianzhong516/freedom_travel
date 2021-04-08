import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import globalStyles from '../utils/globalStyles'

const CustomInput = ({type, width, height, placeholder, value, onChangeText, keyboardType, ...props}) => {

    if(type === "textarea") {
        return (
            <TextInput style={[{
                                width: width,
                                height: height,
                                textAlignVertical: "top",
                                paddingVertical: 8
                              }, styles.input]} 
                       placeholder={placeholder}
                       placeholderTextColor={globalStyles.textColor}
                       value={value}
                       onChangeText={onChangeText}
                       keyboardType={keyboardType}
                       multiline={true}
                       {...props} />
        )
    }

    return (
        <TextInput style={[{
                            width: width,
                            height: height,
                            paddingVertical: 2
                          }, styles.input]} 
                   placeholder={placeholder}
                   placeholderTextColor={globalStyles.textColor}
                   value={value}
                   onChangeText={onChangeText}
                   keyboardType={keyboardType}
                   {...props} />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: globalStyles.textColor,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: globalStyles.textColor,
        fontFamily: "Raleway"
    }
})
export default CustomInput