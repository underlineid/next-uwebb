import { Spin } from "antd";
import { useEffect } from "react";
import { logouting } from "../../helpers/util";

export default function Logout() {
  useEffect(() => {
    setTimeout(() => {
      logouting();

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }, 3000);
  }, []);

  return (
    <div className="content-box">
      <div className="in-center">
        <h3>Sedang melakukan logout...</h3>
        <div>
          <Spin size="large" />
        </div>
      </div>
    </div>
  );
}
