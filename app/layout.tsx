import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Footer from "@/components/main/Footer";
import BlobCursor from "@/components/main/BlobCursor";
import StaggeredMenu from "@/components/main/StaggeredMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Portfolio",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <BlobCursor
          blobType="circle"
          fillColor="#5227FF"
          trailCount={3}
          sizes={[60, 125, 75]}
          innerSizes={[20, 35, 25]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={5}
          shadowOffsetX={10}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={100}
        />
        <StarsCanvas />
        <StaggeredMenu
          position="right"
          items={[
            { label: 'About', ariaLabel: 'Learn about me', link: '#about-me' },
            { label: 'Skills', ariaLabel: 'View my skills', link: '#skills' },
            { label: 'Projects', ariaLabel: 'View my projects', link: '#projects' },
            { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
          ]}
          socialItems={[
            { label: 'GitHub', link: 'https://github.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' },
            { label: 'Instagram', link: 'https://instagram.com' },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
          logoUrl="/NavLogo.png"
          accentColor="#ff6b6b"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
