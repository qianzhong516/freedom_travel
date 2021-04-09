import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Formik } from 'formik'

import globalStyles from '../utils/globalStyles'
import CustomText from './CustomText'
import CustomTextInput from './CustomTextInput'
import CustomButton from './CustomButton'

const SignupForm = ({toggleForm, handleSubmit}) => {

    // Styles
    const {formInner, textContainer, text, bottomText, btn, error} = styles

    const handleValidation = values => {
        console.log('validating...\n', values)
        const errors = {}
        if(!values.email) {
            errors.email = "Email is required"
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = "Invalid email address"
        }

        if(!values.name) {
            errors.name = "Name is required"
        }

        if(!values.password) {
            errors.password = "Password is required"
        }else if(values.password.length < 4) {
            errors.password = "Password is too short"
        }else if(values.password.length > 8) {
            errors.password = "Password is too long"
        }

        if(!values.password2) {
            errors.password2 = "Please enter your password again"
        }else if(values.password!==values.password2) {
            errors.password2 = "Passwords are not matched"
        }

        return errors
    }

    return (
        <Formik 
            initialValues={{
                name: '',
                email: '',
                password: '',
                password2: ''
            }}
            validate={handleValidation}
            validateOnChange={false}
            onSubmit={handleSubmit}>
                {({ handleChange, 
                    handleSubmit, 
                    values, 
                    errors,
                    touched, 
                    setFieldTouched }) => (
                    <View style={formInner}>
                        <Image source={require('../../assets/images/logo.png')} width={110} height={64} />
                        <View style={textContainer}>
                            <CustomText style={text}>Love Travelling? </CustomText>
                            <CustomText style={text}>Join our community now.</CustomText>
                        </View>
                        
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
                                autoCorrect={false}
                                placeholder="Your Name"
                                placeholderTextColor="#FFF"
                                onChangeText={handleChange('name')}
                                onBlur={() => setFieldTouched('name')}
                                value={values.name}
                            />
                            {touched.name && errors.name && <CustomText style={error}>{errors.name}</CustomText>}
                            <CustomTextInput
                                secureTextEntry
                                placeholder="Your password"
                                placeholderTextColor="#FFF"
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                value={values.password}
                            />
                            {touched.password && errors.password && <CustomText style={error}>{errors.password}</CustomText>}
                            <CustomTextInput 
                                secureTextEntry
                                placeholder="Repeat password"
                                placeholderTextColor="#FFF"
                                onChangeText={handleChange('password2')}
                                onBlur={() => setFieldTouched('password2')}
                                value={values.password2}
                            />
                            {touched.password2 && errors.password2 && <CustomText style={error}>{errors.password2}</CustomText>}
                            <CustomButton 
                                onPress={handleSubmit} 
                                title="Confirm"
                                style={btn} />
                            <CustomText style={bottomText}>
                                Already a user? 
                                <CustomText underline
                                            onPress={toggleForm}> Sign in here</CustomText>.
                            </CustomText>
                    </View>
                )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 16,
        marginBottom: 16
    },
    formInner: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: globalStyles.textColor,
        textAlign: 'center'
    },
    error: {
        color: 'red'
    },
    btn: {
        marginTop: 16, 
        marginBottom: 16 
    },
    bottomText: {
        fontSize: 16,
        color: globalStyles.textColor
    }
})
export default SignupForm 