import { PrismaClient} from "@prisma/client";
import { Form, useActionData} from "@remix-run/react";

const prisma = new PrismaClient();

export async function action({request}:{request: any}) {
  const form = await request.formData();
  try {
    const allUsers = await prisma.user.create({
        data: { email: form.get("email"), username: form.get("username") },
      });
      console.log(allUsers);
  } catch (error) {
    await prisma.$disconnect();
    return "User with this e-mail already exists";
  }
  await prisma.$disconnect();
  return true;
}

export default function Register(){
const error = useActionData<typeof action>();
  return (
      <Form method="post">
        <div>
          <input name="email" placeholder="Email" />
          {error? (<span>{error}</span>) : null}
        </div>
        <div>
          <input name="username" placeholder="User Name" />
        </div>
        <button type="submit">Register</button>
      </Form>
  );
}