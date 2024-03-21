import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

function MovieModPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [movieData, setMovieData] = useState({});
    const [modnev, setModNev] = useState("");
    const [modkiadaseve, setModKiadasEve] = useState("");
    const [modertekeles, setModErtekeles] = useState("");
    const [modkepneve, setModKepneve] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://localhost:7017/Film/${id}`);
                const movieData = await res.json();
                setMovieData(movieData);
                setModNev(movieData.nev);
                setModKiadasEve(movieData.kiadasEve);
                setModErtekeles(movieData.ertekeles);
                setModKepneve(movieData.kepneve);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const modNev = (e) => {
        setModNev(e.target.value);
    }

    const modKiadasEve = (e) => {
        setModKiadasEve(e.target.value);
    }

    const modErtekeles = (e) => {
        setModErtekeles(e.target.value);
    }

    const modKepneve = (e) => {
        setModKepneve(e.target.value);
    }

    const handleModification = () => {
        console.log("Módosítás előtt:", movieData);
    
        fetch(`https://localhost:7017/Film/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: movieData.id,
                nev: modnev,
                kiadaseve: modkiadaseve,
                ertekeles: modertekeles,
                kepneve: modkepneve,
            }),
        })
        .then((response) => {
            console.log("PUT válasz fejlécek:", response.headers);
            console.log("PUT válasz státusz:", response.status);
    
            return response.text(); 
        })
        .then((data) => {
            console.log("Módosítás után (szöveges válasz):", data);
            navigate("/");
        })
        .catch((error) => {
            console.error("PUT Error:", error);
        });
    }
      return (
          <div className='p-5 content bg-lavender text-center'>
              <h2>Film módosítás</h2>
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      handleModification();
                  }}
              >
                  <div className='form-group row pb-3'>
                      <label htmlFor="nev" className='col-sm-3 col-form-label'> Név: </label>
                      <div>
                          <input type="text" id="nev" name="nev" className="form-control" value={modnev} onChange={modNev} autoComplete="off" />
                      </div>
                  </div>
                  <div className='form-group row pb-3'>
                      <label htmlFor="kiadaseve" className='col-sm-3 col-form-label'> Kiadás éve: </label>
                      <div>
                          <input type="number" id="kiadaseve" name="kiadaseve" className="form-control" value={modkiadaseve} onChange={modKiadasEve} autoComplete="off" />
                      </div>
                  </div>
                  <div className='form-group row pb-3'>
                      <label htmlFor="ertekeles" className='col-sm-3 col-form-label'> Értékelés: </label>
                      <div>
                          <input type="number" id="ertekeles" name="ertekeles" className="form-control" value={modertekeles} onChange={modErtekeles} autoComplete="off" min={0} />
                      </div>
                  </div>
                  <div className='form-group row pb-3'>
                      <label htmlFor="kepneve" className='col-sm-3 col-form-label'> Kép URL: </label>
                      <div>
                          <input type="text" id="kepneve" name="kepneve" className="form-control" value={modkepneve} onChange={modKepneve} autoComplete="off" />
                      </div>
                  </div>
                  <button type="submit" className='btn btn-success'>Küldés</button>
              </form>
          </div>
      );
}

export default MovieModPage