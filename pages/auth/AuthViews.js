import { useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import { GoogleOutlined as IconGoogle } from "@ant-design/icons";
import GoogleLogin from "react-google-login";
import { googleClientId as clientId } from "../../helpers/util";
import style from "./Login.module.scss";

export const AuthText = ({ step }) => {
  let title = "Selamat Datang";
  let subHead =
    "Masuk ke akun anda untuk memulai menggunakan uWebb dan buat web anda sendiri.";

  if (step === "onValidating") {
    title = "Verifikasi...";
    subHead = (
      <div>
        <p>
          Kami sedang melakukan verifikasi akun uWebb anda, mohon dapat
          menunggu.
        </p>
        <Spin />
      </div>
    );
  } else if (step === "userNotFound") {
    title = "Ups! Anda belum terdaftar";
    subHead =
      "Alamat email anda belum terdaftar, untuk dapat menggunakan uWebb silakan melakukan registrasi.";
  } else if (step === "register") {
    title = "Buat Akun Sekarang";
    subHead =
      "Buat akun Anda sekarang untuk bergabung dan mulai buat web sesuai Anda";
  } else if (step === "successLogin") {
    title = "Login Sukses";
    subHead = (
      <div>
        <p>Mohon tunggu, kami akan mengarahkan Anda</p>
        <Spin />
      </div>
    );
  }

  return (
    <div className={style.textHead}>
      <div className={style.head}>{title}</div>
      <div className={style.subhead}>{subHead}</div>
    </div>
  );
};

export const AuthGoogleButton = ({
  step,
  onSuccess,
  onFailed,
  loading,
  setLoading,
}) => {
  const condition = ["onValidating", "successLogin"];
  if (condition.indexOf(step) > -1) return "";

  let text = "Masuk";
  const regCondition = ["register", "userNotFound"];
  if (regCondition.indexOf(step) > -1) text = "Daftar dengan Akun Google";

  return (
    <div className={style.ctalogin}>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailed}
        render={({ disabled, onClick }) => (
          <Button
            type="primary"
            loading={disabled || loading}
            disabled={disabled || loading}
            onClick={() => {
              onClick();
              setLoading(true);
            }}
          >
            <IconGoogle />
            <span>{text}</span>
          </Button>
        )}
      />
    </div>
  );
};

export const AuthTextOffer = ({ step }) => {
  const navigate = useNavigate();
  const condition = ["onValidating", "userNotFound", "successLogin"];
  if (condition.indexOf(step) > -1) return "";

  let question = "Belum memiliki akun?";
  let ctaText = "Daftar Gratis Sekarang";
  let ctaClick = () => navigate("/register");

  if (step === "register") {
    question = "Sudah memiliki akun?";
    ctaText = "Login Sekarang";
    ctaClick = () => navigate("/login");
  }

  return (
    <div className={style.registerOffer}>
      {question}{" "}
      <button className={style.link} onClick={ctaClick}>
        {ctaText}
      </button>
    </div>
  );
};
