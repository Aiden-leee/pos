function PageContent({ title, children }) {
  return (
    <>
      <section className="h-full">
        <h2 className="pb-3 font-bold">{title}</h2>
        {children}
      </section>
    </>
  );
}

export default PageContent;
