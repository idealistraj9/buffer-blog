export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full  items-center justify-center w-full ">
      <div className="flex  text-center justify-center overflow-auto w-full scrollbar-thin	
       scrollbar-thumb-rounded-full scrollbar-corner-rounded-full scrollbar-track-rounded-full scrollbar-thumb-background scrollbar-track-primary ">
        {children}
      </div>
    </section>
  );
}

