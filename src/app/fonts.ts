import localFont from 'next/font/local';

export const gellix = localFont({
  src: [
    {
      path: '../../public/fonts/Gellix-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gellix',
  display: 'swap',
}); 