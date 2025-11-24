import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/tools": {
    name: "tools",
  },
};

export function Navbar() {
  return (
    <aside className="mb-8 -ml-2 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="fade relative flex scroll-pr-6 flex-row items-start md:overflow-auto">
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative m-1 flex px-2 py-1 align-middle transition-all hover:underline hover:underline-offset-4"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
