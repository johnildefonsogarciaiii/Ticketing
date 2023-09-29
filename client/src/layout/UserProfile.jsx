import { Paper, Container, Stack } from "@mui/material";
import ContentHeader from "../components/text/contentHeader";
import TextDisabled from "../components/inputFields/textDisabled";
import TextAbled from "../components/inputFields/textAbled";
import SelectText from "../components/inputFields/selectText";
import SaveButton from "../components/saveButton";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as UserAPI from "../api/userAPI";
import Loader from "../components/loader";
import { setUser } from "../store/userSlice";
import { isLoading, isSuccess, isVisible } from "../store/displaySlice";
import SuccessAlert from "../components/alert/successAlert";

export default function UserProfile() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.display.loader);
  const success = useSelector((state) => state.display.success);
  const user = useSelector((state) => state.user.user);

  // getting token from cookies
  const getToken = document.cookie.split("=");
  const token = getToken[1];
  
  const [userEmployeeID, setUserEmployeeID] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userDesignation, setUserDesignation] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");


  // console.log(user)
  //Fetching Current User
  useEffect(() => {
    const fetchingUser = async () => {
      const res = await UserAPI.getCurrentUser({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(res.data.data.data));
      setUserEmployeeID(res.data.data.data.employeeID);
      setUserDepartment(res.data.data.data.department);
      setUserDesignation(res.data.data.data.designation);
      setUserName(res.data.data.data.name);
      setUserEmail(res.data.data.data.email);
      setUserContact(res.data.data.data.contact);
      setInputData({department: res.data.data.data.department, designation: res.data.data.data.designation, contact: res.data.data.data.contact })
    };
    fetchingUser();
  }, []);

  //initializing Input Data for Updating User Info
  const [inputData, setInputData] = useState({
    department:  user ? user.department : userDepartment,
    designation:  user ? user.designation : userDesignation,
    contact:   user ? user.contact: userContact,
  });
  const inputValue = (e) => {
    const { name, value } = e.target;

    // Update the state object with the new value
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "department") {
      setUserDepartment(value);
      setUserDesignation(userDesignation);
      setUserContact(userContact);
    }

    if (name === "designation") {
      setUserDepartment(userDepartment);
      setUserDesignation(value);
      setUserContact(userContact);
    }

    if (name === "contact") {
      setUserDepartment(userDepartment);
      setUserDesignation(userDesignation);
      setUserContact(value);
    }
  };

  // handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isLoading(true));

    try {
      const updatingUserInfo = async () => {
        const res = await UserAPI.updateCurrentUser(inputData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(res.data.data.user));
      };
      updatingUserInfo();

      dispatch(isSuccess(true));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };

  return (
    <>
      {loader ? <Loader /> : null}
      {success ? <SuccessAlert text="Updated user info" /> : null}
      <Container
        sx={{
          position: "absolute",
          top: {
            xs: 550,
            sm: 500,
            md: 320,
            lg: 370,
          },
          left: {
            xs: "65%",
            sm: 450,
            md: "55%",
            lg: 660,
          },
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: {
              xs: 300,
              sm: 600,
              md: 900,
              lg: 1200,
            },
            minHeight: 500,
          },
        }}
      >
        <Paper elevation={3}>
          <Container
            sx={{
              maxWidth: {
                xs: 250,
                sm: 550,
                md: 850,
                lg: 1050,
              },
              margin: 4,
            }}
          >
            {/* HEADER */}
            <ContentHeader text={"User Profile"} />
            <form onSubmit={handleSubmit}>
              {/* User's Employee Details */}
              <Stack
                direction={{
                  xs: "column",
                  sm: "colurowmn",
                  md: "row",
                }}
                sx={{ my: 4 }}
                spacing={{
                  xs: 2,
                  sm: 4,
                }}
              >
                <TextDisabled value={userEmployeeID} label={"Employee ID"} />
                <SelectText
                  value={userDepartment}
                  inputValue={inputValue}
                  name={"department"}
                  Header={"Department"}
                  Text1={userDepartment ? userDepartment : ""}
                  Text2={"Accounting"}
                  Text3={"Operations"}
                  Text4={"HR"}
                  Text5={"IT"}
                />
                <SelectText
                  value={userDesignation}
                  inputValue={inputValue}
                  name={"designation"}
                  Header={"Designation"}
                  Text1={userDesignation ? userDesignation : ""}
                  Text2={"Junior"}
                  Text3={"Associate"}
                  Text4={"Specialist"}
                  Text5={"Lead"}
                />
              </Stack>
              <Stack
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                }}
                sx={{
                  my: {
                    xs: 4,
                    md: 4,
                    lg: 8,
                  },
                }}
                spacing={{
                  xs: 2,
                  sm: 4,
                }}
              >
                <TextDisabled value={userName} label={"Name"} />
                <TextDisabled value={userEmail} label={"Email"} />
                <TextAbled
                sx={{
                  width: {
                    xs: 200,
                    sm: 400,
                    md: 230,
                    lg: 280,
                  }}
                }
                  value={userContact}
                  label={"Contact Number"}
                  name={"contact"}
                  inputValue={inputValue}
                />
              </Stack>
              <Stack
                direction={{
                  xs: "column",
                  sm: "colurowmn",
                  md: "row",
                }}
                sx={{
                  my: {
                    xs: 4,
                    md: 4,
                    lg: 8,
                  },
                }}
                spacing={{
                  xs: 2,
                  sm: 4,
                }}
              >
                <TextDisabled value={"0000000000"} label={"SSS"} />
                <TextDisabled value={"0000000000"} label={"Pag-ibig"} />
                <TextDisabled value={"0000000000"} label={"PhilHealth"} />
              </Stack>

              <SaveButton Text={"Save"}/>
            </form>
          </Container>
        </Paper>
      </Container>
    </>
  );
}
