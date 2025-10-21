// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Tender365...");

  // 1. Ensure Admin Password
  const pw = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(pw, 10);

  // 2. Create Main Company (HQ)
  const company = await prisma.company.upsert({
    where: { slug: "tender365" },
    update: {},
    create: { name: "Tender365 HQ", slug: "tender365" },
  });

  // 3. Create Admin User
  const user = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL! },
    update: {
      name: process.env.ADMIN_NAME || "Admin User",
      password: hashed,
      role: "OWNER",
      companyId: company.id,
    },
    create: {
      email: process.env.ADMIN_EMAIL!,
      name: process.env.ADMIN_NAME || "Admin User",
      password: hashed,
      role: "OWNER",
      companyId: company.id,
    },
  });

  console.log("✅ Admin User Seeded:", user.email);

  // 4. Seed Permissions
  console.log("🔑 Seeding permissions...");

  const perms = [
    { slug: "sales.create", name: "Create sales" },
    { slug: "sales.read", name: "Read sales" },
    { slug: "inventory.read", name: "Read inventory" },
    { slug: "inventory.update", name: "Update inventory" },
    { slug: "products.create", name: "Create products" },
    { slug: "reports.view", name: "View reports" },
    { slug: "customers.manage", name: "Manage customers" },
    { slug: "staff.manage", name: "Manage staff" },
    { slug: "accounting.view", name: "View accounting" },
    { slug: "accounting.manage", name: "Manage accounting" },
  ];

  for (const p of perms) {
    await prisma.permission.upsert({
      where: { slug: p.slug },
      update: { name: p.name },
      create: { slug: p.slug, name: p.name },
    });
  }

  // 5. Seed Role Templates
  console.log("👥 Seeding roles...");

  const ownerRole = await prisma.role.upsert({
    where: { companyId_slug: { companyId: null, slug: "owner" } },
    update: {},
    create: { companyId: null, slug: "owner", name: "Owner", description: "Full access" },
  });

  const managerRole = await prisma.role.upsert({
    where: { companyId_slug: { companyId: null, slug: "manager" } },
    update: {},
    create: { companyId: null, slug: "manager", name: "Manager", description: "Manager role" },
  });

  const cashierRole = await prisma.role.upsert({
    where: { companyId_slug: { companyId: null, slug: "cashier" } },
    update: {},
    create: { companyId: null, slug: "cashier", name: "Cashier", description: "Cashier role" },
  });

  // 6. Map Permissions to Roles
  console.log("🔗 Mapping permissions to roles...");

  const allPerms = await prisma.permission.findMany();

  // Owner = all permissions
  await Promise.all(
    allPerms.map((p) =>
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: ownerRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: ownerRole.id, permissionId: p.id },
      })
    )
  );

  // Manager = all except accounting.manage
  const managerPerms = allPerms.filter((p) => p.slug !== "accounting.manage");
  await Promise.all(
    managerPerms.map((p) =>
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: managerRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: managerRole.id, permissionId: p.id },
      })
    )
  );

  // Cashier = limited perms
  const cashierPerms = allPerms.filter((p) =>
    ["sales.create", "sales.read", "inventory.read"].includes(p.slug)
  );
  await Promise.all(
    cashierPerms.map((p) =>
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: cashierRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: cashierRole.id, permissionId: p.id },
      })
    )
  );

  console.log("✅ Seed Complete");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
