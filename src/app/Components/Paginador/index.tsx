const Paginador = ({
    page,
    totalPages,
    setPage
}: {
    page: number,
    totalPages: number,
    setPage: (page: number) => void
}) => {
    if (!totalPages || totalPages <= 0) return null;

    const pagesSet = new Set<number>();

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pagesSet.add(i);
    }

    for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
        pagesSet.add(i);
    }

    pagesSet.add(page);

    const pages = Array.from(pagesSet).sort((a, b) => a - b);

    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return (
        <div className="PaginadorContainer" style={{ gap: '20px' }}>
            
            {hasPrev && (
                <div className="arrowContainer" onClick={() => setPage(page - 1)}>
                    <p>{"<"}</p>
                </div>
            )}

            <div>
                {pages.map((p, i) => (
                    <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {i > 0 && pages[i] - pages[i - 1] > 1 && <span> ... </span>}
                        <h1
                            onClick={() => setPage(p)}
                            style={{
                                cursor: "pointer",
                                opacity: p === page ? 1 : 0.5,
                                transition: "opacity 0.2s"
                            }}
                        >
                            {p}
                        </h1>
                    </span>
                ))}
            </div>

            {hasNext && (
                <div className="arrowContainer" onClick={() => setPage(page + 1)}>
                    <p>{">"}</p>
                </div>
            )}
            
        </div>
    );
};

export default Paginador;