import { FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./loginModal.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

type Inputs = {
  seed: string;
};

const alphaRegExp = /^[a-zA-Z]+$/;

const LoginModal: FunctionComponent = () => {
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    seed: yup.string().matches(alphaRegExp).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const seed = JSON.stringify(data.seed);
    localStorage.setItem("seed", seed);
    navigate("/users");
  };

  return (
    <div className={classes.container}>
      <form className={classes.login} onSubmit={handleSubmit(onSubmit)}>
        <h3>Добро пожаловать</h3>
        <label>
          <span>Seed</span>
          <input
            type="text"
            {...register("seed")}
            className={errors.seed ? classes.error : ""}
          />
        </label>

        {errors.seed && (
          <div className={classes.errorMsg}>*Поле заполнено не корректно</div>
        )}
        <button>Войти</button>
      </form>
    </div>
  );
};

export default LoginModal;
