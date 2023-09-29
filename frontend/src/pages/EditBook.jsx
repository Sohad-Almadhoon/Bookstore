import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setBookImage(res.data.imgUrl);
         enqueueSnackbar("Book Updated successfully", { variant: "success" });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error while updating book',{variant:'error'})
        setLoading(false);
      });
  }, [enqueueSnackbar, id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      imgUrl: bookImage,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border border-sky-800 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-sky-500 px-4 py-2 w-full mt-3"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-sky-500 px-4 py-2 w-full mt-3"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-sky-500 px-4 py-2 w-full mt-3"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Book Image Url</label>
          <input
            type="text"
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
            className="border border-sky-500 px-4 py-2 w-full mt-3"
          />
        </div>
        <button
          className="p-2 bg-sky-800 m-8 text-white"
          onClick={handleEditBook}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
