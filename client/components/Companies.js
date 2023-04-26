import Link from "next/link";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Button } from "reactstrap";
import Router from "next/router";
import toast, { Toaster } from "react-hot-toast";


function Companies() {
  const [userList, setuserList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   console.log(userList);
  // }, [userList]);


  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:4000/get-companies",
    }).then((data) => {
      console.log(data);
      setuserList(data.data);
    });
  }, []);

  const message = () => {
    return (
      <div className="flex items-center justify-betwen">
        <div className="text-white">
          <AiFillCheckCircle />
        </div>
        <div className=" ml-2 font-inter text-white text-[14px] ">
          Details deleted successfully!
        </div>
      </div>
    );
  };

  const notify = () => {
    toast(message, {
      position: "top-center",
      style: {
        width: "fit-content",
        borderRadius: "9999px",
        fontFamily: "Inter",
        backgroundColor: "black",
      },
    });
    // Router.push("/userDashboard/companies");
  };

  const handleDelete = async (key) => {
    notify()
    console.log(key);
    await axios({
      method: "delete",
      url: `http://localhost:4000/delete-company/${key}`,
    });
    // Router.push("/userDashboard/companies");
    window.location.reload();
  };


  // console.log(companyDetails);

  return (
    <div className="main">
      <div className="min-h-screen pb-[20px] bg-[#f8f8f8]">
        {/* top */}
        <div className="w-full h-[133px] bg-white flex flex-col items-center justify-center"></div>
        <Modal
          userList={userList}
          setuserList={setuserList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        {/* bottom */}
        <div className="text-[#033443] max-w-[968px] mx-auto pt-5 bg-red-500 my-0">
          <div>
            <div className="flex  justify-end">
              {/* <input
                type="text"
                placeholder="Search Company Name"
                className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded-md text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 w-56 transition duration-200 ease-in mr-8"
              />
              <input
                type="text"
                placeholder="Search Company Location"
                className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded-md text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 w-56 transition duration-200 ease-in mr-8"
              /> */}
              <button
                className="bg-collabi-green px-2 text-black  h-9 w-32 rounded-md text-sm font-medium"
                onClick={() => setModalOpen(true)}
              >
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* companies */}
        {/* <div className="columns-1 mx-5 p-5">
          {userList.map((element) => (
            <Link
              key={element._id}
              href={`/userDashboard/companies/${element._id}`}
              passHref
            >
              <p className="cursor-pointer">{element.email}</p>
            </Link>
          ))}
        </div> */}

        <MDBTable align='middle mt-4'>
          <MDBTableHead className="text-white">
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              {/* <th scope='col'>Status</th> */}
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          {userList.map((element) => (
            <MDBTableBody className="text-white">
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{element.fname} {element.lname}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{element.email}</p>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{element.roles[0]}</p>
                </td>
                {/* <td>
            <MDBBadge color='success' pill>
              Active
            </MDBBadge>
          </td> */}
                <td>
                  <Button color='link' rounded size='sm'
                    key={element._id}
                    href={`/userDashboard/companies/${element._id}`}
                    passHref>
                    Edit
                  </Button>
                  <Button
                    color='link'
                    rounded
                    size='sm'
                    key={element._id}
                    onClick={() => handleDelete(element._id)}
                  >
                    Delete
                  </Button>

                </td>
              </tr>
            </MDBTableBody>
          ))}

        </MDBTable>




        <Toaster position="bottom-center" />

      </div>
    </div>
  );
}

export default Companies;
