import {appIcons, appImage} from '../assets';

let image_options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const data = [
  {
    id: 0,
    image: appIcons.arabic,
    title: 'Saudi Arabia',
    number: '+966',
  },
  {
    id: 1,
    image: appIcons.pakistan,
    title: 'Pakistan',
    number: '+92',
  },
];

const Home_list = [
  {
    id: 0,
    title: 'Home',
    icon: appIcons.homeBlack,
    route: 'Home',
  },
  {
    id: 1,
    title: 'My Vehicles',
    icon: appIcons.myVehiclesBlack,
    route: 'MyVehicles',
  },
  {
    id: 2,
    title: 'Inbox',
    icon: appIcons.inbox,
    route: 'BottomTab',
  },
  {
    id: 3,
    title: 'My Cart',
    icon: appIcons.myCart,
    route: 'MyCartStack',
  },
  {
    id: 4,
    title: 'Payment',
    icon: appIcons.payment,
    route: 'PaymentStack',
  },
  {
    id: 5,
    title: 'Order History',
    icon: appIcons.orderHistory,
    route: 'OrderHistoryStack',
  },
  {
    id: 6,
    title: 'Subscriptions',
    icon: appIcons.subs,
    route: 'SubscriptionStack',
  },
  {
    id: 7,
    title: 'Favorites',
    icon: appIcons.favorites,
    route: 'FavoriteStack',
  },
  {
    id: 8,
    title: 'Offers',
    icon: appIcons.offers,
    route: 'OffersStack',
  },
  {
    id: 9,
    title: 'Notification',
    icon: appIcons.notifications,
    route: 'NotificationStack',
  },
];

const Gorex_List = [
  {
    id: 0,
    title: 'Gorex on Demand',
    icon: appIcons.gorexOnDemand,
    route: 'GODStack',
  },
  {
    id: 1,
    title: 'Gorex Club',
    icon: appIcons.gorexClub,
    route: 'GorexClubStack',
  },
  {
    id: 2,
    title: 'Gorex Support',
    icon: appIcons.gorexSupport,
    route: 'GorexSupportStack',
  },
  {
    id: 3,
    title: 'Setting',
    icon: appIcons.settings,
    route: 'SettingStack',
  },
];

const offers_List = [
  {
    id: 0,
    image: appImage.carWashFestival,
    title: 'The Carwash\nFestival',
  },
  {
    id: 1,
    image: appIcons.tyres,
    title: 'CAR WASH',
    subTitle: 'UP TO\n10%\nOFF',
  },
  {
    id: 2,
    image: appIcons.tyres,
    title: 'TIRE REPAIR',
    subTitle: 'UP TO\n15%\nOFF',
  },
];

const Top_Service_List = [
  {
    id: 0,
    title: 'OIL CHANGE',
    image: appIcons.oilChange,
  },
  {
    id: 1,
    title: 'TIRE REPAIR',
    image: appIcons.tireRepair,
  },
  {
    id: 2,
    title: 'CAR WASH',
    image: appIcons.carWash,
  },
];

const Sort_List = [
  {
    id: 0,
    title: 'Nearest Providers',
    selected: false,
  },
  {
    id: 1,
    title: 'Highest Ratings',
    selected: false,
  },
  {
    id: 2,
    title: 'Open Now',
    selected: false,
  },
];

const District_List = [
  {
    id: 0,
    title: 'Riyadh',
    subTitle: [
      {id: 0, name: 'Al-Olaya', selected: false},
      {id: 1, name: 'Al-Olaya', selected: false},
      {id: 2, name: 'Al-Olaya', selected: false},
      {id: 3, name: 'Al-Olaya', selected: false},
      {id: 4, name: 'Al-Olaya', selected: false},
      {id: 5, name: 'Al-Olaya', selected: false},
      {id: 6, name: 'Al-Olaya', selected: false},
    ],
    expanded: false,
  },
  {
    id: 1,
    title: 'Riyadh',
    subTitle: [
      {id: 0, name: 'Al-Olaya', selected: false},
      {id: 1, name: 'Al-Olaya', selected: false},
      {id: 2, name: 'Al-Olaya', selected: false},
      {id: 3, name: 'Al-Olaya', selected: false},
      {id: 4, name: 'Al-Olaya', selected: false},
      {id: 5, name: 'Al-Olaya', selected: false},
      {id: 6, name: 'Al-Olaya', selected: false},
    ],
    expanded: false,
  },
  {
    id: 2,
    title: 'Riyadh',
    subTitle: [
      {id: 0, name: 'Al-Olaya', selected: false},
      {id: 1, name: 'Al-Olaya', selected: false},
      {id: 2, name: 'Al-Olaya', selected: false},
      {id: 3, name: 'Al-Olaya', selected: false},
      {id: 4, name: 'Al-Olaya', selected: false},
      {id: 5, name: 'Al-Olaya', selected: false},
      {id: 6, name: 'Al-Olaya', selected: false},
    ],
    expanded: false,
  },
  {
    id: 3,
    title: 'Riyadh',
    subTitle: [
      {id: 0, name: 'Al-Olaya', selected: false},
      {id: 1, name: 'Al-Olaya', selected: false},
      {id: 2, name: 'Al-Olaya', selected: false},
      {id: 3, name: 'Al-Olaya', selected: false},
      {id: 4, name: 'Al-Olaya', selected: false},
      {id: 5, name: 'Al-Olaya', selected: false},
      {id: 6, name: 'Al-Olaya', selected: false},
    ],
    expanded: false,
  },
];

const Repair_List = [
  {
    id: 0,
    title: 'OIL CHANGES',
  },
  {
    id: 1,
    title: 'BRAKE SERVICES',
  },
  {
    id: 2,
    title: 'AC REPAIRS',
  },
  {
    id: 3,
    title: 'ELECTRICAL',
  },
  {
    id: 4,
    title: 'BATTERY',
  },
  {
    id: 5,
    title: 'ENGINE TUNE-UP',
  },
];

const Product_List = [
  {
    id: 0,
    title: 'Oil &\nLubricants',
    backgroundColor: '#00FFBA1A',
    secondColor: '#00FFBA5D',
    image: appImage.motorOilBg,
  },
  {
    id: 1,
    title: 'Tyres\n',
    backgroundColor: '#FFEB001A',
    secondColor: '#FFEB005A',
    image: appIcons.tyres,
  },
  {
    id: 2,
    title: 'Car Care\n',
    backgroundColor: '#FFAE001A',
    secondColor: '#FFAE005A',
    image: appImage.carCare,
  },
  {
    id: 3,
    title: 'Interior\n',
    backgroundColor: '#E9FAF2',
    secondColor: '#E1FA',
    image: appImage.exterior,
  },
  {
    id: 4,
    title: 'Exterior\n',
    backgroundColor: '#00D8FF1A',
    secondColor: '#00D8FF5A',
    image: appImage.exterior,
  },
  {
    id: 5,
    title: 'Engine &\nMechanics',
    backgroundColor: '#FF4E001A',
    secondColor: '#FF4E005A',
    image: appImage.exterior,
  },
  {
    id: 6,
    title: 'Brakes\n',
    backgroundColor: '#00FF1D1A',
    secondColor: '#00FF1D3A',
    image: appImage.exterior,
  },
  {
    id: 7,
    title: 'Light &\nElectrical',
    backgroundColor: '#3100FF1A',
    secondColor: '#3100FF5A',
    image: appImage.lightEle,
  },
];

const Available_Service_List = [
  {
    id: 0,
    title: 'Oil Change',
  },
  {
    id: 1,
    title: 'Oil Change',
  },
  {
    id: 2,
    title: 'Oil Change',
  },
  {
    id: 3,
    title: 'Oil Change',
  },
  {
    id: 4,
    title: 'Oil Change',
  },
];

const Available_Packages_List = [
  {
    id: 0,
    title: 'Deluxe Wash Package',
    subTitle: 'Small Vehicle',
    price: 'SAR 45.99',
  },
  {
    id: 1,
    title: 'Ultimate Shine Package',
    subTitle: 'Medium Vehicle',
    price: 'SAR 45.99',
  },
  {
    id: 2,
    title: 'Golden Oil Change',
    subTitle: '10000 KM',
    price: 'SAR 45.99',
  },
];

const Choose_Options_List = [
  {
    id: 0,
    title: 'Update Card',
    image: appIcons.simpleEdit,
  },
  {
    id: 1,
    title: 'Set as Primary',
    image: appIcons.primary,
  },
];

const Choose_Vehicle_List = [
  {
    id: 0,
    title: 'Update Vehicle',
    image: appIcons.simpleEdit,
  },
  {
    id: 1,
    title: 'Set as Primary',
    image: appIcons.primary,
  },
];

const Settings_Profile_List = [
  {
    id: 0,
    title: 'Account',
    icon: appIcons.account,
    subTitle: 'Incomplete',
    route: 'Account',
  },
  {
    id: 1,
    title: 'Update Password',
    icon: appIcons.passwordBlack,
    route: 'UpdatePassword',
  },
  {
    id: 2,
    title: 'Addresses',
    icon: appIcons.locationPin,
    route: 'Addresses',
  },
];

const country_language_list = [
  {
    id: 0,
    title: 'Language',
    icon: appIcons.language,
    subTitle: 'English',
  },
  {
    id: 1,
    title: 'Country',
    icon: appIcons.country,
    image: appIcons.arabic,
  },
];

const delete_logOut_list = [
  {
    id: 0,
    title: 'Logout',
    icon: appIcons.logout,
  },
  {
    id: 1,
    title: 'Delete Account',
    icon: appIcons.deleteAcc,
    rightIcon: appIcons.redArrow,
  },
];

const privacy_faqs_list = [
  {
    id: 0,
    title: 'Privacy Policy',
  },
  {
    id: 1,
    title: 'FAQ',
  },
];

const Address_List = [
  {
    id: 0,
    title: 'Home',
    icon: appIcons.address,
  },
  {
    id: 1,
    title: 'Work',
    icon: appIcons.address,
  },
  {
    id: 2,
    title: 'Villa',
    icon: appIcons.address,
  },
];

const Order_Details_List = [
  {
    id: 0,
    title: 'Order ID',
    subTitle: 'GOD4321',
  },
  {
    id: 1,
    title: 'Order Total',
    subTitle: 'SAR 675',
  },
  {
    id: 2,
    title: 'Payment Method',
    subTitle: 'Apple Pay',
  },
];

const Service_Details_List = [
  {
    id: 0,
    title: 'Service Provider',
    subTitle: 'Elite Auto Service',
  },
  {
    id: 1,
    title: 'Vehicle',
    subTitle: 'Toyota, ABC 1234',
  },
  {
    id: 2,
    title: 'Booked Date',
    subTitle: '1st Apr, 2023',
  },
  {
    id: 3,
    title: 'Time Slot',
    subTitle: '9:00 - 10:00',
  },
  {
    id: 4,
    title: 'Booked Service',
    subTitle: 'View',
  },
  {
    id: 5,
    title: 'Address',
    subTitle: '4465 Safu, Jeddah, Saudi Arabi..',
  },
];

const Filter_List = [
  {
    id: 0,
    title: 'Today',
  },
  {
    id: 1,
    title: 'This week',
  },
  {
    id: 2,
    title: 'This month',
  },
  {
    id: 3,
    title: 'This year',
  },
  {
    id: 4,
    title: 'Lifetime',
  },
];

export {
  data,
  Sort_List,
  Home_list,
  Gorex_List,
  Repair_List,
  Filter_List,
  offers_List,
  Product_List,
  Address_List,
  image_options,
  District_List,
  Top_Service_List,
  privacy_faqs_list,
  delete_logOut_list,
  Order_Details_List,
  Choose_Vehicle_List,
  Choose_Options_List,
  Service_Details_List,
  Settings_Profile_List,
  country_language_list,
  Available_Service_List,
  Available_Packages_List,
};
