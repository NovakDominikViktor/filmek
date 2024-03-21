import { useNavigate } from 'react-router-dom';

export function MovieCreatePage() {
    const navigate = useNavigate();

    return (
        <div className='p-5 content bg-whitesmoke text-center'>
            <h2>Új film</h2>
            <form
                onSubmit={(e) => {
                    e.persist();
                    e.preventDefault();
                    fetch("https://localhost:7017/Film", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json", 
                      },
                      body: JSON.stringify({
                          nev: e.target.elements.nev.value,
                          kiadasEve: e.target.elements.kiadaseve.value,
                          ertekeles: e.target.elements.ertekeles.value,
                          kepneve: e.target.elements.kepneve.value,
                      }),
                  })
                        .then(() => {
                            navigate("/");
                        })
                        .catch(console.log);
                }}
            >
                <div className='form-group row pb-3'>
                    <label htmlFor="nev" className='col-sm-3 col-form-label'> Név: </label>
                    <div>
                        <input type="text" id="nev" name="nev" className="form-control" autoComplete='név' />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="kiadaseve" className='col-sm-3 col-form-label'> Kiadás éve: </label>
                    <div>
                        <input type="number" id="kiadaseve" name="kiadaseve" className="form-control" autoComplete='kiadás éves' />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="ertekeles" className='col-sm-3 col-form-label'> Értékelés: </label>
                    <div>
                        <input type="number" id="ertekeles" name="ertekeles" className="form-control" autoComplete='értékelés' />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="kepneve" className='col-sm-3 col-form-label'> Kép neve: </label>
                    <div>
                        <input type="text" id="kepneve" name="kepneve" className="form-control" autoComplete='kép neve' />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}

export default MovieCreatePage;
