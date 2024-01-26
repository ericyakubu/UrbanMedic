import { FunctionComponent, useRef, useState, MouseEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./createModal.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { hideModals } from "../../redux/modalReduser";
import { addNewUser, deleteUser, updateUser } from "../../redux/usersReducer";
import { RootState } from "../../redux";
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};
const alphaRegExp = /^[а-яА-Я]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const CreateModal: FunctionComponent = () => {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [filled, setFilled] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();

  const modalType = useSelector((state: RootState) => state.modal.modalType);

  const handleHideModal = (e: MouseEvent<HTMLElement>): void => {
    const isCloseButton =
      e.target === closeRef.current ||
      closeRef.current?.contains(e.target as Node);

    if (isCloseButton || e.target === containerRef.current) {
      dispatch(hideModals());
    }
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().matches(alphaRegExp).required(),
    lastName: yup.string().matches(alphaRegExp).required(),
    email: yup.string().email().matches(emailRegex).required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  watch((value) => {
    value.email && value.firstName && value.lastName
      ? setFilled(true)
      : setFilled(false);
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      email: data.email,
      gender: sex,
      new: true,
      name: {
        first: data.firstName,
        last: data.lastName,
      },
    };
    if (modalType === "create") {
      dispatch(addNewUser(user));
      dispatch(hideModals());
    }
    if (modalType === "update") {
      dispatch(updateUser(user));
      dispatch(hideModals());
    }
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser());
    dispatch(hideModals());
  };

  return (
    <div
      className={classes.container}
      ref={containerRef}
      onClick={handleHideModal}
    >
      <form className={classes.create} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.create_head}>
          {modalType === "create" ? (
            <h3>Новый пользователь</h3>
          ) : (
            <h3>Обновите пользователя</h3>
          )}
          <button
            type="button"
            className={classes.create_head__close}
            ref={closeRef}
            onClick={handleHideModal}
          >
            <img src="closeBtnSvg.svg" alt="close buton" />
          </button>
        </div>

        <div className={classes.create_sex}>
          <button
            type="button"
            onClick={() => setSex("male")}
            className={sex === "male" ? classes.selected : ""}
          >
            Мужчина
          </button>
          <button
            type="button"
            onClick={() => setSex("female")}
            className={sex === "female" ? classes.selected : ""}
          >
            Женщина
          </button>
        </div>

        <label>
          <span>Фамилия*</span>
          <input
            type="text"
            maxLength={25}
            {...register("lastName")}
            className={errors.lastName ? classes.error : ""}
          />
        </label>

        <label>
          <span>Имя*</span>
          <input
            type="text"
            maxLength={25}
            {...register("firstName")}
            className={errors.firstName ? classes.error : ""}
          />
        </label>

        <label>
          <span>Email*</span>
          <input
            type="email"
            {...register("email")}
            className={errors.email ? classes.error : ""}
          />
        </label>
        {(errors.email || errors.firstName || errors.lastName) && (
          <div className={classes.errorMsg}>
            *Некоторые поля заполнены не корректно
          </div>
        )}

        <div className={classes.create_footer}>
          {modalType === "update" ? (
            <button
              type="button"
              className={classes.create_footer__delete}
              onClick={handleDeleteUser}
            >
              <img src="deleteBtnSvg.svg" alt="close buton" />
            </button>
          ) : null}
          <button
            disabled={!filled}
            type="submit"
            className={`${classes.create_footer__submit} 
             ${filled ? classes.filled : ""}
            `}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
