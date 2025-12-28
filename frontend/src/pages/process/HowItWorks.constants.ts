export type HowItWorksStep = {
  id: string;
  title: string;
  description: string;

  /** semantic references */
  iconKey: 'calendar' | 'location' | 'sparkles' | 'check';
  gradient: 'cyan' | 'blue' | 'violet';

  /** state flags */
  isLive?: boolean;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'book',
    title: 'Book Online',
    description:
      'Schedule your car wash in seconds using our seamless online booking system.',
    iconKey: 'calendar',
    gradient: 'cyan',
    isLive: true,
  },
  {
    id: 'arrive',
    title: 'We Come to You',
    description:
      'Our mobile detailing team arrives fully equipped at your location.',
    iconKey: 'location',
    gradient: 'blue',
  },
  {
    id: 'detail',
    title: 'Professional Detailing',
    description:
      'Your vehicle receives expert care using premium products and techniques.',
    iconKey: 'sparkles',
    gradient: 'violet',
  },
  {
    id: 'done',
    title: 'Enjoy the Shine',
    description:
      'Drive away with a spotless, showroom-quality finish.',
    iconKey: 'check',
    gradient: 'cyan',
  },
];
