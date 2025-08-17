interface Props {
  children: React.ReactNode;
  catalog: React.ReactNode;
  detail: React.ReactNode;
}

export default function HomePageLayout({ children, detail, catalog }: Props) {
  return (
    <>
      {catalog}
      {detail}
      {children}
    </>
  );
}
