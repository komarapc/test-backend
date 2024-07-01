import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
};

const prisma = new PrismaClient();

const users: User[] = [
  {
    id: nanoid(),
    name: 'admin',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('password', 10),
    is_admin: true,
  },
  {
    id: nanoid(),
    name: 'user',
    email: 'user@mail.com',
    password: bcrypt.hashSync('password', 10),
    is_admin: false,
  },
];

async function main() {
  await addUser().finally(() => console.log('User added'));
}

async function addUser() {
  for (const user of users) {
    await prisma.users.create({
      data: user,
    });
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .finally(async () => {
    console.log('Seed done');
    await prisma.$disconnect();
    process.exit(0);
  });
