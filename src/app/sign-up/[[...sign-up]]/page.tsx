import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await params;
  return (
    <div className="flex justify-center items-center p-3">
      <SignUp />
    </div>
  )
}