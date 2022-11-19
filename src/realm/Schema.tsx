import {Realm} from '@realm/react';
const {UUID} = Realm.BSON;

export enum SchemaKey {
  Buddy = 'buddy',
  PhoneNo = 'phone_no',
}

export class PhoneNo implements IPhoneNo {
  static schema = {
    name: SchemaKey.PhoneNo,
    properties: {
      number: {type: 'string'},
      type: {type: 'string'},
    },
  };

  constructor(
    number: string,
    type: 'Home' | 'Mobile' | 'Office' | 'LandPhone',
  ) {
    this.number = number;
    this.type = type;
  }

  public number!: string;
  public type: 'Home' | 'Mobile' | 'Office' | 'LandPhone';
}

export class Buddy implements IBuddy {
  static schema = {
    name: SchemaKey.Buddy,
    primaryKey: 'id',
    properties: {
      id: 'uuid',
      firstName: {type: 'string', indexed: true},
      lastName: 'string?',
      email: 'string?',
      emoji: 'string?',
      createdAt: {type: 'date', default: new Date()},
      phoneNo: {
        type: 'list',
        objectType: SchemaKey.PhoneNo,
      },
      isFavorite: 'bool',
    },
  };

  constructor(_buddy: IBuddy) {
    this.id = _buddy.id ? _buddy.id : (new UUID() as unknown as string);
    this.firstName = _buddy.firstName;
    this.phoneNo = _buddy.phoneNo;
    this.lastName = _buddy.lastName;
    this.email = _buddy.email;
    this.emoji = _buddy.emoji;
    this.isFavorite = _buddy.isFavorite ? _buddy.isFavorite : false;
  }

  public id!: string;
  public firstName!: string;
  public lastName: string | undefined;
  public phoneNo!: IPhoneNo[];
  public email: string | undefined;
  public emoji: string | undefined;
  public isFavorite: boolean;
}
