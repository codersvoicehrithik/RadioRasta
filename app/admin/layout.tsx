import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/authorization";
import { siteConfig } from "@/lib/site-config";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  try {
    await requireAdmin(await headers());
  } catch {
    redirect("/login");
  }

  return <main className="admin-shell"><p>{siteConfig.productName}</p><h1>{siteConfig.adminConsoleTitle}</h1><small>by {siteConfig.companyName}</small>{children}</main>;
}
