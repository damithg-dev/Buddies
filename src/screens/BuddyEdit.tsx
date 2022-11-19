import React from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ScrollView, StyleSheet, View, Dimensions, Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import * as yup from 'yup';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {ArrowLeft} from '../icons/ArrowLeft';
import {ProfileIcon} from '../components/ProfileIcon';
import {NavigatorParamList} from '../../App';
import {Color} from '../Color';
import {Font} from '../Font';
import {TextInput} from '../components/TextInput';
import {Pressable} from '../components/Pressable';
import {Styles} from '../Styles';
import {useService} from '../realm/Service';

const {width} = Dimensions.get('screen');

type NavigationProps = NavigationProp<NavigatorParamList, 'Edit'>;
type RouteProps = RouteProp<NavigatorParamList, 'Edit'>;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface FormProps {
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNo: IPhoneNo[];
  emoji?: string;
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required('come on😒, should have buddy first name'),
  lastName: yup.string().trim(),
  email: yup.string().email().trim(),
  emoji: yup.string(),
  phoneNo: yup
    .array()
    .of(
      yup.object().shape({
        number: yup
          .string()
          .required('required')
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(10, 'too short')
          .max(10, 'too long'),
        type: yup.string().min(3, 'cmon').required('Required'),
      }),
    )
    .required("don't you have the buddy phone no... 😱😱")
    .min(1, "don't you have the buddy phone no... 😱😱"),
});

export const BuddyEdit = () => {
  const {onUpdate} = useService();
  const {bottom} = useSafeAreaInsets();
  const {goBack} = useNavigation<NavigationProps>();
  const {
    params: {buddy},
  } = useRoute<RouteProps>();

  const initialValues = {
    firstName: buddy.firstName,
    lastName: buddy.lastName,
    email: buddy.email,
    phoneNo: buddy.phoneNo.map(_phone => ({
      number: _phone.number,
      type: _phone.type,
    })),
    emoji: buddy.emoji,
  };

  const {
    values,
    errors,
    isValid,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (form: FormProps) => {
      const _buddy = {
        id: buddy.id,
        ...form,
      } as IBuddy;
      onUpdate(_buddy);
      goBack();
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <View style={styles.root}>
      <Header
        title={'New Buddy'}
        leftIcon={<ArrowLeft />}
        onPressLeft={() => goBack()}
        backgroundColor={'white'}
      />

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollSubContainer}>
        <ProfileIcon
          size={200}
          firstName={values.firstName}
          lastName={values.lastName}
          emoji={values.emoji}
          editable={true}
          onSelectEmoji={e => {
            setFieldValue('emoji', e, false);
          }}
        />
        <View style={styles.inputsContainer}>
          <TextInput
            label={'First Name'}
            autoCapitalize={'words'}
            value={values.firstName}
            isError={!!errors.firstName}
            errorMessage={errors.firstName ? errors.firstName : ''}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            touched={touched.firstName}
            block
          />
          <TextInput
            label={'Last Name'}
            autoCapitalize={'words'}
            value={values.lastName}
            isError={!!errors.lastName}
            errorMessage={errors.lastName ? errors.lastName : ''}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            touched={touched.lastName}
            block
          />

          <TextInput
            label={'Email'}
            autoCapitalize={'words'}
            keyboardType={'email-address'}
            value={values.email}
            isError={!!errors.email}
            errorMessage={errors.email ? errors.email : ''}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            touched={touched.email}
            block
          />
          {values.phoneNo.map((phone, index) => {
            const error =
              errors.phoneNo && (errors.phoneNo as FormikErrors<IPhoneNo>[])
                ? (errors.phoneNo as FormikErrors<IPhoneNo>[])[index].number
                : undefined;
            const touch =
              touched.phoneNo &&
              (touched.phoneNo as FormikTouched<IPhoneNo>[])[index] &&
              (touched.phoneNo as FormikTouched<IPhoneNo>[])[index].number;

            return (
              <TextInput
                key={index}
                label={phone.type}
                autoCapitalize={'words'}
                keyboardType={'phone-pad'}
                value={phone.number}
                isError={!!error}
                errorMessage={error ? error : ''}
                onChangeText={handleChange(`phoneNo[${index}].number`)}
                onBlur={handleBlur(`phoneNo[${index}].number`)}
                touched={touch}
                maxLength={10}
                block
              />
            );
          })}
          <Pressable
            style={[]}
            onPress={() => values.phoneNo.push({number: '', type: 'Home'})}>
            <Text>Add</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              paddingVertical: bottom,
            },
          ]}>
          <Pressable
            style={[
              Styles.shadowDefault,
              styles.button,
              !isValid && styles.buttonDisabled,
            ]}
            disabled={!isValid}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit();
            }}>
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.PastelGreyLight,
  },
  scrollSubContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  inputsContainer: {
    width: '90%',
    marginTop: '5%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Color.PastelBlack,
    width: '90%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    borderRadius: 32,
    marginBottom: '10%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: Font.Bold,
    fontSize: 16,
    lineHeight: 20,
    color: Color.PastelWhite,
  },
});
