import "./globals.css";
import './framework.css';
import './normalize.css';
import NextTopLoader from 'nextjs-toploader';


export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export const metadata = {
  title: "Tasker | Home",
  description: "Generated by create next app",
//   manifest: "/manifest.json", 
};

export default function RootLayout({ children,params }) {
  const lang = params.lang;
  return (
    <html lang={params.lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={"cu-purple"}>
       <NextTopLoader
  color="#308fe8"
  initialPosition={0.08}
  crawlSpeed={200}
  height={5}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  template='<div class="bar" role="bar"><div class="peg"></div></div>
  <div class="loader-background"></div>
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
/>
        {children}
      </body>
    </html>
  );
}
