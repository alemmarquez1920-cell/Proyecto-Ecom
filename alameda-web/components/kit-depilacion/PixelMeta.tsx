import Script from "next/script";

type Props = {
  /** ID del píxel. Si está vacío, no se carga nada. */
  id: string;
  contenido: { content_name: string; content_type: "product"; currency: "ARS"; value?: number };
};

/**
 * Píxel de Meta: PageView y ViewContent al cargar. "ClicComprar" lo manda EnlacesCompra.
 * La compra la mide Tiendanube con su propio píxel.
 */
export function PixelMeta({ id, contenido }: Props) {
  const pixel = id.replace(/\D/g, "");
  if (!pixel) return null;
  const codigo = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixel}');
fbq('track','PageView');
fbq('track','ViewContent',${JSON.stringify(contenido).replace(/</g, "\\u003c")});`;

  return (
    <>
      <Script id="pixel-meta" strategy="afterInteractive">
        {codigo}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
