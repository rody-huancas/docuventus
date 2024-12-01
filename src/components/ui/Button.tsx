import { cn } from "@/utils";
import Link from "next/link"; // Asegúrate de importar desde tu framework, por ejemplo, `next/link` o `react-router-dom`.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, href, to, ...props }) => {
  const baseClassNames = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "ring-offset-background transition-colors focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "rounded-md px-8 text-base h-11 bg-white text-gray-700",
    className
  );

  if (to) {
    return (
      <Link href={to} className={baseClassNames} {...(props as any)}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClassNames}
        target="_blank"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={baseClassNames} {...props}>
      {children}
    </button>
  );
};
