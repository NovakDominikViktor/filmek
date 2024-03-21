import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function MovieListPage() {
    const [movies, setMovies] = useState([]);
    const [isFetchPending, setIsFetchPending] = useState(false);

    useEffect(() => {
        setIsFetchPending(true);
        fetch("https://localhost:7017/Film")
            .then(res => res.json())
            .then(movies => setMovies(movies))
            .finally(() => setIsFetchPending(false));
    }, []);

    return (
        <div>
            <h1 className="text-center">Filmek</h1>
            {isFetchPending && <p className="text-center">Betöltés...</p>}
            <ul>
                {movies.map(movie => (
                    <div key={movie.id} className='card col-sm-3 d-inline-block m-1 p-2 text-center'>
                        <h5>{movie.nev}</h5>
                        <NavLink key={movie.id} to={"/movie/" + movie.id}>
                            <div className='card-body'>
                                <img
                                    className='img-fluid'
                                    style={{ maxHeight: 200 }}
                                    alt="hiányzik a képed innen!"
                                    src={movie.kepneve ? movie.kepneve : "https://via.placeholder.com/400x800"}
                                />
                            </div>
                        </NavLink>
                        <br />
                        <div>
                            <NavLink key={movie.id + 1} to={"/mod-movie/" + movie.id} className='btn btn-primary'>
                                Módosítás
                            </NavLink>
                            <NavLink key={movie.id + 2} to={"/torol-movie/" + movie.id} className='btn btn-danger ml-2'>
                                Törlés
                            </NavLink>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default MovieListPage;
