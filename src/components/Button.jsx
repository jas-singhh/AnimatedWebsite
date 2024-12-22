const Button = ({ id, title, leftIcon, rightIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`flex items-center gap-2 z-10 w-fit cursor-pointer overflow-hidden bg-violet-50
  px-7 py-3 text-black rounded-full ${containerClass} transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300`}
    >
      {leftIcon}

      <span className=" z-20 inline-flex overflow-hidden font-general text-sm uppercase">
        {title}
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
