import { FunctionComponent, useEffect, useRef } from "react";
import classes from "./UsersPage.module.scss";
import CreateModal from "../../modals/createModal";
import { useDispatch, useSelector } from "react-redux";
import { displayModal } from "../../redux/modalReduser";
import { addUsers, selectUser, setUsers } from "../../redux/usersReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux";

const UsersPage: FunctionComponent = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tableRef = useRef<HTMLTableSectionElement | null>(null);

  const fetching = () => {
    axios
      .get("https://randomuser.me/api/?results=30&inc=gender,name,email", {
        headers: {
          mode: "no-cors",
        },
      })
      .then((res) => res.data)
      .then((data) => dispatch(addUsers(data.results)));
  };

  useEffect(() => {
    const seed = localStorage.getItem("seed");

    if (!seed) return navigate("/");

    const data = localStorage.getItem("users");
    if (data === null || JSON.parse(data).length === 0) {
      fetching();
    } else {
      dispatch(setUsers(JSON.parse(data)));
    }
  }, []);

  useEffect(() => {
    if (users.length === 0) return;
    const stringified = JSON.stringify(users);
    localStorage.setItem("users", stringified);
  }, [users]);

  const handleScroll = () => {
    if (!tableRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

    const remaining = scrollHeight - scrollTop;
    const check = remaining <= clientHeight;

    if (check) fetching();
  };

  const handleUpdateUser = (num: number) => {
    dispatch(displayModal("update"));
    dispatch(selectUser(num - 1));
  };

  const handleLogout = () => {
    localStorage.removeItem("seed");
    localStorage.removeItem("users");
    navigate("/");
  };

  return (
    <>
      <div className={classes.container}>
        <header className={classes.header}>
          <button
            className={classes.header_addUser}
            onClick={() => dispatch(displayModal("create"))}
          >
            Добавить пользователя
          </button>
          <button className={classes.header_logout} onClick={handleLogout}>
            Выйти
          </button>
        </header>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>№</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Пол</th>
              <th>Почта</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody ref={tableRef} onScroll={handleScroll}>
            {users.map((user, i) => (
              <tr key={`user number ${i++}`}>
                <td>{i + 1}</td>
                <td>{user.name.last}</td>
                <td>{user.name.first}</td>
                <td>{user.gender === "female" ? "Женский" : "Мужской"}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={user.new ? classes.active : ""}
                    disabled={!user.new}
                    onClick={() => handleUpdateUser(i)}
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateModal />
    </>
  );
};

export default UsersPage;
