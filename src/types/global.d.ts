interface IBuddy {
  id: string;
  firstName: string;
  lastName?: string;
  phoneNo: PhoneNo[];
  imageUrl?: string;
  email?: string;
}

interface IPhoneNo {
  number: string;
  type: 'Home' | 'Mobile' | 'Office' | 'LandPhone';
}
