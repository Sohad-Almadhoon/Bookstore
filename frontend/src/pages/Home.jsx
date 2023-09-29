import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import { IoAddCircleOutline } from "react-icons/io5";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-end items-center gap-x-4 mt-5">
        <button
          className="bg-blue-500  hover:bg-blue-700  text-white px-12 py-2 rounded-lg"
          onClick={() => setShowType("table")}>
          Table
        </button>
        <button
          className="bg-blue-500  hover:bg-blue-700  text-white px-12 py-2  rounded-lg"
          onClick={() => setShowType("card")}>
          Card
        </button>
      </div>
      <div className="flex justify-between items-center px-3">
        <h1 className="text-3xl my-8 text-blue-700 font-bold">Book List</h1>
        <Link to="/books/create">
          <IoAddCircleOutline className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
