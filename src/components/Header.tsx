import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, Pressable, View} from 'react-native';
import {Text, FontSize} from './Text';
import {Styles} from '../Styles';

interface HeaderProps {
  title: string | {title: string; subTitle: string};
  leftIcon?: JSX.Element;
  onPressLeft?: () => void;
  rightIcon?: JSX.Element;
  onPressRight?: () => void;
  backgroundColor?: 'white' | 'peach' | 'blue-bright';
}

export const Header = ({
  title,
  leftIcon,
  onPressLeft,
  rightIcon,
  onPressRight,
}: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  const renderLeftIcon = () => {
    return (
      <View style={styles.left}>
        {onPressLeft ? (
          <Pressable style={styles.touchable} onPress={onPressLeft}>
            {leftIcon}
          </Pressable>
        ) : (
          <View style={styles.touchable}>
            <View style={styles.placeHolderIcon} />
          </View>
        )}
      </View>
    );
  };

  const RenderRightIcon = () => {
    return (
      <View style={styles.right}>
        {onPressRight ? (
          <Pressable style={styles.touchable} onPress={onPressRight}>
            {rightIcon}
          </Pressable>
        ) : (
          <View style={styles.touchable}>
            <View style={styles.placeHolderIcon} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[{paddingTop: top}, Styles.shadowDefault]}>
      <View style={styles.header}>
        {renderLeftIcon()}
        <View style={styles.content}>
          <Text fontSize={FontSize.H1} center>
            {title}
          </Text>
        </View>
        {RenderRightIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },

  left: {
    zIndex: 10,
  },

  content: {
    flex: 1,
  },

  right: {
    zIndex: 10,
  },

  touchable: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 22,
    paddingVertical: 32,
  },

  placeHolderIcon: {
    width: 24,
  },
});
