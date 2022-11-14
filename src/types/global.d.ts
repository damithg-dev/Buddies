interface IBuddy {
  id: string;
  firstName: string;
  lastName?: string;
  phoneNo: PhoneNo[];
  emoji?: string;
  email?: string;
}

interface IPhoneNo {
  number: string;
  type: 'Home' | 'Mobile' | 'Office' | 'LandPhone';
}

type IconProps = {
  size?: number;
  color?: string;
  fill?: string;
  width?: number;
  height?: number;
  up?: boolean;
  inline?: boolean;
  marginX?: number;
};
