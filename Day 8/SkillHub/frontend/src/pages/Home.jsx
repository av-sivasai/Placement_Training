import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import API from "../api/courseApi";
import { AuthContext } from "../context/AuthContext";

function Home() {

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCourses();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function fetchCourses() {
    try {
      const response = await API.get("/courses");
      setCourses(response.data);
    } catch (err) {
      setError("Unable to Load Courses");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Hero />
        <h2 style={{ marginTop: "20px" }}>Welcome to SkillHub!</h2>
        <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>
          Please <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>Login</Link> or <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>Register</Link> to view the courses dashboard.
        </p>
      </div>
    );
  }

  if (loading) return <h2>Loading Courses...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <Hero />
      <div style={{ marginBottom: "20px" }}>
        <h2>Welcome back, {user.name}!</h2>
        <p>Here is your courses dashboard.</p>
      </div>

      <input
        className="search"
        type="text"
        placeholder="Search Course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="courses">
        {courses
          .filter((course) =>
            course.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              students={course.students}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
