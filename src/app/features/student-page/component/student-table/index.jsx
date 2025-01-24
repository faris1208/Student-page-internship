"use client";
import React, { useEffect, useState } from "react";
import styles from "../student-table/styles.module.scss";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBhZA1CLzCi3zsI0GV1H-1ZFPbuED_9K40",
  authDomain: "student-internship-project.firebaseapp.com",
  projectId: "student-internship-project",
  storageBucket: "student-internship-project.firebasestorage.app",
  messagingSenderId: "823811819941",
  appId: "1:823811819941:web:2f8edbba49fce08cc5404c",
  measurementId: "G-02FRQNNFG8",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const StudentTable = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Students:", studentsList);
      setStudents(studentsList);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode && selectedStudentId) {
        const studentRef = collection(db, "students");
        await updateDoc(doc(studentRef, selectedStudentId), formData);
        alert("Student updated successfully!");
      } else {
        await addDoc(collection(db, "students"), formData);
        // alert("Student added successfully!");
      }

      setShowModal(false);
      setIsEditMode(false);
      setFormData({
        name: "",
        class: "",
        section: "",
        rollNumber: "",
      });

      fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
      alert("Error saving student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        alert("Student deleted successfully!");
        fetchStudents();
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Error deleting student. Please try again.");
      }
    }
  };

  const handleEditStudent = (student) => {
    setFormData(student);
    setSelectedStudentId(student.id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleViewStudent = (student) => {
    alert(
      `Details of ${student.name}:\nClass: ${student.class}\nSection: ${student.section}\nRoll Number: ${student.rollNumber}`
    );
  };

  return (
    <div className={styles.student_table_container}>
      <h2>Students List</h2>
      <button
        className={styles.add_student_button}
        onClick={() => {
          setShowModal(true);
          setIsEditMode(false);
          setFormData({
            name: "",
            class: "",
            section: "",
            rollNumber: "",
          });
        }}
      >
        Add Student
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id || `${student.name}-${student.rollNumber}`}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <div className={styles.all_button}>
                  <button
                    className={styles.view_button}
                    onClick={() => handleViewStudent(student)}
                  >
                    View
                  </button>
                  <button
                    className={styles.edit_button}
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delete_button}
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h3>{isEditMode ? "Edit Student" : "Add Student"}</h3>
            <form onSubmit={handleAddOrUpdateStudent}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="class"
                placeholder="Class"
                value={formData.class}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="section"
                placeholder="Section"
                value={formData.section}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.submit_button}
              >
                {loading ? "Loading..." : isEditMode ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className={styles.close_button}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
