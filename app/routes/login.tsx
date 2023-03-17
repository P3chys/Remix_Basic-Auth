import { PrismaClient } from "@prisma/client";
import { Form, useActionData } from "@remix-run/react";
import { findUser } from "~/models/one_user";

export async function action({ request }: { request: any }) {
    const prisma = new PrismaClient();
    const form = await request.formData();
    const email = form.get("email");
    try {
        if (form.get("email") != "") {
            const user = findUser(email);
            if ((await user).email == form.get("email") && (await user).username == form.get("username"))
                //START SESSION
                console.log("Start session")
        }
    } catch (error) {
        console.log(error)
    }
    await prisma.$disconnect();
    return null;
}

export default function Login() {
    const error = useActionData<typeof action>();
    return (
        <Form method="post">
            <div>
                <input name="email" placeholder="Email" />
                {error ? (<span>{error}</span>) : null}
            </div>
            <div>
                <input name="username" placeholder="User Name" />
            </div>
            <button type="submit">Login</button>
        </Form>
    );
}