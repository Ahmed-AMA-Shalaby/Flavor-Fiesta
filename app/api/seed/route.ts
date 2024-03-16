import seed from "@/lib/seed";

export const dynamic = "force-dynamic";

const GET = async (request: Request) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response(`Internal authorization header!`, { status: 401 });
    }

    await seed();
    return new Response(`Re-initialized!`, { status: 200 });
  } catch (error) {
    return new Response(`Internal Server Error!`, { status: 500 });
  }
};

export { GET };
