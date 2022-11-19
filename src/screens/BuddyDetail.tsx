import React, {useCallback} from 'react';
import {
  RouteProp,
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ScrollView, StyleSheet, View, Dimensions, Alert} from 'react-native';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {ArrowLeft} from '../icons/ArrowLeft';
import {ProfileIcon} from '../components/ProfileIcon';
import {NavigatorParamList} from '../../App';
import {Color} from '../Color';
import {Font} from '../Font';
import {Edit} from '../icons/Edit';
import {Pressable} from '../components/Pressable';
import {useService} from '../realm/Service';

const {width} = Dimensions.get('screen');

type RouteProps = RouteProp<NavigatorParamList, 'Details'>;
type NavigationProps = NavigationProp<NavigatorParamList, 'Details'>;

export const BuddyDetail = () => {
  const {
    params: {buddy},
  } = useRoute<RouteProps>();
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const {onDelete, onUpdate} = useService();

  const onPressRemove = () => {
    Alert.alert("Let's Kick this bugger", '', [
      {
        text: 'Noh 😒',
        style: 'cancel',
      },
      {
        text: 'KICK 🦵',
        style: 'destructive',
        onPress: () => {
          goBack();
          onDelete(buddy);
        },
      },
    ]);
  };

  const onPressFavorite = useCallback(() => {
    const _buddy: IBuddy = {
      id: buddy.id,
      firstName: buddy.firstName,
      lastName: buddy.lastName,
      email: buddy.email,
      emoji: buddy.emoji,
      phoneNo: buddy.phoneNo.map(_phone => ({
        number: _phone.number,
        type: _phone.type,
      })),
      isFavorite: !buddy.isFavorite,
    };
    onUpdate(_buddy);
  }, [buddy, onUpdate]);

  if (!buddy) {
    return <></>;
  }

  console.log(buddy);

  return (
    <View style={styles.root}>
      <Header
        title={''}
        leftIcon={<ArrowLeft />}
        onPressLeft={() => goBack()}
        rightIcon={<Edit />}
        onPressRight={() =>
          navigate('Edit', {
            buddy: buddy,
          })
        }
        backgroundColor={'white'}
      />
      <ScrollView>
        <View style={styles.scrollSubContainer}>
          <ProfileIcon
            firstName={buddy.firstName}
            lastName={buddy.lastName}
            emoji={buddy.emoji}
            size={200}
          />
          <BuddyDetailLabel label="First Name" value={buddy.firstName} />
          <BuddyDetailLabel label="Last Name" value={buddy.lastName} />
          <BuddyDetailLabel label="Email" value={buddy.email} />
          {buddy.phoneNo.map(phone => {
            return <BuddyDetailLabel label={phone.type} value={phone.number} />;
          })}
          <Pressable onPress={onPressRemove} style={styles.buttonContainer}>
            <Text center style={styles.deleteButtonText}>
              Remove The Bugger 👊
            </Text>
          </Pressable>
          {/* <Pressable onPress={onPressFavorite} style={styles.buttonContainer}>
            <Text center style={styles.buttonText}>
              {buddy.isFavorite
                ? 'Remove From Favorite 🤕'
                : 'Add to Favorite 🤩'}
            </Text>
          </Pressable> */}
        </View>
      </ScrollView>
    </View>
  );
};

const BuddyDetailLabel = ({label, value}: {label: string; value?: string}) => {
  if (!value) {
    return <></>;
  }
  return (
    <View style={styles.detailLabelContainer}>
      <Text style={styles.detailLabelText}>{label}</Text>
      <Text selectable style={styles.detailValueText}>
        {value}
      </Text>
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
  detailContainer: {
    padding: 24,
  },
  detailLabelContainer: {
    borderRadius: 10,
    backgroundColor: Color.PastelWhite,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '90%',
    marginVertical: 8,
  },
  detailLabelText: {
    fontSize: 10,
    marginBottom: 4,
  },
  detailValueText: {
    fontFamily: Font.SemiBold,
    color: Color.PastelBlueDark,
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: Color.PastelWhite,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '90%',
    marginVertical: 8,
  },
  buttonText: {
    color: Color.PastelBlack,
    fontFamily: Font.Medium,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 4,
    textAlignVertical: 'center',
  },
  deleteButtonText: {
    color: Color.PastelRed,
    fontFamily: Font.Medium,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 4,
    textAlignVertical: 'center',
  },
});
