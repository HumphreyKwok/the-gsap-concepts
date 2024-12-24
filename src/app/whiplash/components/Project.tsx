type TProp = {
  index: number;
  title: string;
  roles: string[];
  setModal: React.Dispatch<
    React.SetStateAction<{
      active: boolean;
      index: number;
    }>
  >;
};

const Project = ({ index, title, roles, setModal }: TProp) => {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between gap-4 border-t-2 px-10 py-10 transition-all duration-300 hover:opacity-40 md:px-20"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h2 className="text-3xl capitalize group-hover:-translate-x-2 xl:text-5xl">
        {title}
      </h2>
      <div className="flex flex-col gap-2 text-base opacity-50 group-hover:translate-x-2 md:flex-row lg:text-xl">
        {roles.map((role) => (
          <p key={role}> {role.charAt(0).toUpperCase() + role.slice(1)} </p>
        ))}
      </div>
    </div>
  );
};

export default Project;
