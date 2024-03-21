import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDeletePage() {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    const [movie, setMovie] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get(`https://localhost:7017/Film/${id}`)
            .then(response => {
                console.log("Movie data:", response.data);
                setMovie(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    }, [id]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !movie.id ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Film törlése</h2>
                    <div className='card p-3'>
                        <div className='card-body'>
                            <h5 className='card-title'>{movie.nev}</h5>
                            <p>Értékelés: {movie.ertekeles}</p>
                            <p>Kiadás éve: {movie.kiadasEve}</p>
                            <img className='img-fluid rounded'
                                style={{ maxHeight: "500px" }}
                                alt="hiányzik a képed innen!"
                                src={movie.kepneve ? "/" + movie.kepneve : "https://via.placeholder.com/400x800"}
                            />
                            
                        </div>
                        <form onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                await axios.delete(`https://localhost:7017/Film/${id}`);
                                navigate("/");
                            } catch (error) {
                                console.log(error);
                            }
                        }}>
                            <div>
                                <NavLink to={"/"}>
                                    <button className="bi bi-backspace btn btn-warning rounded">Mégsem</button>
                                </NavLink>
                                <button className="bi bi-trash3 btn btn-danger rounded">Törlés</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDeletePage;
