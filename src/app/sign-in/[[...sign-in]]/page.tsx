import { SignIn } from '@clerk/nextjs'

export default async function SignInPage({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await params;
  return (
    <div className="flex justify-center items-center p-3">
      <SignIn />
    </div>
  )
}