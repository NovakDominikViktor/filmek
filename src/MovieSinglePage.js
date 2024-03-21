import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

function MovieSinglePage() {
    const param = useParams();
    const id = param.id;
    const [movie, setMovie] = useState({});
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`https://localhost:7017/Film/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !movie.id ? (<div className='spinner-border'></div>) : (
                <div className='card p-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>{movie.nev}</h5>
                     
                        <NavLink to={"/"}>
                            <img className='img-fluid rounded'
                                style={{ maxHeight: "500px" }}
                                alt="hiányzik a képed innen!"
                                src={movie.kepneve ? "/" + movie.kepneve : "https://via.placeholder.com/400x800"}
                            />
                        </NavLink>
                        <p>Értékelés: {movie.ertekeles}</p>
                        <p>Kiadás: {movie.kiadasEve}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieSinglePage;
