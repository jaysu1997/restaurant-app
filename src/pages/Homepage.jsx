import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <button
        onClick={() => {
          searchParams.set("from", "2025--0-4309-2");
          setSearchParams(searchParams);
        }}
      >
        test
      </button>
    </div>
  );
}

export default Homepage;
