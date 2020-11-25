import axios from 'axios';
import { URLS } from '../consts';

const MovieListItem = props => {
    const handleLike = async e => {
        try {
            const res = await axios.post(`${URLS.LikeMovie}/${e.target.id}`);
            console.log(res.status);
            props.updateLikes(props.i);
        } catch (err) {
            // Not logged in error
            if (err.response?.status === 400) {
                console.log(`user already liked movie`);
            }
            if (err.response?.status === 401) {
                console.log(`not logged in error`);
                props.setAlerts({ mustLogInAlert: true });

                setTimeout(
                    () => props.setAlerts({ mustLogInAlert: false }),
                    5000
                );
            }
        }
    };

    return (
        <tr>
            <td className='centered-container'>
                <div className='text-white box-purple centered-container'>
                    {props.item.movieName}
                </div>
            </td>
            <td>
                <div
                    className='d-flex flex-row-reverse flex-wrap justify-content-center align-items-center like-rating-container
'
                >
                    <div className='d-flex flex-column like-rating-width like-rating-marpad'>
                        <div className='text-center like-rating-width like-rating-font'>
                            {props.item.likesCount} people likes{' '}
                            {props.item.movieName}
                        </div>

                        <div className='like-rating-width text-center'>
                            <button
                                className='btn btn-primary badge badge-primary my-3'
                                id={props.item._id}
                                onClick={handleLike}
                            >
                                <i
                                    id={props.item._id}
                                    className='material-icons small'
                                >
                                    thumb_up
                                </i>
                            </button>
                        </div>
                    </div>
                    <div className='like-rating-width like-rating-marpad text-center like-rating-font'>
                        Our Rating: {props.item.movieRating}
                    </div>
                </div>
            </td>
            <td>
                <div className='centered-container'>
                    <a
                        className='btn-green centered-container text-white  my-auto'
                        href={props.item.movieUrl}
                    >
                        Visit IMDB Page
                    </a>
                </div>
            </td>
        </tr>
    );
};

export default MovieListItem;
