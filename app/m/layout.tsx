export default function Layout(props: React.PropsWithChildren<{}>) {
  return <div className="flex min-h-screen flex-col">{props.children}</div>;
}
