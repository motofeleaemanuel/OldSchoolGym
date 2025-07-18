import Navigation from "@/components/Navigation";
import SplashScreen from "@/components/SplashScreen";
import { Footer } from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SplashScreen />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
