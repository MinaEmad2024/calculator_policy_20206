'use server'

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import crypto from 'crypto'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });





const IssuerFormSchema = z.object({
    
    name: z.string(),
    email: z.string(),

})


export async function createIssuer(formData: FormData) {

    const { name, email } = IssuerFormSchema.parse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
        }
    );

    await sql`
    INSERT INTO issuers ( name, email)
    VALUES (${name}, ${email})`;

      revalidatePath('/dashboard');
      redirect('/dashboard');

}

export async function updateIssuer(id:string,formData: FormData) {

    const { name, email } = IssuerFormSchema.parse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
        }
    );

    await sql`
    UPDATE issuers 
    SET name=${name}, email=${email}
    WHERE id = ${id}`;

      revalidatePath('/dashboard');
      redirect('/dashboard');

}

export async function deleteIssuer(id: string) {
  await sql`DELETE FROM Issuers WHERE id = ${id}`;
  revalidatePath('/dashboard');
}

const policyFormSchema = z.object({

    issuer_id:z.string(),
    name:z.string(),
    code:z.string(),
})


export async function  createPolicy(formData: FormData) {

    const {issuer_id ,name, code } = policyFormSchema.parse(
        {
            issuer_id:formData.get('issuer_id'),
            name: formData.get('name'),
            code: formData.get('code'),
        }
    );

    await sql`
    INSERT INTO Policies (issuer_id, name, code)
    VALUES(${issuer_id},${name},${code})`;

      revalidatePath(`/dashboard/${issuer_id}/edit_issuer`);
      redirect(`/dashboard/${issuer_id}/edit_issuer`);

}



export async function updatePolicy(id:string,formData: FormData) {

    const {issuer_id ,name, code } = policyFormSchema.parse(
        {
            issuer_id:formData.get('issuer_id'),
            name: formData.get('name'),
            code: formData.get('code'),
        }
    );

    await sql`
    UPDATE Policies 
    SET issuer_id=${issuer_id}, name=${name}, code=${code}
    WHERE id = ${id}`;

      revalidatePath(`/dashboard/${issuer_id}/edit_issuer`);
      redirect(`/dashboard/${issuer_id}/edit_issuer`);

}


export async function deletePolicy(id: string) {
  await sql`DELETE FROM Policies WHERE id = ${id}`;
  revalidatePath('/dashboard');
}

const policyDetailFormSchema = z.object({
    policy_id: z.string().optional(),
    name: z.string(),
    deductable: z.string(),
    coins: z.string(),
    max: z.string(),
    min: z.string(),
    coins2: z.string(),
    coins3: z.string(),
})


export async function  createPolicyDetail(policyId: string, formData: FormData) {

    const {policy_id ,name, deductable, coins, max, min, coins2, coins3} = policyDetailFormSchema.parse(
        {
            policy_id:policyId,//formData.get('policy_id'),
            name: formData.get('name'),
            deductable: formData.get('deductable'),
            coins: formData.get('coins'),
            max: formData.get('max'),
            min: formData.get('min'),
            coins2: formData.get('coins2'),
            coins3: formData.get('coins3'),
        }
    );

    // 🛠️ 2. FIX: Generate a brand new, random unique ID string
    const newId = crypto.randomUUID(); 

    // 🛠️ 2. BUG FIX: Guarantee policy_id is a valid string for your SQL client. 
    // Fall back to policyId if Zod unboxed it as optional.
    const safePolicyId = policy_id || policyId;


    await sql`
    INSERT INTO PolicyDetails (id,policy_id, name, deductables, coins, max, min, coins2, coins3)
    VALUES(${newId},${safePolicyId},${name},${deductable}, ${coins}, ${max}, ${min}, ${coins2}, ${coins3})`;

      revalidatePath(`/dashboard/policy/${safePolicyId}/edit_policy`);
      redirect(`/dashboard/policy/${safePolicyId}/edit_policy`);

}


export async function  updatePolicyDetail(id: string, formData: FormData) {

    const {policy_id, name, deductable, coins, max, min, coins2, coins3} = policyDetailFormSchema.parse(
        {
            policy_id:formData.get('policy_id'),
            name: formData.get('name'),
            deductable: formData.get('deductable'),
            coins: formData.get('coins'),
            max: formData.get('max'),
            min: formData.get('min'),
            coins2: formData.get('coins2'),
            coins3: formData.get('coins3'),
        }
    );

    

    await sql`
    UPDATE PolicyDetails 
    SET  name=${name}, deductables=${deductable}, coins=${coins}, max=${max}, min=${min}, coins2=${coins2}, coins3=${coins3}
    WHERE id=${id}`;

      revalidatePath(`/dashboard/policy/${policy_id}/edit_policy`);
      redirect(`/dashboard/policy/${policy_id}/edit_policy`);
}



export async function deletePolicyDetail(id: string) {
  await sql`DELETE FROM PolicyDetails WHERE id = ${id}`;
  revalidatePath('/dashboard');
}



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // 1. Extract only the literal credentials fields needed for verification
    const email = formData.get('email');
    const password = formData.get('password');
    
    // 2. Fetch the dynamic redirect destination safely, defaulting to your dashboard
    const redirectTo = (formData.get('redirectTo') as string) || '/dashboard';

    // 3. Pass clean, explicitly structured properties into the credentials provider
    await signIn('credentials', {
      email,
      password,
      redirectTo, 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }
