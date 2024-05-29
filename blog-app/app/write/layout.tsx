export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full  items-center justify-center  w-full  ">
      <div className="flex  text-center justify-center w-full h-full p-5 overflow-auto">
        {children}
      </div>
    </section>
  );
}
