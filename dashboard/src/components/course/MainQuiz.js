import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./../../AuthContext";
export default function MainQuiz() {
  const [quiz, setQuiz] = useState("");
  const [classname, setClassname] = useState("");
  const [course_name, setCourse_name] = useState("");
  const authContext = useContext(AuthContext);
  const token = authContext.auth;
  const inst = 0;
  const data = { classname, quiz, course_name, inst };

  const addbook = (e) => {
    e.preventDefault();
    if (course_name == "" || classname == "" || quiz == "")
      alert("تأكد من ملأ جميع الحقول");
    else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/quiz_course/add_exam",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          alert("تم إضافة اختبار الكتاب بنجاح");
          setClassname("");
          setCourse_name("");
          setQuiz("");
        })
        .catch((err) => {
          alert("حدث خطأ أثناء إضافة اختبار الكتاب أعد المحاولة");
        });
    }
  };
  const deletetype = (e) => {
    if (course_name == "" || classname == "" || quiz == "")
      alert("تأكد من ملأ جميع البيانات");
    else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/quiz_course/delete_exam",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          alert("تم الحذف بنجاح");
          setClassname("");
          setCourse_name("");
          setQuiz("");
        })
        .catch((err) => {
          alert("حدث خطأ أعد المحاولة");
        });
    }
  };
  return (
    <form>
      <h2 className="text-right">أضف اختبار لكتاب</h2>

      <div className="form-row">
        <div className="form-group col-md-4">
          <input
            type="text"
            className="form-control text-right"
            id="quiz"
            placeholder="أدخل اسم الاختبار"
            value={quiz}
            onChange={(event) => setQuiz(event.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="text"
            className="form-control text-right"
            id="classname"
            placeholder="أدخل الصف"
            value={classname}
            onChange={(event) => setClassname(event.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="text"
            className="form-control text-right"
            name="course_name"
            placeholder="أدخل اسم الكتاب"
            value={course_name}
            onChange={(event) => setCourse_name(event.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn" onClick={addbook}>
        <i className="fa fa-plus text-warning" aria-hidden="true"></i>
      </button>
      <button type="submit" className="btn" onClick={deletetype}>
        <i class="fas fa-trash-alt text-danger" aria-hidden="true"></i>
      </button>
    </form>
  );
}
