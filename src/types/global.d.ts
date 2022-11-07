interface Buddy {
  firstName: string;
  lastName?: string;
  phoneNo: PhoneNo[];
  imageUrl?: string;
}

interface PhoneNo {
  number: string;
  type: 'Home' | 'Mobile' | 'Office' | 'LandPhone';
}
