function PageContent({ title, children, className }) {
  let styles = `h-full ${className}`;

  return (
    <>
      <section className={styles}>
        <h2 className="pb-3 font-bold">{title}</h2>
        {children}
      </section>
    </>
  );
}

export default PageContent;
