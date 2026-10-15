import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Retail Demand Planning Studio', description: 'Retail demand forecasting and consensus planning workspace' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
