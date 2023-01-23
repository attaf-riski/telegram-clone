import { auth, db } from "../firebase";
import { collection, setDoc, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";

const ChatCard = ({ chatData }) => {
  const [user, loading] = useAuthState(auth);
  const reciverEmail = chatData
    ?.data()
    ?.users?.filter((item) => item !== user?.email)?.[0];
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", reciverEmail));
  const [userSnapShot, loading2] = useCollection(q);
  const name = userSnapShot?.docs?.[0]?.data()?.name;
  const imageURL = userSnapShot?.docs?.[0]?.data()?.imageURL;
  const online = userSnapShot?.docs?.[0]?.data()?.online;
  return (
    <Link href={`/chats/${chatData.id}`}>
      <div className="w-full flex items-center py-3 px-5 border-b rounded-xl border-[#393939] space-x-2 cursor-pointer hover:bg-black">
        <div className="rounded-full w-[60px] h-[60px] relative">
          <img
            className="rounded-full"
            src={imageURL || "images/default.png"}
            alt="photo"
          />
          {online ? (
            <span className="w-3 h-3 bg-green-500 rounded-full absolute z-[999] bottom-1 right-0"></span>
          ) : (
            ""
          )}
        </div>
        <span>{name || "User"}</span>
      </div>
    </Link>
  );
};

export default ChatCard;
