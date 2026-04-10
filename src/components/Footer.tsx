import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hive-line bg-white/65">
      <div className="container-page flex flex-col gap-4 py-6 text-sm text-hive-ink/70 sm:flex-row sm:items-center sm:justify-between">
        <p>BOBBEE onboarding portal - {new Date().getFullYear()} - V1 sans base de donnees</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/bobbee" className="transition hover:text-honey-700">
            BOBBEE
          </Link>
          <Link href="/liens-utiles" className="transition hover:text-honey-700">
            Liens utiles
          </Link>
        </div>
      </div>
    </footer>
  );
}
