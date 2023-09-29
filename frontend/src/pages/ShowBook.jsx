import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from "../components/BackButton";
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
     axios
       .get(`http://localhost:5555/books/${id}`)
       .then((res) => {
         setBook(res.data);
         setLoading(false);
       })
       .catch((err) => {
         console.log(err);
         setLoading(false);
       })
  }, [id])
  
  return (
    <div className="p-4 ">
      <BackButton />
      <h1 className="text-3xl my-4 text-sky-700">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-evenly">
          {" "}
          <div className="flex flex-col border-2 border-gray-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">Create Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">
                Description
              </span>
                <span>{book.description}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-sky-700">
                Last Update Time
              </span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
          <div>
            <img src={book.imgUrl} alt="Book" width={300} height={280} />
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default ShowBook