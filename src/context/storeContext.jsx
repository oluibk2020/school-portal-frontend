import { createContext, useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import { toast } from "react-toastify";

export const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState("ngn");
    const [paymentLink, setPaymentLink] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [walletBalance, setWalletBalance] = useState("");
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [course, setCourse] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  //get token from localstorage
  const token = localStorage.getItem("token");

  const { isExpired } = useJwt(token);

  function loginChecker() {
    try {
      if (token === null) {
        setIsAuth(false);
        return;
      }
      if (isExpired) {
        // Handle invalid or expired token
        localStorage.removeItem("token");
        setIsAuth(false);
        return;
      }

      if (!isExpired) {
        setIsAuth(true);
        //get all courses when user is authenticated
        getAllCourses();

        //get all services when user is authenticated
        getAllServices();

        //get user profile
        fetchProfile();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //run this function on app load
  useEffect(() => {
    setIsLoading(true);
    loginChecker(); //check if user has a signed token on the device
    setIsLoading(false);
  }, [isExpired]);

  //get all books
  async function getAllCourses() {
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: "GET", //PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //your token
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        return setCourses(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //fetch all services
  async function getAllServices() {
    try {
      const response = await fetch(`${API_URL}/services`, {
        method: "GET", //PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //your token
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        return setServices(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  async function getAllEnrolledCourses() {
    try {
      const response = await fetch(`${API_URL}/courses/enrolled`, {
        method: "GET", //PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //your token
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        return setEnrolledCourses(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //get one books
  async function getOneCourse(id) {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: "GET", //PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //your token
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setCourse(data.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getOneEnrolledCourse(courseId) {
    try {
      const response = await fetch(`${API_URL}/courses/enrolled/${courseId}`, {
        method: "GET", //PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //your token
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setCourse(data.data);
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }



  async function fetchBalance(currency) {
    try {
      const response = await fetch(`${API_URL}/wallet/${currency}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setWalletBalance(data.wallet.balance);
    } catch (error) {
      toast.error(
        "Network error: We are unable to get this wallet balance at the moment. Reload page"
      );
      console.log(error);
    }
  }

  async function fetchProfile() {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUserProfile(data.data);
      return;
    } catch (error) {
      toast.error(
        "Network error: We are unable to get your profile at the moment. Reload page"
      );
      console.log(error);
    }
  }

  async function fetchTransactions(currency) {
    try {
      const response = await fetch(`${API_URL}/transaction/all/${currency}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTransactions(data.data);
    } catch (error) {
      toast.error(
        "Network error: We are unable to get your transactions at the moment. Reload page"
      );
      console.log(error);
    }
  }

  //get a Transaction
  async function fetchOneTransaction(transRef) {
    try {
      const response = await fetch(`${API_URL}/transaction/${transRef}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTransaction(data.transaction);
    } catch (error) {
      toast.error(
        "Network error: We are unable to get this transaction at the moment. Reload page"
      );
    }
  }


  async function createPaymentInvoice(transactionId) {
    try {
      const response = await fetch(`${API_URL}/wallet/pay/transaction/${transactionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPaymentLink(data.response.data.link);
    } catch (error) {
      console.log(error);
    }
  }

  //exporting states
  const contextObj = {
    isAuth,
    setIsAuth,
    isLoading,
    setIsLoading,
    userEmail,
    setUserEmail,
    courses,
    course,
    getOneCourse,
    enrolledCourses,
    getAllEnrolledCourses,
    getOneEnrolledCourse,
    wallet,
    setWallet,
    transactions,
    transaction,
    fetchOneTransaction,
    fetchBalance,
    walletBalance,
    userProfile,
    fetchProfile,
    fetchTransactions,
    paymentLink,
    setPaymentLink,
    createPaymentInvoice,
    services
  };

  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};
