import { Briefcase, Building2, House, Shield, SquareUser, Wrench, type LucideProps } from "lucide-react";
import type { NavIcon as NavIconName } from "@/data/site";

const iconos = {
  inicio: House,
  nosotros: Building2,
  servicios: Briefcase,
  productos: Wrench,
  marcas: Shield,
  contacto: SquareUser,
} satisfies Record<NavIconName, React.ComponentType<LucideProps>>;

// Componente puro: lo pueden usar tanto el Navbar (cliente) como el Footer (servidor).
export default function NavIcon({ name, ...props }: { name: NavIconName } & LucideProps) {
  const Icon = iconos[name];
  return <Icon aria-hidden="true" {...props} />;
}
