import { auth } from "./auth";
export async function requireAdmin(headers: Headers) { const session = await auth.api.getSession({ headers }); if (!session?.user || session.user.role !== "admin") throw new Error("Unauthorized: an administrator session is required."); return session; }
