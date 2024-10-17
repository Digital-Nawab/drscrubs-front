import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fectaddress } from "../Redux/Action/addressAction";
import { useDispatch, useSelector } from "react-redux";
import Addaddress from "../components/Modal/Addaddress";
import { fetchOrderById } from "../Redux/Action/GetOrderByClinetAction";
import OrderProductDetails from "../components/Modal/OrderProductDetails";
import axios from "axios";
import BassURl from "../Api/Api";
import imageURl from "../Api/ImageUrl";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import EditAddress from "../components/Modal/EditAddress";
function ProfileDasboard() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [profilePic, setProfilePic] = useState(null);

  // Start update profile data

  const [updateProfile, setUpdateProfile] = useState({
    client_id: userData?.id,
    first_name: userData?.first_name,
    email: userData?.email,
    mobile: userData?.mobile,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    axios
      .post(`${BassURl}/update-profile`, updateProfile)
      .then((response) => {
        // Handle response
        if (response.data.code === 200) {
          // Update successful
          toast.success("Profile updated successfully!");
          const updatedUserData = {
            ...userData,
            first_name: updateProfile.first_name,
            email: updateProfile.email,
            mobile: updateProfile.mobile,
          };
          setTimeout(() => {
            window.location.href = "/user-dashboard";
          }, 800);
          sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        } else {
          // Handle error
          toast.error("Failed to update profile. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error(
          "An error occurred while updating profile. Please try again later."
        );
      });
  };

  // End update profile data

  const [passwordData, setPasswordData] = useState({
    client_id: userData?.id,
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  //console.log(passwordData);

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("New password and confirm password don't match");
      return;
    }

    try {
      console.log("Sending request with data:", passwordData);
      const response = await axios.post(
        `${BassURl}/update-password`,
        passwordData
      );
      //console.log(response.data.code);
      if (response.data.code === 200) {
        toast.success("Password updated successfully!");

        setPasswordData({
          client_id: userData?.id,
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
        setTimeout(() => {
          window.location.href = "/user-dashboard";
        }, 800);
      } else {
        toast.error("Failed to update password. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(
        "An error occurred while updating password. Please try again later."
      );
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("userData");
    window.location.reload();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fectaddress());
  }, [dispatch]);

  const addressData = useSelector((state) => state.userAddress);

  //const { address, isAddressLoading, error } = addressData;
  const { address, isAddressLoading, error } = addressData;
  //console.log(address);
  const [addAddress, setaddAddress] = useState(false);

  const handleDeleteAddress = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this address?"
      );
      if (!confirmDelete) return;
      toast("Deleting address...", { type: "info" });

      await axios.post(`${BassURl}/delete-address/${id}`);
      dispatch(fectaddress());
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };

  const [editingAddress, setEditingAddress] = useState(null);

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  const handleUpdateAddress = (updatdAddress) => {
    if (updatdAddress) {
      // Update the address in the Redux store or perform any necessary actions
      dispatch({ type: "UPDATE_ADDRESS", payload: updatdAddress });
    }
    setEditingAddress(null); // Close the edit modal
  };

  useEffect(() => {
    if (addAddress) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [addAddress]);

  function add_Address() {
    // console.log("hello");
    setaddAddress(true);
  }

  // get user orderByID User Id
  const Client_id = JSON.parse(localStorage.getItem("userData"));
  //console.log(Client_id);
  const userID = Client_id?.id;
  

  useEffect(() => {
    const data = 1;
    dispatch(fetchOrderById(userID));
  }, [dispatch]);

  const getOrderById = useSelector((state) => state.getorderbyclientbyid);
  const { orderByIdDetails, isOrderByIdDetailsLoading } = getOrderById;

  //console.log(orderByIdDetails)

  // open orderProductDetails
  const [orderDetailsProduct, setOrderDetailsProduct] = useState(false);
  useEffect(() => {
    if (orderDetailsProduct) {
      document.body.classList.add("mobile_menu_open");
    } else {
      document.body.classList.remove("mobile_menu_open");
    }
  }, [orderDetailsProduct]);

  const [orders, setOrders] = useState([]);

  console.log(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BassURl}/user/my-order/${userID}`);
      const data = response.data?.data;
      setOrders(data || []);
      if (data && data.length > 0) {
        data.forEach((order) => {
          fetchOrderItems(order.order_id);
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  console.log(orders);

  const fetchOrderItems = async (order_id) => {
    try {
      const response = await axios.get(
        `${BassURl}/user/order-item/${order_id}`
      );
      const orderItems = response.data?.data;
      console.log("Order Items for order ID", order_id, ":", orderItems);
      // Here you can handle the retrieved order items data, such as storing it in state or displaying it in your UI
      // Storing order items for each order
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.order_id === order_id) {
            return { ...order, orderItems };
          }
          return order;
        });
      });
    } catch (error) {
      console.error(
        "Error fetching order items for order ID",
        order_id,
        ":",
        error
      );
    }
  };

  // // Filter orders based on status
  // const filteredOrders = orders.filter((order) => {
  //   if (filterStatus === "all") {
  //     return true;
  //   }
  //   return order.order_status === filterStatus;
  // });

  // // Filter orders based on search term
  // const searchedOrders = filteredOrders.filter((order) => {
  //   if (searchTerm === "") {
  //     return true;
  //   }
  //   return order.order_id.toLowerCase().includes(searchTerm.toLowerCase());
  // });
  //console.log(orders);

  // console.log(orderbyClient)
  return (
    <>
      <Navbar />
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <section className="breadcrumb__section breadcrumb__about_bg">
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <div className="breadcrumb__content text-center">
                <h1 className="breadcrumb__content--title text-white mb-25">
                  User Dashboard
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="user-profile footer-padding">
        <div className="container">
          <div className="user-profile-section box-shadows">
            <div className="dashboard-heading ">
              <h5 className="dashboard-title">Change Password</h5>
            </div>
            <div className="user-dashboard">
              <div className="row">
                <div className="col-md-3">
                  <div
                    className="nav nav-item nav-pills  me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    {/* nav-buttons */}
                    <button
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      <span>
                        <svg
                          width={17}
                          height={17}
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.21258 4.98254C9.21258 6.17687 9.20926 7.37119 9.21391 8.56552C9.21723 9.41928 9.69987 9.9079 10.5483 9.90989C12.2512 9.91454 13.9547 9.91454 15.6576 9.90989C16.5007 9.9079 16.9966 9.40799 16.9979 8.56751C16.9999 6.16757 16.9999 3.76763 16.9979 1.36835C16.9973 0.508624 16.4961 0.00340804 15.6423 0.00274416C13.9613 0.000752505 12.2804 0.00141639 10.5994 0.00274416C9.69722 0.00340804 9.2159 0.488044 9.21391 1.40022C9.21059 2.59388 9.21258 3.78821 9.21258 4.98254ZM7.78722 12.0522C7.78722 10.8579 7.78921 9.66359 7.78656 8.46926C7.78456 7.57036 7.31122 7.09104 6.42028 7.08971C4.73933 7.08639 3.05837 7.08705 1.37742 7.08971C0.489805 7.09104 0.00251398 7.57965 0.0018501 8.46395C0.000522332 10.8526 0.000522332 13.2413 0.0018501 15.6299C0.00251398 16.4896 0.503747 16.9969 1.35551 16.9982C3.04775 17.0002 4.73933 17.0002 6.43157 16.9982C7.2913 16.9969 7.78257 16.5036 7.78589 15.6359C7.78988 14.4409 7.78722 13.2466 7.78722 12.0522ZM3.89022 5.66236C4.75261 5.66236 5.61499 5.66767 6.47738 5.66103C7.28665 5.65439 7.77925 5.16444 7.78523 4.35782C7.79253 3.34075 7.79253 2.32302 7.78523 1.30595C7.77925 0.505968 7.27337 0.00473581 6.47339 0.00274416C4.75924 -0.00123915 3.04576 -0.000575264 1.33161 0.00274416C0.519016 0.00407193 0.00516952 0.516591 0.00251398 1.32719C-0.00146932 2.32236 -0.000141552 3.31752 0.00251398 4.31268C0.00450564 5.15648 0.49578 5.65638 1.33626 5.66169C2.18736 5.667 3.03846 5.66236 3.89022 5.66236ZM13.1083 11.3372C12.2459 11.3372 11.3835 11.3319 10.5211 11.3386C9.71248 11.3452 9.21988 11.8358 9.21457 12.6431C9.20793 13.6602 9.20727 14.6779 9.21457 15.695C9.22055 16.493 9.72908 16.9955 10.5271 16.9969C12.2412 17.0008 13.9547 17.0002 15.6689 16.9969C16.4801 16.9955 16.994 16.481 16.9973 15.6704C17.0013 14.6752 16.9999 13.6801 16.9973 12.6849C16.9953 11.8418 16.502 11.3425 15.6622 11.3379C14.8111 11.3333 13.9594 11.3372 13.1083 11.3372Z" />
                          <path d="M9.21223 4.98269C9.21223 3.78837 9.21024 2.59404 9.2129 1.39971C9.21489 0.487533 9.69621 0.00289744 10.5984 0.00223355C12.2794 0.000905786 13.9603 0.000241902 15.6413 0.00223355C16.495 0.00356132 16.9963 0.508777 16.9969 1.36784C16.9983 3.76778 16.9989 6.16773 16.9969 8.567C16.9963 9.40748 16.5004 9.90739 15.6566 9.90938C13.9537 9.91402 12.2502 9.91402 10.5473 9.90938C9.69886 9.90672 9.21622 9.41877 9.2129 8.56501C9.20891 7.37135 9.21223 6.17702 9.21223 4.98269Z" />
                          <path d="M7.78832 12.0524C7.78832 13.2467 7.79098 14.441 7.78699 15.6353C7.78434 16.503 7.2924 16.9963 6.43267 16.9976C4.74043 16.9996 3.04885 16.9996 1.35661 16.9976C0.504845 16.9963 0.00361284 16.4891 0.00294895 15.6294C0.00162118 13.2407 0.00162118 10.8521 0.00294895 8.4634C0.00361284 7.57911 0.490904 7.09115 1.37852 7.08916C3.05947 7.08651 4.74043 7.08584 6.42138 7.08916C7.31231 7.09115 7.785 7.56981 7.78766 8.46871C7.79031 9.6637 7.78832 10.858 7.78832 12.0524Z" />
                          <path d="M3.89062 5.6621C3.03952 5.6621 2.18775 5.66609 1.33665 5.66077C0.496177 5.65613 0.00490302 5.15622 0.00224748 4.31243C-0.000408054 3.31726 -0.00107194 2.3221 0.00224748 1.32694C0.0055669 0.516336 0.519413 0.00381733 1.33201 0.00248957C3.04616 -0.000829855 4.75964 -0.000829855 6.47379 0.00248957C7.27311 0.00448122 7.77965 0.50505 7.78563 1.30569C7.79293 2.32276 7.79293 3.3405 7.78563 4.35757C7.77965 5.16485 7.28771 5.6548 6.47777 5.66077C5.61539 5.66741 4.753 5.6621 3.89062 5.6621Z" />
                          <path d="M13.1081 11.3378C13.9592 11.3378 14.811 11.3338 15.6621 11.3391C16.5019 11.3444 16.9952 11.843 16.9972 12.6862C16.9998 13.6813 17.0005 14.6765 16.9972 15.6716C16.9939 16.4822 16.48 16.9968 15.6687 16.9981C13.9546 17.0014 12.2411 17.0014 10.527 16.9981C9.72831 16.9961 9.21977 16.4935 9.21446 15.6962C9.20716 14.6791 9.20716 13.6614 9.21446 12.6443C9.21977 11.837 9.71237 11.3464 10.521 11.3398C11.3834 11.3325 12.2458 11.3378 13.1081 11.3378Z" />
                        </svg>
                      </span>
                      <span className="text">Dashboard</span>
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <span>
                        <svg
                          width={14}
                          height={19}
                          viewBox="0 0 14 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.96898 10.7061H3.78814C1.6967 10.7061 0.00346265 12.4028 0 14.4942V18.3481H13.7606V14.4942C13.7571 12.4028 12.0604 10.7061 9.96898 10.7061Z" />
                          <path d="M6.88098 9.17603C9.41488 9.17603 11.469 7.12191 11.469 4.58802C11.469 2.05412 9.41488 0 6.88098 0C4.34709 0 2.29297 2.05412 2.29297 4.58802C2.29297 7.12191 4.34709 9.17603 6.88098 9.17603Z" />
                        </svg>
                      </span>
                      <span className="text">Personal Info</span>
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-order-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-order"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-order"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <span>
                        <svg
                          width={15}
                          height={18}
                          viewBox="0 0 15 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.9643 15.8454C10.8728 15.8399 10.8054 15.8331 10.7381 15.8331C9.37517 15.8324 8.01229 15.8324 6.60539 15.8324C6.85294 16.5145 6.77799 17.099 6.11648 17.4676C5.68672 17.7076 5.24457 17.6615 4.86018 17.3562C4.36027 16.9594 4.3087 16.4409 4.56175 15.8317C3.82667 15.8317 3.13285 15.8406 2.43903 15.8296C1.53136 15.8152 0.910425 14.8958 1.25974 14.0638C1.34845 13.852 1.51898 13.6581 1.69295 13.502C2.43628 12.8384 3.19199 12.1872 3.95182 11.5429C4.11204 11.4075 4.16499 11.2816 4.11479 11.074C3.36389 7.96037 2.61506 4.8454 1.87999 1.72768C1.82085 1.476 1.71564 1.42512 1.48597 1.432C0.997754 1.44712 0.507472 1.43681 0 1.43681C0 1.06824 0 0.741614 0 0.390921C0.782525 0.390921 1.54786 0.377856 2.31182 0.397798C2.58825 0.405362 2.70308 0.630905 2.76772 0.885329C3.01389 1.86177 3.27725 2.83339 3.5138 3.81189C3.57775 4.07732 3.68846 4.22034 3.96901 4.19971C3.98001 4.19903 3.9917 4.20315 4.00339 4.20315C4.60369 4.21003 4.95026 4.4507 5.25488 5.03863C6.60195 7.64613 10.1907 7.96587 12.0686 5.68981C12.2206 5.50622 12.3512 5.44639 12.585 5.4904C13.0911 5.58529 13.6027 5.64855 14.1136 5.71801C14.333 5.74826 14.4306 5.85416 14.4251 6.08314C14.3839 7.93906 14.3461 9.79498 14.3144 11.6509C14.3089 11.9816 14.0937 11.9665 13.8661 11.9665C11.0819 11.9651 8.29697 11.9693 5.51274 11.9596C5.2425 11.959 5.03897 12.0291 4.8368 12.2072C4.05428 12.8962 3.25525 13.5659 2.47135 14.2536C2.37095 14.3416 2.32488 14.4908 2.25337 14.6111C2.38264 14.6552 2.51192 14.737 2.64119 14.737C6.60608 14.7439 10.571 14.7425 14.5358 14.7425C14.6823 14.7425 14.8288 14.7425 15 14.7425C15 15.1152 15 15.4514 15 15.8193C14.3426 15.8193 13.6935 15.8193 13.0127 15.8193C13.25 16.4568 13.2156 17.0055 12.6442 17.4064C12.2536 17.68 11.7406 17.6814 11.3521 17.4091C10.78 17.011 10.7339 16.4636 10.9643 15.8454Z" />
                          <path d="M8.8449 6.1337C7.15883 6.12476 5.787 4.74744 5.78906 3.06549C5.79113 1.37254 7.18564 -0.00685072 8.88753 2.55979e-05C10.5702 0.00690192 11.9413 1.38835 11.9392 3.07374C11.9372 4.77563 10.555 6.14264 8.8449 6.1337ZM9.94924 1.61802C9.38194 2.22039 8.85178 2.78287 8.31199 3.35636C8.11326 3.12806 7.94342 2.93278 7.76394 2.72786C7.48201 2.96853 7.22553 3.1872 6.95735 3.41618C7.28191 3.80125 7.57484 4.16708 7.8884 4.51502C8.10157 4.75225 8.43232 4.77082 8.65236 4.54458C9.33656 3.83907 10.0042 3.11775 10.6382 2.44593C10.4031 2.16332 10.1858 1.9027 9.94924 1.61802Z" />
                        </svg>
                      </span>
                      <span className="text">Order</span>
                    </button>

                    <button
                      className="nav-link"
                      id="v-pills-address-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-address"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-address"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <span>
                        <svg
                          width={14}
                          height={20}
                          viewBox="0 0 14 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11.864 15.9822C11.4632 12.6506 9.25877 11.1118 7.04363 11.0545C5.70166 11.0223 4.5422 11.5126 3.57598 12.4609C2.60976 13.4057 2.19465 14.5938 1.99067 16.0288C1.37873 15.7461 0.809733 15.5063 0.272945 15.2128C0.147695 15.1449 0.0582333 14.8944 0.0582333 14.7262C0.0439189 13.5631 -0.0849134 12.3822 0.0940158 11.2478C0.365988 9.54079 1.99067 8.23819 3.71555 8.05568C4.60661 7.96264 5.46547 7.9519 6.35296 8.1702C6.88617 8.3026 7.51243 8.19167 8.06711 8.05926C10.2357 7.52963 13.1559 8.64973 13.7571 10.9973C14.0577 12.1675 14.0577 13.3663 13.8751 14.5615C13.8107 14.9981 13.6068 15.3202 13.1737 15.4812C12.7336 15.6387 12.3042 15.8105 11.864 15.9822Z" />
                          <path d="M10.6071 3.72194C10.5928 5.77962 8.96814 7.38999 6.93193 7.36494C4.8814 7.33989 3.24241 5.7009 3.26388 3.69331C3.28535 1.59984 4.90287 -0.0212607 6.94982 0.000210833C9.01824 0.0181038 10.6215 1.64994 10.6071 3.72194Z" />
                          <path d="M10.9467 16.0178C10.9109 18.2795 9.07512 19.9972 6.74188 19.9507C4.58041 19.9077 2.77681 18.0719 2.80902 15.9498C2.8448 13.7454 4.69493 11.9776 6.9387 12.0062C9.17174 12.0384 10.9789 13.8492 10.9467 16.0178ZM6.84208 18.4834C7.27509 18.462 7.76893 18.4262 8.26278 18.419C8.62779 18.4154 8.74947 18.2222 8.74947 17.8966C8.74947 17.1808 8.75305 16.4687 8.74589 15.753C8.74589 15.6599 8.70652 15.5025 8.65642 15.4882C8.32719 15.4059 8.40234 15.1482 8.38087 14.9263C8.36298 14.7367 8.34151 14.547 8.30572 14.3645C8.15542 13.6309 7.64011 13.2122 6.91723 13.2229C6.22299 13.2337 5.64683 13.7418 5.52874 14.4432C5.4679 14.8154 5.65041 15.2735 5.17088 15.5096C5.14941 15.5204 5.14941 15.5919 5.14941 15.6349C5.14941 16.4508 5.1351 17.2667 5.16015 18.0826C5.16372 18.19 5.34981 18.3689 5.4679 18.3868C5.90449 18.4477 6.34108 18.4548 6.84208 18.4834Z" />
                          <path
                            d="M7.78818 15.3706C7.81323 14.8159 7.93491 14.2684 7.41601 13.9069C7.09036 13.6815 6.70745 13.6851 6.40327 13.9499C5.95953 14.3328 6.03826 14.8481 6.08836 15.3706C6.66451 15.3706 7.19414 15.3706 7.78818 15.3706ZM6.76113 17.643C6.8828 17.643 7.00448 17.643 7.11899 17.643C7.15836 17.3209 7.22635 17.0239 7.21561 16.7304C7.21204 16.6088 7.02953 16.4978 6.92933 16.3797C6.83986 16.4835 6.6824 16.5837 6.67883 16.6911C6.67167 16.9988 6.72892 17.3137 6.76113 17.643Z"
                            fill="white"
                          />
                          <path d="M7.78818 15.3706C7.19414 15.3706 6.66451 15.3706 6.08836 15.3706C6.03826 14.8445 5.95953 14.3328 6.40327 13.9499C6.71103 13.6851 7.09394 13.6815 7.41601 13.9069C7.93491 14.2684 7.81323 14.8159 7.78818 15.3706Z" />
                          <path d="M6.76261 17.6421C6.7304 17.3129 6.67314 17.0016 6.6803 16.6902C6.68388 16.5865 6.84134 16.4827 6.9308 16.3789C7.031 16.4934 7.21351 16.6079 7.21709 16.7296C7.22782 17.0231 7.15983 17.3201 7.12046 17.6421C7.00595 17.6421 6.88786 17.6421 6.76261 17.6421Z" />
                        </svg>
                      </span>
                      <span className="text">Address</span>
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-password-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-password"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-password"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <span>
                        <svg
                          width={16}
                          height={19}
                          viewBox="0 0 16 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.9919 6.43707V5.3498C12.9919 2.39616 10.5957 0 7.64208 0C4.68844 0 2.29227 2.39616 2.29227 5.3498V6.43707C0.900288 7.04304 0 8.41771 0 9.93435V14.5224C0.00346265 16.6311 1.71054 18.3417 3.82276 18.3451H11.4683C13.5771 18.3417 15.2876 16.6346 15.2911 14.5224V9.93781C15.2807 8.41771 14.3804 7.0465 12.9919 6.43707ZM8.40386 12.9953C8.40386 13.4178 8.06106 13.7606 7.63861 13.7606C7.21617 13.7606 6.87337 13.4178 6.87337 12.9953V11.4648C6.87337 11.0424 7.21617 10.6996 7.63861 10.6996C8.06106 10.6996 8.40386 11.0424 8.40386 11.4648V12.9953ZM11.4614 6.11505H3.81584V5.3498C3.81584 3.23758 5.52639 1.52703 7.63861 1.52703C9.75083 1.52703 11.4614 3.23758 11.4614 5.3498V6.11505Z" />
                        </svg>
                      </span>
                      <span className="text">Change Password</span>
                    </button>
                    <div
                      className="nav-link"
                      aria-selected="false"
                      tabIndex={-1}
                      role="tab"
                    >
                      <Link onClick={logOut}>
                        <span>
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_113_3043)">
                              <path d="M7.50224 15.7537C7.50224 16.0247 7.50895 16.2465 7.5 16.4683C7.4597 17.5682 6.52164 18.2515 5.4806 17.9155C4.00075 17.4383 2.52761 16.9387 1.05448 16.4392C0.380597 16.2107 0 15.6641 0 14.9405C0 10.4892 0 6.03569 0.00223881 1.58218C0.00223881 0.627852 0.629104 0.00955666 1.59403 0.00731646C4.28731 0.00283606 6.98284 -0.00164434 9.67612 0.000595862C11.0104 0.00283606 11.9798 0.961641 12 2.29904C12.0112 2.99126 12.0067 3.68124 12 4.37347C11.9955 4.90439 11.6933 5.25162 11.2478 5.25162C10.8022 5.25386 10.4955 4.90663 10.491 4.37571C10.4843 3.69693 10.4933 3.0159 10.4888 2.33712C10.4843 1.79276 10.209 1.50153 9.67388 1.49705C8.72463 1.48585 7.77761 1.49481 6.82836 1.49481C6.72313 1.49481 6.61791 1.49481 6.46791 1.49481C6.51492 1.55081 6.53284 1.59114 6.56418 1.60682C7.24254 1.91597 7.51119 2.46481 7.51119 3.1884C7.50672 6.72791 7.50895 10.2674 7.50895 13.8069C7.50895 13.9436 7.50895 14.0802 7.50895 14.2415C8.32164 14.2415 9.09179 14.2662 9.8597 14.2303C10.2649 14.2124 10.4888 13.8898 10.491 13.4396C10.4978 12.5031 10.4955 11.5645 10.4933 10.6259C10.4933 10.2854 10.594 10.0008 10.9119 9.83507C11.3888 9.58865 11.9754 9.89332 11.9888 10.4511C12.0179 11.5511 12.0493 12.6577 11.9664 13.7532C11.8746 14.9494 10.9052 15.7447 9.69403 15.7514C8.97537 15.7559 8.26343 15.7537 7.50224 15.7537Z" />
                              <path d="M13.4942 6.75005C13.4942 6.02423 13.5009 5.33425 13.492 4.64651C13.4875 4.27463 13.5927 3.96997 13.9532 3.81539C14.3136 3.66082 14.6046 3.79523 14.8688 4.06181C15.8002 5.0027 16.7405 5.93462 17.674 6.87326C18.1061 7.30786 18.1129 7.69094 17.6897 8.11882C16.7494 9.06642 15.8024 10.0073 14.8599 10.9549C14.6091 11.2058 14.327 11.3402 13.9755 11.1946C13.6129 11.0445 13.492 10.7533 13.4964 10.3769C13.5032 9.68695 13.4987 8.99473 13.4987 8.24875C13.3576 8.24875 13.2345 8.24875 13.1114 8.24875C12.2808 8.24875 11.4479 8.25099 10.6173 8.24651C10.0711 8.24427 9.75315 7.962 9.75987 7.4938C9.76435 7.03456 10.0912 6.75453 10.6352 6.75229C11.5666 6.75005 12.5024 6.75005 13.4942 6.75005Z" />
                            </g>
                            <defs>
                              <clipPath id="clip0_113_3043">
                                <rect width={18} height={18} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span className="text">&nbsp;&nbsp;Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div
                    className="tab-content nav-content"
                    id="v-pills-tabContent"
                    style={{ flex: "1 0%" }}
                  >
                    <div
                      className="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                      tabIndex={0}
                    >
                      <div className="user-profile">
                        <div className="user-title">
                          <p className="paragraph">
                            Hello, {userData?.first_name}
                          </p>
                          <h5 className="heading">Welcome to your Profile </h5>
                        </div>
                        <div className="profile-section">
                          <div className="row g-5">
                            <div className="col-lg-4 col-sm-6">
                              <div className="product-wrapper">
                                <div className="wrapper-img">
                                  <span>
                                    <svg
                                      width={62}
                                      height={62}
                                      viewBox="0 0 62 62"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect width={62} height={62} rx={4} />
                                      <path d="M45.4473 20.0309C45.482 20.3788 45.5 20.7314 45.5 21.0883C45.5 26.919 40.7564 31.6625 34.9258 31.6625C29.0951 31.6625 24.3516 26.919 24.3516 21.0883C24.3516 20.7314 24.3695 20.3788 24.4042 20.0309H21.9805L21.0554 12.6289H13.7773V14.7438H19.1884L21.5676 33.7774H47.1868L48.8039 20.0309H45.4473Z" />
                                      <path d="M22.0967 38.0074H19.0648C17.3157 38.0074 15.8926 39.4305 15.8926 41.1797C15.8926 42.9289 17.3157 44.352 19.0648 44.352H19.2467C19.1293 44.6829 19.0648 45.0386 19.0648 45.4094C19.0648 47.1586 20.4879 48.5816 22.2371 48.5816C24.4247 48.5816 25.9571 46.4091 25.2274 44.352H35.1081C34.377 46.413 35.9157 48.5816 38.0985 48.5816C39.8476 48.5816 41.2707 47.1586 41.2707 45.4094C41.2707 45.0386 41.2061 44.6829 41.0888 44.352H43.3856V42.2371H19.0648C18.4818 42.2371 18.0074 41.7628 18.0074 41.1797C18.0074 40.5966 18.4818 40.1223 19.0648 40.1223H46.4407L46.9384 35.8926H21.8323L22.0967 38.0074Z" />
                                      <path d="M34.9262 29.5477C39.5907 29.5477 43.3856 25.7528 43.3856 21.0883C43.3856 16.4238 39.5907 12.6289 34.9262 12.6289C30.2616 12.6289 26.4668 16.4238 26.4668 21.0883C26.4668 25.7528 30.2617 29.5477 34.9262 29.5477ZM33.8688 17.916H35.9836V20.6503L37.7886 22.4554L36.2932 23.9508L33.8687 21.5262V17.916H33.8688Z" />
                                    </svg>
                                  </span>
                                </div>
                                <div className="wrapper-content">
                                  <p className="paragraph">New Orders</p>
                                  <h3 className="heading">
                                    {orders
                                      ? orders.filter(
                                          (order) =>
                                            order.order_status === "new"
                                        ).length
                                      : 0}
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                              <div className="product-wrapper">
                                <div className="wrapper-img">
                                  <span>
                                    <svg
                                      width={62}
                                      height={62}
                                      viewBox="0 0 62 62"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        width={62}
                                        height={62}
                                        rx={4}
                                        fill="white"
                                      />
                                      <path
                                        d="M45.2253 29.8816H44.4827L43.6701 26.3651C43.376 25.1043 42.2552 24.2217 40.9662 24.2217H36.8474V20.8453C36.8474 19.038 35.3764 17.5811 33.5831 17.5811H18.1724C16.4631 17.5811 15.0762 18.968 15.0762 20.6772V37.0967C15.0762 38.8058 16.4631 40.1928 18.1724 40.1928H19.2931C19.8955 42.1962 21.7448 43.6533 23.9304 43.6533C26.1159 43.6533 27.9792 42.1962 28.5816 40.1928C28.8455 40.1928 35.3459 40.1928 35.1942 40.1928C35.7966 42.1962 37.6459 43.6533 39.8315 43.6533C42.031 43.6533 43.8803 42.1962 44.4827 40.1928H45.2253C46.7663 40.1928 47.9992 38.9599 47.9992 37.4189V32.6555C47.9992 31.1145 46.7663 29.8816 45.2253 29.8816ZM23.9304 40.8513C22.7897 40.8513 21.8849 39.8969 21.8849 38.7918C21.8849 37.657 22.7956 36.7324 23.9304 36.7324C25.0652 36.7324 25.9898 37.657 25.9898 38.7918C25.9898 39.9151 25.0692 40.8513 23.9304 40.8513ZM28.9739 25.0622L24.799 28.3125C24.2023 28.7767 23.3035 28.6903 22.8236 28.0604L21.2125 25.9449C20.7361 25.3284 20.8622 24.4458 21.4787 23.9835C22.0811 23.5072 22.9637 23.6332 23.4401 24.2496L24.1966 25.2303L27.2507 22.8487C27.8531 22.3864 28.7357 22.4845 29.2121 23.1009C29.6884 23.7173 29.5763 24.586 28.9739 25.0622ZM39.8315 40.8513C38.6906 40.8513 37.7861 39.8969 37.7861 38.7918C37.7861 37.657 38.7107 36.7324 39.8315 36.7324C40.9662 36.7324 41.8909 37.657 41.8909 38.7918C41.8909 39.9166 40.9683 40.8513 39.8315 40.8513ZM37.618 27.0236H40.2798C40.6021 27.0236 40.8962 27.2337 41.0083 27.542L41.8629 30.0497C42.031 30.5541 41.6667 31.0724 41.1344 31.0724H37.618C37.1976 31.0724 36.8474 30.7222 36.8474 30.3019V27.7942C36.8474 27.3739 37.1976 27.0236 37.618 27.0236Z"
                                        fill="#FFBB38"
                                      />
                                    </svg>
                                  </span>
                                </div>
                                <div className="wrapper-content">
                                  <p className="paragraph">Delivered Orders</p>
                                  <h3 className="heading">
                                    {orders
                                      ? orders.filter(
                                          (order) =>
                                            order.order_status === "deliver"
                                        ).length
                                      : 0}
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                              <div className="product-wrapper">
                                <div className="wrapper-img">
                                  <span>
                                    <svg
                                      width={62}
                                      height={62}
                                      viewBox="0 0 62 62"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        width={62}
                                        height={62}
                                        rx={4}
                                        fill="white"
                                      />
                                      <path
                                        d="M26.7975 34.4331C23.7162 36.0289 22.9563 36.8019 21.6486 39.6816C20.7665 38.8387 19.9011 38.0123 19.0095 37.1599C19.5288 36.3146 20.0327 35.4942 20.5353 34.6726C20.8803 34.1071 20.4607 33.0579 19.8228 32.899C18.8862 32.6666 17.9484 32.4426 17 32.2114C17 30.4034 17 28.6274 17 26.7827C17.9212 26.561 18.8542 26.3405 19.7849 26.1117C20.4678 25.9433 20.8922 24.9048 20.527 24.306C20.0339 23.4987 19.5371 22.6925 19.0605 21.916C20.3551 20.6201 21.6225 19.354 22.9243 18.0534C23.7067 18.5335 24.5283 19.0398 25.3535 19.5425C25.887 19.8673 26.9433 19.4452 27.0927 18.8442C27.3262 17.9064 27.5491 16.965 27.7839 16C29.5883 16 31.3785 16 33.2197 16C33.4366 16.907 33.6548 17.8234 33.8777 18.7386C34.0555 19.4678 35.0763 19.8969 35.7082 19.5093C36.5144 19.0149 37.3182 18.5205 38.0829 18.051C39.3763 19.3445 40.6318 20.6 41.943 21.9124C41.4783 22.6723 40.9756 23.4904 40.4753 24.3108C40.1114 24.9071 40.5405 25.9398 41.2258 26.1081C42.1434 26.3334 43.0646 26.5503 44 26.7756C44 28.5954 44 30.3892 44 32.2197C43.1298 32.426 42.2667 32.6287 41.4048 32.8338C40.4658 33.0579 40.0651 34.0122 40.5654 34.8267C41.029 35.5819 41.4914 36.3383 41.9727 37.122C41.1487 38.004 40.3473 38.8612 39.4901 39.7776C38.5393 37.1741 36.8297 35.4243 34.3163 34.4592C37.5565 31.5332 36.8558 27.4668 34.659 25.411C32.2973 23.1999 28.5995 23.2616 26.3138 25.5639C24.1537 27.7406 23.7186 31.6885 26.7975 34.4331Z"
                                        fill="#FFBB38"
                                      />
                                      <path
                                        d="M38.0695 46.3142C33.0415 46.3142 28.0847 46.3142 23.0389 46.3142C23.0389 45.9763 23.0342 45.6491 23.0401 45.3219C23.0626 44.0391 22.9796 42.7421 23.1361 41.4747C23.5357 38.2571 26.1261 35.9239 29.3722 35.8208C30.5886 35.7817 31.8417 35.7757 33.0249 36.0164C35.8643 36.595 37.8916 39.0254 38.0552 41.9359C38.1359 43.3704 38.0695 44.8133 38.0695 46.3142Z"
                                        fill="#FFBB38"
                                      />
                                      <path
                                        d="M30.5375 33.9233C28.2244 33.9091 26.3501 32.011 26.3832 29.7193C26.4176 27.4122 28.3169 25.5568 30.6157 25.584C32.8849 25.6101 34.7486 27.5011 34.7403 29.7691C34.7332 32.075 32.8481 33.9375 30.5375 33.9233Z"
                                        fill="#FFBB38"
                                      />
                                    </svg>
                                  </span>
                                </div>
                                <div className="wrapper-content">
                                  <p className="paragraph">Cancel Orders</p>
                                  <h3 className="heading">
                                    {orders
                                      ? orders.filter(
                                          (order) =>
                                            order.order_status === "cancel"
                                        ).length
                                      : 0}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                      tabIndex={0}
                    >
                      <div className="seller-application-section">
                        <div className="row ">
                          <div className="col-lg-7">
                            <div className=" account-section">
                              <form onSubmit={handleUpdateProfile}>
                                <div className="review-form">
                                  <div className=" account-inner-form">
                                    <div className="review-form-name">
                                      <input
                                        type="hidden"
                                        id="client_id"
                                        name="first_name"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={updateProfile.client_id}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className=" account-inner-form">
                                    <div className="review-form-name">
                                      <label
                                        htmlFor="firname"
                                        className="form-label"
                                      >
                                        Full Name*
                                      </label>
                                      <input
                                        type="text"
                                        id="firname"
                                        name="first_name"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={updateProfile.first_name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className=" account-inner-form">
                                    <div className="review-form-name">
                                      <label
                                        htmlFor="gmail"
                                        className="form-label"
                                      >
                                        Email*
                                      </label>
                                      <input
                                        type="email"
                                        id="gmail"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email Address"
                                        value={updateProfile?.email}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="review-form-name">
                                      <label
                                        htmlFor="telephone"
                                        className="form-label"
                                      >
                                        Phone*
                                      </label>
                                      <input
                                        type="tel"
                                        id="telephone"
                                        name="mobile"
                                        className="form-control"
                                        placeholder="Contact Number"
                                        value={updateProfile?.mobile}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="submit-btn">
                                    <button
                                      type="submit"
                                      className="shop-btn update-btn"
                                    >
                                      Update Profile
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* <div className="col-lg-5">
                              <form onChange={handleProfilePic} encType="multipart/form-data">
                                <div className="img-upload-section">
                                  <div className="logo-wrapper">
                                    <h5 className="comment-title">Update Logo</h5>
                                    <p className="paragraph">Size 300x300. Max 500KB.</p>
                                    <div className="logo-upload">
                                      {profilePic ? (
                                          <img src={URL.createObjectURL(profilePic)} alt="upload" className="upload-img" id="upload-img" />
                                        ) : (
                                          <img
                                            src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/upload.webp"
                                            alt="upload"
                                            className="upload-img"
                                            id="upload-img"
                                          />
                                        )}
                                      <div className="upload-input">
                                        <label htmlFor="input-file">
                                          <span>
                                          <svg
                                            width={32}
                                            height={32}
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                              fill="white"
                                            />
                                            <path
                                              d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                              fill="white"
                                            />
                                          </svg>
                                          </span>
                                        </label>
                                        <input
                                          type="file"
                                          name="profile_pic"
                                          //accept="image/jpeg, image/jpg, image/png, image/webp"
                                          id="input-file"
                                          value={userData?.profile_pic}
                                          onChange={handleFileChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div> */}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-order"
                      role="tabpanel"
                      aria-labelledby="v-pills-order-tab"
                      tabIndex={0}
                    >
                      {orders && orders.length > 0 ? (
                        orders.map((order, index) => {
                          console.log(order);
                          return (
                            <div
                              key={index}
                              className="cart-section border mb-4"
                            >
                              <div className="row border-bottom p-3 m-1 mt-0 bg-light">
                                <div className="row">
                                  <div className="col-md-3">
                                    <h5>Order Placed</h5>
                                    <h5>
                                      {new Date(
                                        order?.date_time
                                      ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </h5>
                                  </div>
                                  <div className="col-md-2">
                                    <h5>Total</h5>
                                    <h6>
                                      {" "}
                                      {order?.currency === "INR"
                                        ? "₹"
                                        : "$"}{" "}
                                      {order?.paid_amount}
                                    </h6>
                                  </div>
                                  <div className="col-md-2">
                                    <h6>Ship To</h6>
                                    <h6>
                                      <a
                                        href=""
                                        style={{ color: "rgb(10 43 231)" }}
                                      >
                                        {" "}
                                        {order?.first_name}{" "}
                                      </a>
                                    </h6>
                                  </div>
                                  <div className="col-md-5">
                                    <h6 style={{ float: "right" }}>
                                      ORDER : {order?.order_id}{" "}
                                      <span className="badge text-captilize text-center pe-2 py-1  bg-success">
                                        {order.order_status}
                                      </span>
                                    </h6>
                                    <br />
                                    <h6 style={{ float: "right" }}>
                                      <span>
                                        {" "}
                                        <a
                                          href={`order-details/${order?.order_id}`}
                                          style={{ color: "rgb(10 43 231)" }}
                                        >
                                          View order details
                                        </a>
                                      </span>
                                      <span>
                                        {" "}
                                        <a
                                          href={`/invoice/${order?.order_id}`}
                                          style={{ color: "rgb(10 43 231)" }}
                                        >
                                          &nbsp;&nbsp; Invoice
                                        </a>
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              {order.orderItems &&
                                order.orderItems.length > 0 && (
                                  <div>
                                    <div className="row p-3">
                                      {order.orderItems.map((item, idx) => {
                                        console.log(item);
                                        if (item.size != null) {
                                          //  const embroidery = JSON.parse(data.embroidery);
                                          if (
                                            item?.size.length > 10 ||
                                            item?.size === "null"
                                          ) {
                                            var customeSize = JSON.parse(
                                              item.size
                                            );
                                            console.log(customeSize);
                                          }
                                        }
                                        return (
                                          <div className="col-md-6 mb-4">
                                            <div className="d-flex order-item">
                                              <div className="flex-md-shrink-0">
                                                <img
                                                  src={`${imageURl}/${item.product_image}`}
                                                  width="80px"
                                                />
                                              </div>
                                              <div className="flex-md-grow-1 p-3 pt-0">
                                                <p
                                                  style={{
                                                    marginBottom: "0px",
                                                  }}
                                                >
                                                  {item.product_name}{" "}
                                                </p>
                                                <p
                                                  style={{
                                                    marginBottom: "0px",
                                                  }}
                                                >
                                                  {item.qty}{" "}
                                                  <span
                                                    style={{ float: "right" }}
                                                  >
                                                    {item?.item_currency ===
                                                    "INR"
                                                      ? "₹"
                                                      : "$"}{" "}
                                                    {item.price}
                                                  </span>
                                                </p>
                                                {customeSize ? (
                                                  Object.entries(
                                                    customeSize
                                                  ).map(
                                                    ([key, value], index) => {
                                                      console.log(
                                                        key,
                                                        value,
                                                        index
                                                      )
                                                      return (
                                                        <span
                                                          key={index}
                                                          className="badge text-dark border bg-light"
                                                          style={{
                                                            fontSize: "10px",
                                                            lineHeight: "15px",
                                                          }}
                                                        >
                                                          {key}: {value}
                                                        </span>
                                                      );
                                                    }
                                                  )
                                                ) : (
                                                  <span className="item-size badge text-dark border bg-light p-1">
                                                    {item?.size}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                            </div>
                          );
                        })
                      ) : (
                        <div>No orders available</div>
                      )}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-address"
                      role="tabpanel"
                      aria-labelledby="v-pills-address-tab"
                      tabIndex={0}
                    >
                      <div className="profile-section address-section addresses ">
                        <div className="row gy-md-0 g-5">
                          <div className="title title-flex">
                            <div>
                              <h3>My Address Book</h3>
                            </div>
                            <button
                              className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#add-address"
                              onClick={add_Address}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-plus me-2"
                              >
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                              </svg>{" "}
                              Add New Address
                            </button>
                          </div>

                          {isAddressLoading ? (
                            <>
                              <div className="loader1">
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                              </div>
                            </>
                          ) : (
                            <>
                              {address &&
                                address?.map((data, index) => {
                                  console.log(data);
                                  return (
                                    <>
                                      <div className="col-md-4">
                                        <div className="seller-info shadow">
                                          <div className="address-box bg-block">
                                            <div className="top d-flex-justify-center justify-content-between mb-3">
                                              <h5 className="m-0">
                                                {data?.temp_name}
                                              </h5>
                                              <span className="product-labels start-auto end-0">
                                                <span className="lbl pr-label1">
                                                  {data?.type}
                                                </span>
                                              </span>
                                            </div>
                                            <div className="middle">
                                              <div className="address mb-2 text-muted">
                                                <address className="m-0">
                                                  {data?.locality} <br />{" "}
                                                  {data?.address}
                                                  {data?.city} {data?.state}
                                                  <br />
                                                  {data?.zip} {data?.country}{" "}
                                                  <br />
                                                  Mobile: {data?.temp_mobile}
                                                </address>
                                              </div>
                                            </div>
                                            <div className="bottom d-flex-justify-center justify-content-between">
                                              <a
                                                type="button"
                                                className="btn-edit"
                                                onClick={() =>
                                                  handleEditAddress(data)
                                                }
                                              >
                                                <i className="fa fa-edit"></i>
                                              </a>
                                              <a
                                                type="button"
                                                className="btn-trash"
                                                onClick={() =>
                                                  handleDeleteAddress(data.id)
                                                }
                                              >
                                                <i
                                                  className="fa fa-trash"
                                                  aria-hidden="true"
                                                ></i>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}

                              {/* Render the EditAddressForm component if an address is being edited */}
                              {editingAddress && (
                                <EditAddress
                                  address={editingAddress}
                                  onUpdate={handleUpdateAddress}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-password"
                      role="tabpanel"
                      aria-labelledby="v-pills-password-tab"
                      tabIndex={0}
                    >
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="form-section">
                            <form onSubmit={handleUpdatePassword}>
                              <div className="currentpass form-item">
                                <label
                                  htmlFor="currentpass"
                                  className="form-label"
                                >
                                  Current Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="old_password"
                                  id="currentpass"
                                  value={passwordData.old_password}
                                  onChange={handlePassword}
                                  placeholder="Old Password"
                                  required
                                />
                              </div>
                              <div className="password form-item">
                                <label htmlFor="pass" className="form-label">
                                  New Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="pass"
                                  name="new_password"
                                  placeholder="New password"
                                  value={passwordData.new_password}
                                  onChange={handlePassword}
                                  required
                                />
                              </div>
                              <div className="re-password form-item">
                                <label htmlFor="repass" className="form-label">
                                  Confirm Password*
                                </label>
                                <input
                                  type="password"
                                  name="confirm_password"
                                  className="form-control"
                                  id="repass"
                                  value={passwordData.confirm_password}
                                  placeholder="Confirm Password*"
                                  onChange={handlePassword}
                                  required
                                />
                              </div>
                              <div className="form-btn">
                                <button type="submit" className="shop-btn">
                                  Update Password
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="reset-img text-end">
                            <img
                              src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/reset.webp"
                              alt="reset"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* nav-content */}
            </div>
          </div>
        </div>
      </section>

      {addAddress ? (
        <Suspense
          fallback={
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Addaddress hide={setaddAddress} />
        </Suspense>
      ) : null}

      <Footer />
      {orderDetailsProduct ? (
        <OrderProductDetails
          hide={setOrderDetailsProduct}
          data={orderbyClient}
        />
      ) : null}
    </>
  );
}

export default ProfileDasboard;
