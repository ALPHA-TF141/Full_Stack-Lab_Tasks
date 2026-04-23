import './globals.css';
export const metadata = {
    title: 'InventioTrack | Professional Inventory Management',
    description: 'Streamline your inventory with AI-powered forecasting and robust catalog management.',
};
export default function RootLayout({ children, }) {
    return (<html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body antialiased selection:bg-accent/30">{children}</body>
    </html>);
}
