import React from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {SearchIcon} from '../icons/SearchIcon';
import {XIcon} from '../icons/XIcon';
import {Color} from '../Color';
import {Text} from './Text';

export interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: ViewStyle;
  editable?: boolean;
}

export const SearchInput = ({
  value,
  placeholder,
  autoFocus,
  style,
  editable = true,
  onChange,
  onClose,
}: SearchInputProps) => (
  <View style={[styles.container, style]}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Color.PastelBlueDark}
      value={value}
      onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChange(e.nativeEvent.text);
      }}
      autoFocus={autoFocus}
      editable={editable}
    />

    {onClose !== undefined && (
      <Pressable style={styles.close} onPress={onClose}>
        <XIcon size={24} color={Color.PastelBlueDark} />
      </Pressable>
    )}

    <View style={styles.icon}>
      <SearchIcon size={22} color={Color.PastelBlueDark} />
    </View>
  </View>
);

type SearchButtonProps = {
  text: string;
  style: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
};

export const SearchButton = ({
  text,
  style,
  textStyle = {width: '100%'},
  onPress,
}: SearchButtonProps) => (
  <Pressable style={[styles.container, style]} onPress={onPress}>
    <Text style={[styles.text, textStyle]}>{text}</Text>

    <View style={styles.icon}>
      <SearchIcon color={Color.PastelBlueDark} />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingLeft: 54,
    paddingRight: 24,
    backgroundColor: Color.PastelWhite,
  },

  text: {
    color: Color.PastelBlueLight,
  },

  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingRight: 24,
    fontSize: 16,
    color: Color.PastelBlack,
  },

  icon: {
    position: 'absolute',
    left: 20,
    top: 14,
  },

  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    zIndex: 10,
  },
});
