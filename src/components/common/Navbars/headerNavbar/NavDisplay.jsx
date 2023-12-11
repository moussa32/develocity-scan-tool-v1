import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./nav.module.css";
import logo from "../../../../assets/images/logo.png";
import { memo } from "react";
import { useState } from "react";
import LoginModal from "../../Auth/LoginModal";
import CreateAccountModal from "../../Auth/CreateAccountModal";
import CreateAccountUserIcon from "../../../../assets/images/createAccountUserIcon.svg";

const NavDisplay = () => {
  const { t, i18n } = useTranslation(["common"]);
  const [authModal, setAuthModal] = useState({ type: "", isShow: false });
  const { pathname } = useLocation();
  const direction = i18n.dir();

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.customNavbar}`}>
        <div
          className={`container align-items-center ${styles.navbarHeaderContainer} ${
            direction === "rtl" ?? styles.navbar_rtl
          }`}
        >
          <Link className={`${styles.navbarBrand} navbar-brand`} to="/">
            <img width="45" src={logo} alt="logo" />
          </Link>
          <button
            className={`navbar-toggler ${styles.navToggler} `}
            style={{ boxShadow: "none", zIndex: "10" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse text-center ${styles["navbar-collapse"]}`}
            id="navbarSupportedContent"
          >
            <ul className={`navbar-nav mb-2 d-inline-block w-auto mb-lg-0 ${styles.listGroup}`}>
              <div className="d-lg-flex w-100 justify-content-between align-items-center">
                <div className={`d-lg-flex ${styles.navItemsContainer}`}>
                  <li className={`${styles.headerNavLink} nav-item`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? `${styles.linkitem} ${styles.activeLinkitem}` : `${styles.linkitem}`
                      }
                      aria-current="page"
                      to="/"
                    >
                      {t("common:home")}
                    </NavLink>
                  </li>
                  <li className={`${styles.headerNavLink} nav-item`}>
                    <a
                      href="https://develocity.group/"
                      className={`${styles.linkitem}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("common:about")}
                    </a>
                  </li>
                  <li className={`${styles.headerNavLink} nav-item`}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive || pathname.includes("token")
                          ? `${styles.linkitem} ${styles.activeLinkitem}`
                          : `${styles.linkitem}`
                      }
                      to="/tokens"
                    >
                      {t("common:tokens")}
                    </NavLink>
                  </li>
                  {/* <li className={`${styles.headerNavLink} nav-item`}>
                    <a className={`${styles.linkitem}`}>{t("Academy")}</a>
                  </li> */}
                  <li className={`${styles.headerNavLink} nav-item`}>
                    <a
                      href="https://develocity.finance/contact-us"
                      target="_blank"
                      rel="dofollow"
                      className={`${styles.linkitem}`}
                    >
                      {t("common:contact")}
                    </a>
                  </li>
                </div>
              </div>
            </ul>
            <div
              className={`${styles.headerActionButtonContainer} ${
                direction === "rtl" ? styles.headerActionButtonContainer_rtl : styles.headerActionButtonContainer_ltr
              }`}
            >
              <button
                className={`${styles.headerActionButton}`}
                onClick={() => setAuthModal({ type: "login", isShow: true })}
              >
                {t("log_in")}
              </button>
              <button
                className={`${styles.headerActionButton} ${styles.activeHeaderActionButton}`}
                onClick={() => setAuthModal({ type: "createAccount", isShow: true })}
              >
                {t("create_account")}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <img src={CreateAccountUserIcon} />
      {authModal.type === "login" && (
        <LoginModal
          showModal={authModal.isShow}
          changeModalView={setAuthModal}
          handleClose={() => setAuthModal({ type: "login", isShow: false })}
        />
      )}
      {authModal.type === "createAccount" && (
        <CreateAccountModal
          showModal={authModal.isShow}
          changeModalView={setAuthModal}
          handleClose={() => setAuthModal({ type: "login", isShow: false })}
        />
      )}
      <div className=" container" style={{ marginTop: "-10px" }}>
        <hr className="dropdown-divider container" />
      </div>
    </>
  );
};

export default memo(NavDisplay);
