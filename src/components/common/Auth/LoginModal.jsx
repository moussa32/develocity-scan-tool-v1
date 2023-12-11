import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./LoginModal.module.css";
import { Button } from "antd";
import Logo from "../../../assets/logo.png";
import { useTranslation } from "react-i18next";

const LoginModal = ({ showModal, handleClose, changeModalView }) => {
  const { i18n } = useTranslation();

  return (
    <Modal
      dialogClassName={styles.customDialog}
      contentClassName={styles.modalContent}
      show={showModal}
      onHide={handleClose}
      className="p-0"
      centered
    >
      <button className={styles.closeButton} onClick={() => handleClose()}>
        Close <AiOutlineClose size={10} />
      </button>
      <Modal.Body className="p-0">
        <div className={styles.modalContentContainer}>
          <img className={styles.modalLogo} src={Logo} alt="Login form" />
          <span className={styles.modalSubTitle}>Welcome!</span>
          <h2 className={styles.modalTitle}>Login</h2>
          <form className={styles.loginForm}>
            <input className={`${styles.loginFormInput}`} type="email" placeholder="Email" />
            <input className={`${styles.loginFormInput}`} type="password" placeholder="Password" />
            <Button
              className={`${styles.formTextButton} ${
                i18n.dir() === "rtl" ? styles.forgotPassword_rtl : styles.forgotPassword_ltr
              }`}
              type="link"
            >
              Forget Password
            </Button>
          </form>
          <div className={styles.modalFooter}>
            <Button
              className={styles.formTextButton}
              onClick={() => changeModalView({ type: "createAccount", isShow: true })}
              type="link"
            >
              Don't have an account? Sign Up
            </Button>
            <Button className={styles.loginButton}>Login</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
