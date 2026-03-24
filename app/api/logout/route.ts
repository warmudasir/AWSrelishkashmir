import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { expires: new Date(0) });
  return new Response(null, { status: 204 });
}
