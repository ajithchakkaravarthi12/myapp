function Pagination({ total, records, update }) {
    const n = Math.ceil(total / records);
    const pages = Array.from({ length: n }, (_, i) => i + 1);

    return (
        <div>
            <ul className="pagination">
                {pages.map((p) => (
                    <li className="page-item" key={p}>
                        <button className="page-link" onClick={() => update(p)}>
                            {p}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;
