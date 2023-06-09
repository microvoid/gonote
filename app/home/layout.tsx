export default function HomeLayout(props: React.PropsWithChildren<{}>) {
  return <div className="flex min-h-screen flex-col">{props.children}</div>;
}
