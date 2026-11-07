import LaptopRoundedIcon from '@mui/icons-material/LaptopRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import WatchRoundedIcon from '@mui/icons-material/WatchRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';

export const categories = [
  {
    id: 'phones',
    label: 'Mobile Phones',
    tagline: 'SPECIFICATIONS TO VALUE',
    description: 'Get an estimate for a used phone based on its brand and specifications.',
    icon: SmartphoneRoundedIcon,
    status: 'active',
    path: '/predict/phone',
  },
  {
    id: 'laptops',
    label: 'Laptops',
    tagline: 'RESALE VALUE ESTIMATES',
    description: 'Estimate a used laptop price using its processor, memory, and storage.',
    icon: LaptopRoundedIcon,
    status: 'active',
    path: '/predict/laptop',
  },
  {
    id: 'smartwatches',
    label: 'Smartwatches',
    tagline: 'COMING SOON',
    description: 'Smartwatch price predictions will be available when the model is ready.',
    icon: WatchRoundedIcon,
    status: 'coming-soon',
  },
  {
    id: 'audio',
    label: 'Audio & accessories',
    tagline: 'COMING SOON',
    description: 'Pricing for headphones and other accessories is on the roadmap.',
    icon: HeadphonesRoundedIcon,
    status: 'coming-soon',
  },
];
