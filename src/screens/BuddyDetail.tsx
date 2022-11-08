import React from 'react';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {ArrowLeft} from '../icons/ArrowLeft';
import {ProfileIcon} from '../components/ProfileIcon';
import {NavigatorParamList} from '../../App';
import {Color} from '../Color';
import {Font} from '../Font';

const {width} = Dimensions.get('screen');

type RouteProps = RouteProp<NavigatorParamList, 'Details'>;
type NavigationProps = NavigationProp<NavigatorParamList, 'Details'>;

type BuddyDetailProps = {
  route: RouteProps;
  navigation: NavigationProps;
};

export const BuddyDetail = ({
  route,
  navigation: {navigate, goBack},
}: BuddyDetailProps) => {
  const {
    params: {buddy},
  } = route;

  return (
    <View style={styles.root}>
      <Header
        title={''}
        leftIcon={<ArrowLeft />}
        onPressLeft={() => goBack()}
      />
      <ScrollView>
        <View style={styles.scrollSubContainer}>
          <ProfileIcon size={200} {...buddy} />
          <BuddyDetailLabel label="First Name" value={buddy.firstName} />
          <BuddyDetailLabel label="Last Name" value={buddy.lastName} />
          {buddy.phoneNo.map(phone => {
            return <BuddyDetailLabel label={phone.type} value={phone.number} />;
          })}
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
  },
  scrollSubContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 16,
  },
  detailLabelText: {
    fontSize: 10,
    marginBottom: 4,
  },
  detailValueText: {
    fontFamily: Font.SemiBold,
    color: Color.PastelBlue,
  },
});
