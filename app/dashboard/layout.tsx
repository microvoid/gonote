import { Nav } from "../ui-home/nav";

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen">
      <Nav />
      {props.children}
    </div>
  );
}
