import { motion } from "framer-motion";
import { ExternalLink, Mail, MapPin } from "lucide-react";

type SocialKey = "facebook" | "instagram" | "youtube" | "github" | "portfolio";

function BrandIcon({ name }: { name: SocialKey }) {
  // Simple inline SVGs to avoid relying on brand-icon exports
  const common = "h-4 w-4";
  switch (name) {
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.5 1.6-1.5H16.8V4.9c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V11H6.8v3h2.5v8h4.2z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5Zm6-2.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.3V8.7L16 12l-6 3.3Z" />
        </svg>
      );
    case "github":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .8A11.5 11.5 0 0 0 8.4 23c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.7 11.7 0 0 1 6.2 0C17.9 3 18.9 3.3 18.9 3.3c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.4 0 4.8-2.8 5.9-5.5 6.2.4.4.9 1.1.9 2.3v3.4c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .8Z" />
        </svg>
      );
    case "portfolio":
    default:
      return <ExternalLink className={common} aria-hidden />;
  }
}

const LINKS: { name: string; href: string; key: SocialKey }[] = [
  { name: "Facebook", href: "https://facebook.com/", key: "facebook" },
  { name: "Instagram", href: "https://instagram.com/", key: "instagram" },
  { name: "YouTube", href: "https://youtube.com/", key: "youtube" },
  { name: "GitHub", href: "https://github.com/", key: "github" },
  { name: "Portfolio", href: "https://example.com/", key: "portfolio" },
];

function LiquidGlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(245,158,11,0.10),transparent_55%),radial-gradient(900px_circle_at_85%_35%,rgba(59,130,246,0.10),transparent_60%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 ff-noise" />

      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-4 py-2 text-xs text-slate-200 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-300/80" />
            Contact • Socials • Portfolio
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Let’s connect
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200/80">
            Follow Gym Beast, view our work, or reach out directly.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <LiquidGlassCard>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10">
                <Mail className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Email</div>
                <div className="text-sm text-slate-200/70">hello@gymbeast.example</div>
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:hello@gymbeast.example"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-md"
            >
              Send email
            </motion.a>
          </LiquidGlassCard>

          <LiquidGlassCard>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10">
                <MapPin className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Location</div>
                <div className="text-sm text-slate-200/70">Dambulla, Sri Lanka</div>
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.google.com/maps/search/?api=1&query=Dambulla%2C%20Sri%20Lanka"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-md"
            >
              Open map
            </motion.a>
          </LiquidGlassCard>

          <LiquidGlassCard>
            <div className="text-sm font-semibold text-white">Socials</div>
            <div className="mt-4 grid gap-3">
              {LINKS.map(({ name, href, key }) => (
                <motion.a
                  key={name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-100 backdrop-blur-md"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400/10 text-amber-200">
                      <BrandIcon name={key} />
                    </span>
                    <span className="text-slate-200/90">{name}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-slate-200/60" />
                </motion.a>
              ))}
            </div>
          </LiquidGlassCard>
        </div>

        <div className="mt-10">
          <LiquidGlassCard>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Want these links customized?</div>
                <div className="text-sm text-slate-200/70">
                  Replace with your real Facebook/GitHub/Instagram/YouTube/Portfolio URLs.
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="/"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-md md:mt-0"
              >
                Back to Home
              </motion.a>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
