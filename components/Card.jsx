import { auth, db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Card = ({ name, imageURL, email, id, setSearch }) => {
  const [user, loading] = useAuthState(auth);
  const addChat = async () => {
    await setDoc(
      doc(db, "chats", `chats-${user.uid}${id}`),
      {
        users: [user?.email, email],
      },
      { merge: true }
    );
    alert("chat added");
    setSearch("");
  };
  return (
    <div
      className="w-full flex items-center py-3 px-5 border-b rounded-xl border-[#393939] space-x-2 cursor-pointer hover:bg-black"
      onClick={addChat}
    >
      <div className="rounded-full w-[60px] h-[60px] overflow-hidden">
        <img src={imageURL} alt="profile photo" />
      </div>
      <span>{name}</span>
    </div>
  );
};

export default Card;
