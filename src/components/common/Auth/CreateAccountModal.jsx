import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./CreateAccount.module.css";
import Logo from "../../../assets/logo.png";
import { Button, Checkbox, ConfigProvider, Input } from "antd";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as CreateAccountUserIcon } from "../../../assets/images/createAccountUserIcon.svg";
import { useTranslation } from "react-i18next";

const CreateAccount = ({ showModal, handleClose }) => {
  const { i18n } = useTranslation();
  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
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
          <img src={Logo} width={51.06} height={50.76} alt="Deve" />
          <h2 className={styles.modalTitle}>Create Account</h2>
          <div className={styles.uploadProfileImageContainer}>
            <CreateAccountUserIcon />
            <span>Add Profile Picture</span>
          </div>

          <form className={`${styles.createAccountForm}`}>
            <Input className={`${styles.createAccountFormInput}`} type="text" placeholder="User Name" />
            <Row>
              <Col md={6}>
                <Input className={`${styles.createAccountFormInput}`} type="text" placeholder="First Name" />
              </Col>
              <Col md={6}>
                <Input className={`${styles.createAccountFormInput}`} type="text" placeholder="Last Name" />
              </Col>
            </Row>
            <Input className={`${styles.createAccountFormInput}`} type="email" placeholder="Email" />
            <Input className={`${styles.createAccountFormInput}`} type="password" placeholder="Password" />
            <Input className={`${styles.createAccountFormInput}`} type="password" placeholder="Confirm Password" />
            <Checkbox className={`${styles.createAccountCheckBox}`} onChange={onChange}>
              By enter your information you agree on Develocity's{" "}
              <Link className={`${styles.createAccountLink}`} to="home">
                Terms & Conditions
              </Link>
            </Checkbox>
          </form>
        </div>
        <Button
          className={`${styles.createAccountButton} ${
            i18n.dir() === "rtl" ? styles.createAccountButton_rtl : styles.createAccountButton_ltr
          }`}
        >
          Create Account
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAccount;
