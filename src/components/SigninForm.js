import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Formik } from 'formik'

import CustomTextInput from './CustomTextInput'
import CustomButton from './CustomButton'
import CustomText from './CustomText'
import globalStyles from '../utils/globalStyles'

const SigninForm = ({toggleForm, handleSubmit}) => {

    // Styles
    const {formInner, btn, bottomText, error} = styles

    const handleValidation = values => {
        const errors = {}
        if(!values.email) {
            errors.email = "Email is required"
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = "Invalid email address"
        }

        if(!values.password) {
            errors.password = "Password is required"
        }

        return errors
    }


    return (
        <Formik initialValues={{
            email: '',
            password: '',
        }}
        validate={handleValidation}
        validateOnChange={false}
        onSubmit={handleSubmit}>
            {({ handleChange,
                handleSubmit,
                setFieldTouched,
                values,
                touched,
                errors }) => (
                <View style={formInner}>
                    <Image source={require('../../assets/images/logo.png')} width={110} height={64} />
                    <CustomTextInput
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address" 
                        placeholder="Your email"
                        placeholderTextColor="#FFF"
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email && <CustomText style={error}>{errors.email}</CustomText>}
                    <CustomTextInput
                        secureTextEntry
                        placeholder="Your password"
                        placeholderTextColor="#FFF"
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                        value={values.password}
                    />
                    {touched.password && errors.password && <CustomText style={error}>{errors.password}</CustomText>}
                    <CustomButton 
                        onPress={handleSubmit}
                        title="Confirm"
                        style={btn} />
                    <CustomText style={bottomText}>
                        Don’t have an account?
                        <CustomText underline
                                    onPress={toggleForm}>  Sign up here</CustomText>.
                    </CustomText>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    formInner: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    btn: {
        marginTop: 16, 
        marginBottom: 16 
    },
    bottomText: {
        fontSize: 16,
        color: globalStyles.textColor
    },
    error: {
        color: 'red'
    }
})
export default SigninForm