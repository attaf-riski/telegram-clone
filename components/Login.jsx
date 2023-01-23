import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const login = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-[#252525] justify-center flex items-center flex-col space-y-10">
      <div className="flex items-center space-x-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
          alt="logo telegram"
          className="w-[100px] h-[100px]"
        />
        <h1 className="text-5xl font-bold">Telegram Web</h1>
      </div>
      <div>
        <button
          className="flex items-center text-3xl bg-white text-black px-5 py-2 rounded-md hover:bg-[#e2e2e2] transition-colors font-semibold space-x-3"
          onClick={login}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
            alt="logo google"
            className="w-[40px] h-[40px]"
          />
          <span>Login With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
