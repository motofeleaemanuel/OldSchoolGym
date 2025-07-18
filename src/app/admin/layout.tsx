import SplashScreen from "@/components/SplashScreen";
import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SplashScreen />
      {children}
    </AuthProvider>
  );
}