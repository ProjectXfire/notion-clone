interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props): JSX.Element {
  return <main className='h-full bg-red-500 text-white'>{children}</main>;
}
export default AuthLayout;
