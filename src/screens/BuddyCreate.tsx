import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {ArrowLeft} from '../icons/ArrowLeft';
import {ProfileIcon} from '../components/ProfileIcon';
import {NavigatorParamList} from '../../App';
import {Color} from '../Color';
import {Font} from '../Font';
import {TextInput} from '../components/TextInput';

const {width} = Dimensions.get('screen');

type NavigationProps = NavigationProp<NavigatorParamList, 'Details'>;

type BuddyDetailProps = {
  navigation: NavigationProps;
};

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const validationSchema = yup.object({
  firstName: yup.string().trim().required(''),
  lastName: yup.string().trim().required(''),
  email: yup.string().email().trim(),
});

export const BuddyCreate = ({
  navigation: {navigate, goBack},
}: BuddyDetailProps) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (form: FormProps) => {},
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <View style={styles.root}>
      <Header
        title={'New Buddy'}
        leftIcon={<ArrowLeft />}
        onPressLeft={() => goBack()}
      />
      <ScrollView>
        <View style={styles.scrollSubContainer}>
          <ProfileIcon
            size={200}
            firstName={formik.values.firstName}
            lastName={formik.values.lastName}
          />
          <View style={styles.inputsContainer}>
            <TextInput
              label={'First Name'}
              autoCapitalize={'words'}
              textContentType={'name'}
              value={formik.values.firstName}
              isError={!!formik.errors.firstName}
              errorMessage={
                formik.errors.firstName ? formik.errors.firstName : ''
              }
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              touched={formik.touched.firstName}
              block
            />
            <TextInput
              label={'Last Name'}
              autoCapitalize={'words'}
              textContentType={'familyName'}
              value={formik.values.lastName}
              isError={!!formik.errors.lastName}
              errorMessage={
                formik.errors.lastName ? formik.errors.lastName : ''
              }
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              touched={formik.touched.lastName}
              block
            />

            <TextInput
              label={'Email'}
              autoCapitalize={'words'}
              textContentType={'emailAddress'}
              value={formik.values.email}
              isError={!!formik.errors.email}
              errorMessage={formik.errors.email ? formik.errors.email : ''}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              touched={formik.touched.email}
              block
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollSubContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    width: '90%',
    marginTop: '5%',
  },
});
