import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7017/Film/${id}`);
                setMovieData(response.data);
                setModNev(response.data.nev);
                setModKiadasEve(response.data.kiadasEve);
                setModErtekeles(response.data.ertekeles);
                setModKepneve(response.data.kepneve);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const handleModification = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://localhost:7017/Film/${id}`, {
                id: movieData.id,
                nev: modnev,
                kiadaseve: modkiadaseve,
                ertekeles: modertekeles,
                kepneve: modkepneve,
            });
            console.log("PUT válasz fejlécek:", response.headers);
            console.log("PUT válasz státusz:", response.status);
            console.log("Módosítás után (szöveges válasz):", response.data);
            navigate("/");
        } catch (error) {
            console.error("PUT Error:", error);
        }
    };

    return (
        <div className='p-5 content bg-lavender text-center'>
            <h2>Film módosítás</h2>
            <form onSubmit={handleModification}>
                <div className='form-group row pb-3'>
                    <label htmlFor="nev" className='col-sm-3 col-form-label'> Név: </label>
                    <div>
                        <input type="text" id="nev" name="nev" className="form-control" value={modnev} onChange={(e) => setModNev(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="kiadaseve" className='col-sm-3 col-form-label'> Kiadás éve: </label>
                    <div>
                        <input type="number" id="kiadaseve" name="kiadaseve" className="form-control" value={modkiadaseve} onChange={(e) => setModKiadasEve(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="ertekeles" className='col-sm-3 col-form-label'> Értékelés: </label>
                    <div>
                        <input type="number" id="ertekeles" name="ertekeles" className="form-control" value={modertekeles} onChange={(e) => setModErtekeles(e.target.value)} autoComplete="off" min={0} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="kepneve" className='col-sm-3 col-form-label'> Kép URL: </label>
                    <div>
                        <input type="text" id="kepneve" name="kepneve" className="form-control" value={modkepneve} onChange={(e) => setModKepneve(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}

export default MovieModPage;
