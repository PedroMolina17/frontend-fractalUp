import SearchInput from "../src/components/SearchInput";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="text-red-100 flex  bg-red-500">
        <SearchInput />
      </div>
    </div>
  );
};

export default Home;
