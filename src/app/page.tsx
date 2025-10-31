import Link from "next/link";

//routes
import { ADMIN_PAGES } from "@/config/pages/admin.config";
import { DASHBOARD_PAGES } from "@/config/pages/dashboard.config";
import { PREMIUM_PAGES } from "@/config/pages/premium.config";
import { PUBLIC_PAGES } from "@/config/pages/public.config";

//Для проверки работы ролей
const pages = [
  PUBLIC_PAGES.LOGIN,
  DASHBOARD_PAGES.PROFILE,
  PREMIUM_PAGES.HOME,
  ADMIN_PAGES.HOME,
  ADMIN_PAGES.MANAGER
]

const Home = () => {
  return (
    <div>
      <h1 className="mt-4">Home Page</h1>
      <br />
      <p>Для проверки, есть страницы:</p>
      <br />
      <ul className="space-y-2">
        {pages.map(page => (
          <li key={page}>
            <Link
              className="hover:underline text-[#1a5dd0] cursor-pointer"
              href={page}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

