import { useNavigate } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-black w-full border-b-1 border-white">
      <div className="flex items-center justify-center">
        <h1
          className="text-4xl m-10 text-white underline decoration-blue-500 underline-offset-5"
        >
          {" "}
          Nova Bank
        </h1>

        <img
          src="/NovaBankRoundedLogo.png"
          alt="Nova Bank Logo"
          className="h-16 border-2 border-blue-500 rounded-4xl w-16 ml-4"
        />
      </div>
    </header>
  );
}