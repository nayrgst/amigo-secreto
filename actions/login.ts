// "use server";

// import { createClient } from "@/utils/supabase/server";

// export type LoginState = {
//   success: boolean | null;
//   message?: string;
// };

// export async function login(previousState: LoginState, formData: FormData) {
//   const supabase = await createClient();

//   const email = formData.get("email") as string;

//   const { error } = await supabase.auth.signInWithOtp({
//     email,
//     options: {
//       emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/confirm `,
//     },
//   });

//   if (error) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }

//   return {
//     success: true,
//     message: "Verifique seu e-mail para confirmar o login.",
//   };
// }
