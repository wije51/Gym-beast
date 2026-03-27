import { motion, useReducedMotion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-xl px-3 py-2 text-sm transition",
      "border border-transparent",
      "hover:border-white/10 hover:bg-slate-900/40",
      isActive ? "bg-slate-900/50 border-white/10 text-white" : "text-slate-200/80"
    );

  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 pt-4">
        <motion.nav
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-slate-900/40">
                <div className="h-4 w-4 rounded bg-gradient-to-r from-blue-400 to-pink-500" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Gym Beast</div>
                <div className="text-[11px] text-slate-200/60">Cinematic Gym</div>
              </div>
            </NavLink>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {isHome ? (
              <>
                <a className="rounded-xl px-3 py-2 text-sm text-slate-200/80 hover:bg-slate-900/40 hover:text-white" href="#plans">
                  Plans
                </a>
                <a className="rounded-xl px-3 py-2 text-sm text-slate-200/80 hover:bg-slate-900/40 hover:text-white" href="#why">
                  Why
                </a>
                <a className="rounded-xl px-3 py-2 text-sm text-slate-200/80 hover:bg-slate-900/40 hover:text-white" href="#coaches">
                  Coaches
                </a>
              </>
            ) : null}
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={isHome ? "#contact" : "/contact"}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              {isHome ? "Get in touch" : "Socials"}
            </motion.a>
          </div>
        </motion.nav>
      </div>
    </div>
  );
}
