export const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <>
      <h1 className="text-4xl text-green-400 font-semibold">{title}</h1>
      <p className="text-lg text-gray-600">{subTitle}</p>
    </>
  );
};