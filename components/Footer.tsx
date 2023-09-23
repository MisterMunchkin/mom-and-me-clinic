export default function Footer() {
  return (
    <footer className="p-4 w-min-screen h-[8rem] bg-melon flex flex-col items-center justify-end">
      <div>
        <span className="text-gray-650 text-sm tracking-wide font-light">
          Made with ❤️ + ☕️ by&nbsp;
          <a 
            href="https://robindalmy.com" 
            target="_blank"
            className=" hover:underline font-semibold"
          >
           Robin Dalmy
          </a>
        </span>
      </div>
      <div>
        <span 
          className="text-gray-650 text-sm tracking-wide font-light"
        >
          Copyright © 2023 Terakota
        </span>
      </div>
    </footer>
  );
}