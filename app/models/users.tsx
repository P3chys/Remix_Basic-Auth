import { PrismaClient, User } from "@prisma/client";
export async function loader() {
    const prisma = new PrismaClient();
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
    await prisma.$disconnect();
    return allUsers;
  }