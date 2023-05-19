import classes from "./Login.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    idInstance: "",
    apiTokenInstance: "",
  });

  const [error, setError] = useState(false);

  async function sendForm(e) {
    e.preventDefault();

    if (!form.apiTokenInstance || !form.idInstance) {
      setError(true);
      return;
    }

    console.log(form);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.form_wrapper}>
        <h1>Авторизация</h1>

        <form>
          <Input
            onChange={(e) => {
              setForm((p) => ({ ...p, idInstance: e.target.value }));
            }}
            value={form.idInstance}
            required
            placeholder="idInstance"
          />
          <Input
            value={form.apiTokenInstance}
            required
            onChange={(e) => {
              setForm((p) => ({ ...p, apiTokenInstance: e.target.value }));
            }}
            placeholder="apiTokenInstance"
          />

          {error && <h3>Некорректные данные</h3>}
          <Button onClick={sendForm}>Отправить</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
