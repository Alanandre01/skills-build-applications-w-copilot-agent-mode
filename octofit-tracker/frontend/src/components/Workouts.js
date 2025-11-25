import React, { useEffect, useMemo, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchData = () => {
    setLoading(true);
    setError('');
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
      })
      .catch(err => {
        console.error("Erreur lors du fetch des entraînements:", err);
        setError("Impossible de charger les entraînements.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const filtered = useMemo(() => {
    if (!query) return workouts;
    const q = query.toLowerCase();
    return workouts.filter(w => JSON.stringify(w).toLowerCase().includes(q));
  }, [workouts, query]);

  const getVal = (obj, keys, fallback = '') => {
    for (const k of keys) if (obj && obj[k] != null) return obj[k];
    return fallback;
  };

  if (loading) return <div className="text-center py-5">Chargement des entraînements...</div>;

  return (
    <div className="container px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Entraînements</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => setQuery('')}>Effacer</button>
          <button className="btn btn-primary" onClick={fetchData}>Rafraîchir</button>
        </div>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <form className="row g-2" onSubmit={e => e.preventDefault()}>
            <div className="col-sm-8 col-md-10">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher un entraînement..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="col-sm-4 col-md-2 d-grid">
              <button type="button" className="btn btn-outline-primary" onClick={() => setQuery(query)}>
                Rechercher
              </button>
            </div>
          </form>
          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width:'80px'}}>#</th>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Durée</th>
                  <th style={{width:'120px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((w, idx) => (
                  <tr key={w.id || idx}>
                    <td>{getVal(w, ['id', 'pk'], idx + 1)}</td>
                    <td>{getVal(w, ['name', 'title'], '—')}</td>
                    <td>{getVal(w, ['type', 'category'], '—')}</td>
                    <td>{getVal(w, ['duration', 'time'], '—')}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setSelected(w)}>Voir</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">Aucun entraînement trouvé.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails de l'entraînement</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                <pre className="mb-0 bg-light p-3 rounded" style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(selected, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelected(null)}>Fermer</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelected(null)}></div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
