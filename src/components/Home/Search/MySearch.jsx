import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { fetchResult, resetSearch } from "../../../store/FetchSearchData";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Search.module.css";
import ResultDropdown from "./ResultDropdown";
import useDebounce from "../../../hooks/useDebounce";
import { BiUpsideDown } from "react-icons/bi";
import { getNetworkDetails } from "../../../util/tokenSupportedNetworks";
import NetworkSupported from "./NetworkSupported";

const notify = (type, message) =>
  toast[type](message, {
    toastId: message,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const MySearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);

  const { t, i18n } = useTranslation(["common"]);
  const debouncedValue = useDebounce(query, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = i18n.dir();

  const search = useSelector(state => state.Search);
  const searchResults = useSelector(state => state.Search?.data?.payload?.result);
  const searchResultsStatus = useSelector(state => state.Search?.status);
  const searchCode = useSelector(state => state.Search?.searchCode);

  //Send new request to the server after 500ms form last character user has entered
  useEffect(() => {
    if (debouncedValue.length > 0) {
      dispatch(fetchResult(debouncedValue));
    }
  }, [dispatch, debouncedValue]);

  //Enable search button only if user typed contract address
  useEffect(() => {
    if (debouncedValue.startsWith("0x") && debouncedValue.length === 42) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [searchCode, debouncedValue]);

  //Update local state that carry search results
  useEffect(() => {
    if (searchResults && query.length > 0 && searchCode !== 404) {
      setSuggestions(searchResults);
    } else {
      setSuggestions([]);
    }
  }, [searchResults, searchCode, query]);

  //Update error flag to be only show when server return error
  useEffect(() => {
    setError(null);
    if (searchCode === 404 && debouncedValue.startsWith("0x")) {
      notify("success", "This contract address is not registered yet start scan");
    } else if (searchCode >= 400) {
      setError(search?.data?.payload?.responseMessage);
    } else {
      setError(null);
    }
  }, [searchCode, debouncedValue]);

  const handleSearch = event => {
    const { value } = event.target;
    const userQuery = value;
    const alphaNumericOnly = /^[A-Za-z0-9\s]+$/;
    setSuggestions([]);

    //First check if user typed anything and remove white spaces
    if (userQuery.trim().length > 0) {
      //Second check if user typed character that only alphabetic or numeric
      if (alphaNumericOnly.test(userQuery)) {
        setQuery(prevState => {
          if (prevState !== query) {
            setError(null);
          }
          return userQuery;
        });
      } else {
        notify("error", "Contract address or token name must be written correctly");
      }
    } else {
      setError(null);
      setIsDisabled(true);
      setQuery("");
    }
  };

  const searchContractAddress = () => {
    if (!isDisabled) {
      dispatch(resetSearch());
      navigate(`/token/${query}`);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <span className={styles.searchNote}>
        <FaCircle className={`${styles.dot} ${direction === "rtl" ? styles.dot_rtl : styles.dot_ltr}`} />
        {t("common:enter_token")}
      </span>

      <div className={styles.searchSection}>
        <input type="text" className={styles.searchInput} onChange={handleSearch} value={query === null ? "" : query} />
        <button
          onClick={searchContractAddress}
          className={`${styles.searchBtn} ${direction === "rtl" ? styles.searchBtn_rtl : styles.searchBtn_ltr}`}
          disabled={isDisabled}
        >
          {searchResultsStatus === "loading" ? "loading..." : t("common:Scan")}
        </button>
        {searchCode === 200 && (
          <div className={suggestions.length !== 0 ? styles.searchBlock : null}>
            {suggestions.length !== 0 &&
              suggestions.map((result, index) => (
                <ResultDropdown
                  key={index}
                  contractAddress={result.contractAddress}
                  logo={result.contractInfo.logo}
                  name={result.contractInfo.name}
                  symbol={result.contractInfo.symbol}
                  contractScan={result.contractScan}
                  isScam={result.isNotListed}
                  network={getNetworkDetails(result.network)}
                />
              ))}
          </div>
        )}
        {searchResultsStatus === "success" && error && (
          <div className={`${styles.searchBlock} ${styles.notFoundData}`}>
            <BiUpsideDown size={18} />
            {error}
          </div>
        )}
      </div>

      <NetworkSupported />
      {/* className= {(searchResults.status === "failed")? styles.searchNotFound:""} */}
    </>
  );
};

export default MySearch;
