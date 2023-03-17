import { PrismaClient, User} from "@prisma/client";
export async function findUser(emailIn:string):Promise<User> {
    const prisma = new PrismaClient();
    const emptyUser:User = {id:0,email:"",username:""}
    const user = await prisma.user.findUnique({
        where :{
            email: emailIn
        }
    });
    await prisma.$disconnect();
    if(user != null){
        return user;
    }
    else{
        return emptyUser;
    }
    
  }