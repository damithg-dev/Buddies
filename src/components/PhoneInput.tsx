import React, {forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from 'react-native';
import {Text, textStyles} from './Text';
import {Color} from '../Color';

interface CustomProps {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  touched?: boolean;
  block?: boolean;
}

interface TextInputProps extends CustomProps, RNTextInputProps {}

export const TextInput = forwardRef<any, TextInputProps>(
  (
    {
      label,
      isError,
      errorMessage,
      touched,
      autoCapitalize = 'sentences',
      block,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        {label && <Text>{label}</Text>}
        <RNTextInput
          ref={ref}
          style={[
            styles.input,
            touched && isError && styles.error,
            block && styles.block,
          ]}
          placeholderTextColor={Color.PastelBlueDark}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          {...rest}
        />
        <Text style={[textStyles.text, {color: Color.PastelRed}]}>
          {touched && isError ? errorMessage : ' '}
        </Text>
      </>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: Color.PastelBlueLight,
    backgroundColor: Color.PastelWhite,
    borderColor: Color.PastelGreyDark,
    borderWidth: 1,
    borderRadius: 10,
  },

  normal: {
    borderColor: Color.PastelGreyDark,
    color: Color.PastelBlueLight,
  },

  error: {
    borderColor: Color.PastelRed,
  },

  block: {
    width: '100%',
  },
});
