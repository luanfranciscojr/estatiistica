import 'dotenv/config';
import { hash } from 'bcryptjs';
import { PrismaClient, RoleCode } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();

  const roleEntries = [
    { code: RoleCode.admin, nome: 'Administrador' },
    { code: RoleCode.estatistica, nome: 'Estatistica' },
    { code: RoleCode.verdinho, nome: 'Verdinho' },
    { code: RoleCode.pastor, nome: 'Pastor' },
  ];

  for (const role of roleEntries) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: { nome: role.nome },
      create: role,
    });
  }

  const adminPasswordHash = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { login: 'admin' },
    update: {
      nome: 'Administrador',
      passwordHash: adminPasswordHash,
      ativo: true,
    },
    create: {
      nome: 'Administrador',
      login: 'admin',
      passwordHash: adminPasswordHash,
      ativo: true,
    },
  });

  const adminRole = await prisma.role.findUniqueOrThrow({
    where: { code: RoleCode.admin },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: adminRole.id,
    },
  });

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exitCode = 1;
});
