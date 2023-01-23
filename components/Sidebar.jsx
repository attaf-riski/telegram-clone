import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Card from "./Card";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import CardLoader from "./CardLoader";
import ChatCard from "./ChatCard";

const Sidebar = () => {
  useEffect(() => setSearch(""), []);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [user, loading] = useAuthState(auth);
  const logout = async () => {
    await signOut(auth);
    if (user) {
      await setDoc(
        doc(db, "users", user?.uid),
        {
          name: user?.displayName,
          email: user?.email,
          imageURL: user?.photoURL,
          online: false,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    }
  };
  const usersRef = collection(db, "users");
  const [userSnapshots, loading2] = useCollection(usersRef);
  // console.log(userSnapshots?.docs[0]?.data());
  const chatRef = collection(db, "chats");
  const q = query(chatRef, where("users", "array-contains", user?.email));
  const [chatSnapshots, loading3] = useCollection(q);

  return (
    <div className="w-[600px] h-screen p-5 bg-[#272727]">
      <div className="flex items-center w-full space-x-4">
        <div>
          <button className="text-2xl">
            <FiMenu onClick={() => setFocus(!focus)} />
            <div
              className={`w-[300px] rounded-b-xl rounded-tr-xl absolute bg-[#47474746] flex flex-col justify-center items-center p-5 top-16 left-12 backdrop-blur-sm  ${
                focus ? "opacity-100 z-[1]" : "-z-[1] opacity-0"
              }`}
            >
              <div className="w-[100px] h-[100px] overflow-hidden border rounded-full">
                <img className="w-[100px] h-[100px]" src={user?.photoURL} />
              </div>
              <div className="w-full">
                <h1 className="text-xl my-2">{user?.displayName}</h1>
                <div
                  className="text-xl bg-[#fff] w-full text-black py-1 px-1 rounded-md hover:bg-[#f67d7d] transition-colors"
                  onClick={logout}
                >
                  LogOut
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className="relative w-full flex items-center">
          <div className="text-xl absolute left-3">
            <AiOutlineSearch />
          </div>
          <input
            type={"text"}
            className="border bg-transparent w-full  px-10 py-2 rounded-full border-[#494949] outline-none focus:border-[#cd71ff]"
            placeholder="Search Here"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          {search.length > 0 && (
            <button
              className="absolute right-5 text-2xl"
              onClick={() => {
                setSearch("");
              }}
            >
              <IoMdClose className="" />
            </button>
          )}
        </div>
      </div>
      <div
        className={
          search.length > 0
            ? `w-full h-screen overflow-y-auto mt-5 transition-all`
            : `w-full h-0 overflow-y-auto mt-5 transition-all`
        }
      >
        {!loading2 ? (
          userSnapshots?.docs?.map((item) => {
            if (
              item.data().name.toLowerCase().includes(search.toLowerCase()) &&
              item.data().name !== user?.displayName
            ) {
              return (
                <Card
                  key={item.id}
                  name={item.data().name}
                  imageURL={item.data().imageURL}
                  email={item.data().email}
                  id={item.id}
                  setSearch={setSearch}
                />
              );
            }
          })
        ) : (
          <div>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        )}
      </div>
      <div className="w-full h-screen overflow-y-auto mt-5 transition-all">
        {chatSnapshots?.docs?.map((chat) => {
          return <ChatCard key={chat.id} chatData={chat} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
