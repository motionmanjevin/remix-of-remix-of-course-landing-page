import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { footerNavLinks, legalLinks, socialLinks } from "@/config/navigation";
import Logo from "@/components/Logo";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // If not on homepage, navigate there first with the hash
      if (location.pathname !== "/") {
        navigate("/" + href);
        return;
      }
      
      const element = document.getElementById(targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="relative z-20 bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Left Column - Brand */}
          <div className="md:col-span-5 lg:col-span-6">
            <div className="mb-4">
              <Logo showText={true} size="md" />
            </div>
            <p className="text-muted-foreground/90 text-sm leading-relaxed max-w-sm">
              The structured path to AI fluency. Join thousands of professionals 
              mastering the skill that defines the next decade of work.
            </p>
          </div>

          {/* Middle Column - Explore */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-xs font-semibold text-muted-foreground/90 uppercase tracking-wider mb-5">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground active:text-primary transition-all duration-200 py-1.5 touch-manipulation"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-active:translate-x-0 transition-all duration-200" />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground active:text-primary transition-all duration-200 py-1.5 touch-manipulation"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-active:translate-x-0 transition-all duration-200" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Social */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-xs font-semibold text-muted-foreground/90 uppercase tracking-wider mb-5">
              Social Media
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground active:text-primary transition-all duration-200 py-1.5 touch-manipulation"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-80 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

          {/* Bottom Row - Copyright & Legal */}
          <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} PromptMaster. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
