import { siFacebook, siInstagram, siTiktok, siWhatsapp } from "simple-icons";

const redes = { facebook: siFacebook, instagram: siInstagram, tiktok: siTiktok, whatsapp: siWhatsapp };

export type Red = keyof typeof redes;

export default function SocialIcon({ red, size = 20 }: { red: Red; size?: number }) {
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d={redes[red].path} />
    </svg>
  );
}
