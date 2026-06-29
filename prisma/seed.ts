import { PrismaClient, Role } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!serviceKey) {
    console.error("❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const adminEmail = "admin@radiancecare.com";
  const adminPassword = "RadianceCare@2026";

  // Create the user in Supabase Auth (skip if already exists)
  const { data, error } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
  });

  if (error && !error.message.toLowerCase().includes("already been registered")) {
    console.error("❌ Supabase auth error:", error.message);
    process.exit(1);
  }

  const userId: string | undefined =
    data?.user?.id ??
    (await supabase.auth.admin.listUsers().then(({ data: list }) =>
      list?.users?.find((u) => u.email === adminEmail)?.id
    ));

  if (!userId) {
    console.error("❌ Could not resolve admin user ID");
    process.exit(1);
  }

  await prisma.user.upsert({
    where: { id: userId },
    update: { role: Role.ADMIN },
    create: {
      id: userId,
      email: adminEmail,
      fullName: "RadianceCare Admin",
      role: Role.ADMIN,
    },
  });

  console.log("✅ Admin user ready");
  console.log(`   Email:    ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`   Login at: http://localhost:3000/login`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
