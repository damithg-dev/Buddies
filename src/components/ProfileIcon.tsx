import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Platform} from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import {Text} from './Text';
import {Font} from '../Font';
import {Color} from '../Color';

const isAndroid = Platform.OS === 'android';

interface ProfileIconsProps {
  firstName: string;
  lastName?: string;
  emoji?: string;
  size: number;
  editable?: boolean;
  onSelectEmoji?: (emoji: string) => void;
}

export const ProfileIcon = ({
  firstName,
  lastName,
  size,
  editable = false,
  onSelectEmoji,
  emoji,
}: ProfileIconsProps) => {
  const styles = dynamicStyles(size);
  const [open, setOpen] = useState(false);

  if (editable) {
    return (
      <>
        <EmojiPicker
          onEmojiSelected={({emoji: e}) => onSelectEmoji && onSelectEmoji(e)}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Pressable onPress={() => setOpen(true)}>
          <View key={firstName} style={styles.rootContainer}>
            <Text center style={emoji ? styles.emojiText : styles.nameText}>
              {emoji !== ''
                ? emoji
                : lastName
                ? `${firstName.slice(0, 1)}${lastName
                    .slice(0, 1)
                    .toUpperCase()}`
                : `${firstName.slice(0, 2)}`.toUpperCase()}
            </Text>
          </View>
          <View style={styles.emojiSelectorContainer}>
            <Text style={styles.emojiSelectorText} center>
              😀
            </Text>
          </View>
        </Pressable>
      </>
    );
  } else {
    return (
      <View key={firstName} style={styles.rootContainer}>
        <Text center style={emoji ? styles.emojiText : styles.nameText}>
          {emoji
            ? emoji
            : lastName
            ? `${firstName.slice(0, 1)}${lastName.slice(0, 1).toUpperCase()}`
            : `${firstName.slice(0, 2)}`.toUpperCase()}
        </Text>
      </View>
    );
  }
};

export const dynamicStyles = (size: number) =>
  StyleSheet.create({
    rootContainer: {
      overflow: 'hidden',
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Color.PastelBlueLight,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    nameText: {
      marginTop: '10%',
      fontSize: size * 0.58,
      fontFamily: Font.Bold,
      lineHeight: size * 0.6,
      color: Color.PastelWhite,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    emojiText: {
      fontSize: size * 0.7,
      lineHeight: isAndroid ? size * 0.82 : size,
      color: Color.PastelWhite,
      textAlign: 'center',
      textAlignVertical: 'center',
      alignSelf: 'center',
    },
    emojiSelectorContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: 25,
      width: 50,
      height: 50,
      backgroundColor: Color.PastelWhite2,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    emojiSelectorText: {
      lineHeight: isAndroid ? 35 : 50,
      fontSize: 32,
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });
