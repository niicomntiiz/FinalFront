const Paginador = ({page, totalPages, setPage}: {
    page: number, 
    totalPages: number, 
    setPage: (page: number) => void}) => {
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
        <div className="PaginadorContainer" >
            
            {hasPrev && (
                <div className="arrowContainer" onClick={() => setPage(page - 1)}>
                    <p>{"<"}</p>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {pages.map((p, i) => (
                    <h1 key={p} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {i > 0 && pages[i] - pages[i - 1] > 1 && <p> ... </p>}
                        <p onClick={() => setPage(p)} >
                            {p}
                        </p>
                    </h1>
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