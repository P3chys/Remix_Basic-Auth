// index.tsx

import { PrismaClient, User } from "@prisma/client";
import { Form, useActionData} from "@remix-run/react";

export async function loader() {
  const prisma = new PrismaClient();
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  await prisma.$disconnect();
  return allUsers;
}


export async function action({request}:{request: any}) {
    let errors = "";
  const form = await request.formData();

  const prisma = new PrismaClient();
  try {
    const allUsers = await prisma.user.create({
        data: { email: form.get("email"), username: form.get("username") },
      });
      console.log(allUsers);
  } catch (error) {
    await prisma.$disconnect();
    errors = "user already exists";
    return errors;
  }
  await prisma.$disconnect();
  return true;
}

export default function Register(){
const errors = useActionData<typeof action>();
  return (
      <Form method="post">
        <div>
          <input name="email" placeholder="Email" size={30} />
          {errors? (
            <span>{errors}</span>
          ) : null}
        </div>
        <div>
          <input name="username" placeholder="User Name" size={30} />
        </div>
        <button type="submit">Register</button>
      </Form>
  );
}